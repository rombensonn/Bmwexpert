<?php

declare(strict_types=1);

require __DIR__ . '/helpers.php';

api_security_headers();
start_secure_session();

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        header('Allow: POST');
        json_response(405, [
            'success' => false,
            'message' => 'Метод не поддерживается.',
        ]);
    }

    $config = load_config();
    assert_origin_allowed($config);

    $payload = get_json_payload();
    assert_csrf_token($payload);

    $honeypot = sanitize_text($payload['website'] ?? '', 100);
    if ($honeypot !== '') {
        error_log('Bmwexpert API honeypot blocked a submission.');
        json_response(200, [
            'success' => true,
            'message' => 'Заявка отправлена. Мы свяжемся с вами в рабочее время: ежедневно с 10:00 до 18:00.',
        ]);
    }

    assert_rate_limit($config, get_rate_limit_ip());

    $name = sanitize_text($payload['name'] ?? '', 80);
    $phone = sanitize_text($payload['phone'] ?? '', 40);
    $normalizedPhone = normalize_phone($phone);
    $personalDataConsent = normalize_bool($payload['personalDataConsent'] ?? false);
    $privacyPolicyAccepted = normalize_bool($payload['privacyPolicyAccepted'] ?? false);

    if ($name === '' || (function_exists('mb_strlen') ? mb_strlen($name, 'UTF-8') < 2 : strlen($name) < 2)) {
        json_response(422, [
            'success' => false,
            'message' => 'Укажите имя.',
        ]);
    }

    if (!is_valid_phone($phone)) {
        json_response(422, [
            'success' => false,
            'message' => 'Укажите корректный телефон.',
        ]);
    }

    if (!$personalDataConsent || !$privacyPolicyAccepted) {
        json_response(422, [
            'success' => false,
            'message' => 'Для отправки заявки нужно отметить оба обязательных согласия.',
        ]);
    }

    $trackingPayload = is_array($payload['tracking'] ?? null) ? $payload['tracking'] : [];
    $tracking = [
        'page' => sanitize_text($trackingPayload['page'] ?? '', 500),
        'referrer' => sanitize_text($trackingPayload['referrer'] ?? '', 500),
        'utm_source' => sanitize_text($trackingPayload['utm_source'] ?? '', 120),
        'utm_medium' => sanitize_text($trackingPayload['utm_medium'] ?? '', 120),
        'utm_campaign' => sanitize_text($trackingPayload['utm_campaign'] ?? '', 120),
        'utm_content' => sanitize_text($trackingPayload['utm_content'] ?? '', 120),
        'utm_term' => sanitize_text($trackingPayload['utm_term'] ?? '', 120),
    ];

    $lead = [
        'id' => bin2hex(random_bytes(8)),
        'created_at' => date('c'),
        'name' => $name,
        'phone' => $phone,
        'phone_normalized' => $normalizedPhone,
        'car' => sanitize_text($payload['car'] ?? '', 120),
        'service' => sanitize_text($payload['service'] ?? '', 80),
        'preferred_time' => sanitize_text($payload['preferredTime'] ?? '', 120),
        'comment' => sanitize_text($payload['comment'] ?? '', 1000),
        'consents' => [
            'personal_data' => $personalDataConsent,
            'privacy_policy' => $privacyPolicyAccepted,
        ],
        'tracking' => $tracking,
        'meta' => [
            'ip' => get_rate_limit_ip(),
            'user_agent' => sanitize_text($_SERVER['HTTP_USER_AGENT'] ?? '', 500),
        ],
    ];

    append_lead($config, $lead);
    notify_email($config, $lead);
    notify_telegram($config, $lead);
    notify_webhook($config, $lead);

    json_response(200, [
        'success' => true,
        'message' => 'Заявка отправлена. Мы свяжемся с вами в рабочее время: ежедневно с 10:00 до 18:00.',
    ]);
} catch (Throwable $exception) {
    error_log('Bmwexpert API lead error: ' . $exception->getMessage());
    json_response(500, [
        'success' => false,
        'message' => 'Не удалось обработать заявку. Позвоните в сервис или попробуйте позже.',
    ]);
}
