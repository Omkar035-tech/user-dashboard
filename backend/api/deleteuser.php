<?php
// delete functionality implmentation

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: DELETE');

require '../config/database.php';
require '../includes/functions.php';
require '../includes/validation.php';

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    try {
        $conn = getDatabaseConnection();

        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        $id = intval($data['id'] ?? 0);
        $email = sanitizeInput($data['email'] ?? '');

        if ($id <= 0) {
            sendJsonResponse(['error' => 'Invalid user ID'], 400);
        }

        if (!validateEmail($email)) {
            sendJsonResponse(['error' => 'Invalid email format'], 400);
        }

        $checkStmt = $conn->prepare("SELECT COUNT(*) FROM users WHERE id = ? AND email = ?");
        $checkStmt->execute([$id, $email]);

        if ($checkStmt->fetchColumn() == 0) {
            sendJsonResponse(['error' => 'User not found or email mismatch'], 404);
        }

        $deleteStmt = $conn->prepare("DELETE FROM users WHERE id = ? AND email = ?");

        $result = $deleteStmt->execute([$id, $email]);

        if ($result && $deleteStmt->rowCount() > 0) {
            sendJsonResponse([
                'message' => 'User deleted successfully',
                'user_id' => $id
            ]);
        } else {
            sendJsonResponse(['error' => 'Failed to delete user'], 500);
        }
    } catch (PDOException $e) {
        logError("Delete User Error: " . $e->getMessage());
        sendJsonResponse(['error' => 'Database error'], 500);
    }
} else {
    sendJsonResponse(['error' => 'Method not allowed'], 405);
}
