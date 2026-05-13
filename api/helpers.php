<?php

declare(strict_types=1);

function api_security_headers(): void
{
    header('Content-Type: application/json; charset=utf-8');
    header('X-Content-Type-Options: nosniff');
    header('Referrer-Policy: strict-origin-when-cross-origin');
    header('Cache-Control: no-store');
}

function start_secure_session(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }

    $isSecure = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off');

    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'secure' => $isSecure,
        'httponly' => true,
        'samesite' => 'Lax',
    ]);

    session_start();
}

function json_response(int $statusCode, array $payload): never
{
    http_response_code($statusCode);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function load_config(): array
{
    $configPath = __DIR__ . '/config.php';
    $examplePath = __DIR__ . '/config.example.php';
    $config = file_exists($configPath) ? require $configPath : require $examplePath;

    if (!is_array($config)) {
        error_log('Bmwexpert API config must return an array.');
        json_response(500, [
            'success' => false,
            'message' => 'Не удалось обработать заявку. Позвоните в сервис или попробуйте позже.',
        ]);
    }

    return $config;
}

function get_json_payload(): array
{
    $raw = file_get_contents('php://input');

    if ($raw === false || strlen($raw) > 32768) {
        json_response(400, [
            'success' => false,
            'message' => 'Проверьте данные заявки и попробуйте ещё раз.',
        ]);
    }

    $payload = json_decode($raw, true);

    if (!is_array($payload)) {
        json_response(400, [
            'success' => false,
            'message' => 'Проверьте данные заявки и попробуйте ещё раз.',
        ]);
    }

    return $payload;
}

function sanitize_text(mixed $value, int $maxLength = 500): string
{
    $text = is_scalar($value) ? (string) $value : '';
    $text = trim(strip_tags($text));
    $text = preg_replace('/\s+/u', ' ', $text) ?? '';

    if (function_exists('mb_substr')) {
        return mb_substr($text, 0, $maxLength, 'UTF-8');
    }

    return substr($text, 0, $maxLength);
}

function normalize_bool(mixed $value): bool
{
    return $value === true || $value === 'true' || $value === '1' || $value === 1;
}

function normalize_phone(string $phone): string
{
    return preg_replace('/[^\d+]/', '', $phone) ?? '';
}

function is_valid_phone(string $phone): bool
{
    $digits = preg_replace('/\D/', '', $phone) ?? '';
    return strlen($digits) >= 10 && strlen($digits) <= 15;
}

function same_origin_candidates(array $config): array
{
    $origins = $config['allowed_origins'] ?? [];
    $host = $_SERVER['HTTP_HOST'] ?? '';
    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';

    if ($host !== '') {
        $origins[] = $scheme . '://' . $host;
    }

    return array_values(array_unique(array_filter($origins, 'is_string')));
}

function assert_origin_allowed(array $config): void
{
    $allowedOrigins = same_origin_candidates($config);
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    $referer = $_SERVER['HTTP_REFERER'] ?? '';
    $candidate = $origin !== '' ? $origin : $referer;

    if ($candidate === '') {
        json_response(403, [
            'success' => false,
            'message' => 'Не удалось проверить источник заявки. Обновите страницу и попробуйте ещё раз.',
        ]);
    }

    $parsed = parse_url($candidate);
    $candidateOrigin = '';

    if (is_array($parsed) && isset($parsed['scheme'], $parsed['host'])) {
        $candidateOrigin = $parsed['scheme'] . '://' . $parsed['host'];
        if (isset($parsed['port'])) {
            $candidateOrigin .= ':' . $parsed['port'];
        }
    }

    if ($candidateOrigin === '' || !in_array($candidateOrigin, $allowedOrigins, true)) {
        error_log('Bmwexpert API blocked request from origin: ' . $candidate);
        json_response(403, [
            'success' => false,
            'message' => 'Не удалось проверить источник заявки. Обновите страницу и попробуйте ещё раз.',
        ]);
    }
}

function assert_csrf_token(array $payload): void
{
    $headerToken = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
    $payloadToken = sanitize_text($payload['csrfToken'] ?? '', 128);
    $token = $headerToken !== '' ? $headerToken : $payloadToken;
    $sessionToken = $_SESSION['csrf_token'] ?? '';

    if (!is_string($sessionToken) || $sessionToken === '' || !hash_equals($sessionToken, $token)) {
        json_response(403, [
            'success' => false,
            'message' => 'Сессия формы истекла. Обновите страницу и попробуйте ещё раз.',
        ]);
    }
}

function get_rate_limit_ip(): string
{
    return $_SERVER['REMOTE_ADDR'] ?? 'unknown';
}

function assert_rate_limit(array $config, string $ip): void
{
    $limitConfig = $config['rate_limit'] ?? [];
    $maxRequests = (int) ($limitConfig['max_requests'] ?? 5);
    $windowSeconds = (int) ($limitConfig['window_seconds'] ?? 600);
    $path = $config['rate_limit_path'] ?? dirname(__DIR__) . '/storage/rate-limit.json';
    $now = time();
    $key = hash('sha256', $ip);

    ensure_storage_dir(dirname($path));

    $handle = fopen($path, 'c+');
    if ($handle === false) {
        error_log('Bmwexpert API cannot open rate limit file.');
        return;
    }

    try {
        if (!flock($handle, LOCK_EX)) {
            return;
        }

        $content = stream_get_contents($handle);
        $data = $content ? json_decode($content, true) : [];
        if (!is_array($data)) {
            $data = [];
        }

        foreach ($data as $itemKey => $timestamps) {
            if (!is_array($timestamps)) {
                unset($data[$itemKey]);
                continue;
            }

            $data[$itemKey] = array_values(array_filter(
                $timestamps,
                static fn ($timestamp) => is_int($timestamp) && $timestamp > $now - $windowSeconds
            ));
        }

        $requests = $data[$key] ?? [];
        if (count($requests) >= $maxRequests) {
            json_response(429, [
                'success' => false,
                'message' => 'Слишком много заявок подряд. Попробуйте позже или позвоните в сервис.',
            ]);
        }

        $requests[] = $now;
        $data[$key] = $requests;

        ftruncate($handle, 0);
        rewind($handle);
        fwrite($handle, json_encode($data, JSON_UNESCAPED_SLASHES));
    } finally {
        flock($handle, LOCK_UN);
        fclose($handle);
    }
}

function ensure_storage_dir(string $dir): void
{
    if (!is_dir($dir) && !mkdir($dir, 0750, true) && !is_dir($dir)) {
        error_log('Bmwexpert API cannot create storage directory: ' . $dir);
        json_response(500, [
            'success' => false,
            'message' => 'Не удалось обработать заявку. Позвоните в сервис или попробуйте позже.',
        ]);
    }
}

function append_lead(array $config, array $lead): void
{
    $path = $config['storage_path'] ?? dirname(__DIR__) . '/storage/leads.jsonl';
    ensure_storage_dir(dirname($path));

    $line = json_encode($lead, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

    if ($line === false || file_put_contents($path, $line . PHP_EOL, FILE_APPEND | LOCK_EX) === false) {
        error_log('Bmwexpert API cannot write lead to storage.');
        json_response(500, [
            'success' => false,
            'message' => 'Не удалось обработать заявку. Позвоните в сервис или попробуйте позже.',
        ]);
    }
}

function format_lead_message(array $lead): string
{
    $parts = [
        'Новая заявка с сайта Bmwexpert',
        'Имя: ' . $lead['name'],
        'Телефон: ' . $lead['phone'],
        'Авто: ' . ($lead['car'] ?: 'не указано'),
        'Услуга: ' . ($lead['service'] ?: 'не указано'),
        'Время: ' . ($lead['preferred_time'] ?: 'не указано'),
        'Комментарий: ' . ($lead['comment'] ?: 'нет'),
        'Страница: ' . ($lead['tracking']['page'] ?? ''),
    ];

    return implode(PHP_EOL, $parts);
}

function notify_email(array $config, array $lead): void
{
    $email = $config['email'] ?? [];

    if (empty($email['enabled']) || empty($email['to'])) {
        return;
    }

    $headers = [
        'Content-Type: text/plain; charset=UTF-8',
        'From: ' . ($email['from'] ?? 'no-reply@localhost'),
    ];

    $sent = mail(
        (string) $email['to'],
        (string) ($email['subject'] ?? 'Новая заявка с сайта'),
        format_lead_message($lead),
        implode("\r\n", $headers)
    );

    if (!$sent) {
        error_log('Bmwexpert API email notification failed.');
    }
}

function notify_telegram(array $config, array $lead): void
{
    $telegram = $config['telegram'] ?? [];

    if (empty($telegram['enabled']) || empty($telegram['bot_token']) || empty($telegram['chat_id'])) {
        return;
    }

    if (!function_exists('curl_init')) {
        error_log('Bmwexpert API Telegram notification skipped: cURL extension is missing.');
        return;
    }

    $url = 'https://api.telegram.org/bot' . rawurlencode((string) $telegram['bot_token']) . '/sendMessage';
    $payload = [
        'chat_id' => (string) $telegram['chat_id'],
        'text' => format_lead_message($lead),
        'disable_web_page_preview' => true,
    ];

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query($payload),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 6,
    ]);

    $result = curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($result === false || $status >= 400) {
        error_log('Bmwexpert API Telegram notification failed with status: ' . $status);
    }
}

function notify_webhook(array $config, array $lead): void
{
    $webhookUrl = $config['integrations']['amo_webhook_url'] ?? '';

    if (!is_string($webhookUrl) || $webhookUrl === '' || !function_exists('curl_init')) {
        return;
    }

    $ch = curl_init($webhookUrl);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_POSTFIELDS => json_encode($lead, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 6,
    ]);

    curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($status >= 400) {
        error_log('Bmwexpert API webhook notification failed with status: ' . $status);
    }
}
