<?php
// index.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

require_once 'config/database.php';
require_once 'includes/functions.php';

// Initialize database (first-time setup)
initializeDatabase();

// Simple router
$request = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

// Basic routing
switch (true) {
    case preg_match('/\/api\/users\/?$/', $request):
        switch ($method) {
            case 'GET':
                require 'api/getusers.php';
                break;
            case 'POST':
                require 'api/adduser.php';
                break;
            case 'PUT':
                require 'api/updateuser.php';
                break;
            case 'DELETE':
                require 'api/deleteuser.php';
                break;
            default:
                sendJsonResponse(['error' => 'Method not allowed'], 405);
        }
        break;

    default:
        sendJsonResponse(['error' => 'Endpoint not found'], 404);
}
