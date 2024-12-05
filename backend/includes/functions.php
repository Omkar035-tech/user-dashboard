<?php
// includes/functions.php

function hashPassword($password)
{
    return password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);
}

function generateAPIKey()
{
    return bin2hex(random_bytes(16));
}

function sendJsonResponse($data, $status = 200)
{
    header('Content-Type: application/json');
    http_response_code($status);
    echo json_encode($data);
    exit();
}

function logError($message, $context = [])
{
    error_log(json_encode([
        'message' => $message,
        'context' => $context,
        'timestamp' => date('Y-m-d H:i:s')
    ]));
}
