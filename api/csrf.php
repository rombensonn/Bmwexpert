<?php

declare(strict_types=1);

require __DIR__ . '/helpers.php';

api_security_headers();
start_secure_session();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    header('Allow: GET');
    json_response(405, [
        'success' => false,
        'message' => 'Метод не поддерживается.',
    ]);
}

if (empty($_SESSION['csrf_token']) || !is_string($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

json_response(200, [
    'success' => true,
    'token' => $_SESSION['csrf_token'],
]);
