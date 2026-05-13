<?php

declare(strict_types=1);

return [
    // Скопируйте этот файл в api/config.php и заполните значения под ваш домен и владельца сайта.
    'site_url' => 'https://bmwexpert-noginsk.ru',
    'allowed_origins' => [
        'https://bmwexpert-noginsk.ru',
        'http://localhost:4173',
        'http://127.0.0.1:4173',
        'http://localhost:5173',
        'http://127.0.0.1:5173',
    ],
    'storage_path' => dirname(__DIR__) . '/storage/leads.jsonl',
    'rate_limit_path' => dirname(__DIR__) . '/storage/rate-limit.json',
    'rate_limit' => [
        'max_requests' => 5,
        'window_seconds' => 600,
    ],
    'email' => [
        'enabled' => false,
        'to' => '[Email для заявок]',
        'from' => 'no-reply@[Домен сайта]',
        'subject' => 'Новая заявка с сайта Bmwexpert',
    ],
    'telegram' => [
        'enabled' => false,
        'bot_token' => '[Telegram bot token]',
        'chat_id' => '[Telegram chat id]',
    ],
    'integrations' => [
        // Опциональный webhook для будущей интеграции с amoCRM или другим CRM-сервисом.
        'amo_webhook_url' => '',
    ],
];
