<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

require '../config/database.php';
require '../includes/functions.php';
require '../includes/validation.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $conn = getDatabaseConnection();

        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        $firstname = sanitizeInput($data['firstname'] ?? '');
        $lastname = sanitizeInput($data['lastname'] ?? '');
        $email = sanitizeInput($data['email'] ?? '');
        $password = $data['password'] ?? '';
        $dob = $data['dob'] ?? '';

        $validationErrors = validateUserData($firstname, $lastname, $email, $password, $dob);

        if (!empty($validationErrors)) {
            sendJsonResponse(['errors' => $validationErrors], 400);
        }

        if (checkEmailExists($email, $conn)) {
            sendJsonResponse(['error' => 'Email already exists'], 409);
        }

        // Hash password before save ib DB
        $hashedPassword = hashPassword($password);

        $stmt = $conn->prepare("INSERT INTO users (firstname, lastname, email, password, dob) VALUES (?, ?, ?, ?, ?)");

        $result = $stmt->execute([
            $firstname,
            $lastname,
            $email,
            $hashedPassword,
            $dob
        ]);

        if ($result) {
            $userId = $conn->lastInsertId();
            sendJsonResponse([
                'message' => 'User added successfully',
                'user_id' => $userId
            ], 201);
        } else {
            sendJsonResponse(['error' => 'Failed to add user'], 500);
        }
    } catch (PDOException $e) {
        logError("Add User Error: " . $e->getMessage());
        sendJsonResponse(['error' => 'Database error'], 500);
    }
} else {
    sendJsonResponse(['error' => 'Method not allowed'], 405);
}
