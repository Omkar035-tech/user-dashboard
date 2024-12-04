<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT');

require_once '../config/database.php';
require_once '../includes/functions.php';
require_once '../includes/validation.php';

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    try {
        $conn = getDatabaseConnection();

        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        $id = intval($data['id'] ?? 0);
        $firstname = sanitizeInput($data['firstname'] ?? '');
        $lastname = sanitizeInput($data['lastname'] ?? '');
        $email = sanitizeInput($data['email'] ?? '');
        $dob = $data['dob'] ?? '';

        if ($id <= 0) {
            sendJsonResponse(['error' => 'Invalid user ID'], 400);
        }

        if (empty($firstname) || empty($lastname) || empty($email) || empty($dob)) {
            sendJsonResponse(['error' => 'All fields are required'], 400);
        }

        if (!validateEmail($email)) {
            sendJsonResponse(['error' => 'Invalid email format'], 400);
        }

        if (!validateDate($dob)) {
            sendJsonResponse(['error' => 'Invalid date of birth'], 400);
        }

        $checkStmt = $conn->prepare("SELECT COUNT(*) FROM users WHERE id = ?");
        $checkStmt->execute([$id]);
        if ($checkStmt->fetchColumn() == 0) {
            sendJsonResponse(['error' => 'User not found'], 404);
        }

        $emailCheckStmt = $conn->prepare("SELECT COUNT(*) FROM users WHERE email = ? AND id != ?");
        $emailCheckStmt->execute([$email, $id]);
        if ($emailCheckStmt->fetchColumn() > 0) {
            sendJsonResponse(['error' => 'Email already in use by another user'], 409);
        }

        $stmt = $conn->prepare("UPDATE users SET firstname = ?, lastname = ?, email = ?, dob = ? WHERE id = ?");

        $result = $stmt->execute([
            $firstname,
            $lastname,
            $email,
            $dob,
            $id
        ]);

        if ($result) {
            sendJsonResponse([
                'message' => 'User updated successfully',
                'user_id' => $id
            ]);
        } else {
            sendJsonResponse(['error' => 'Failed to update user'], 500);
        }
    } catch (PDOException $e) {
        logError("Update User Error: " . $e->getMessage());
        sendJsonResponse(['error' => 'Database error'], 500);
    }
} else {
    sendJsonResponse(['error' => 'Method not allowed'], 405);
}
