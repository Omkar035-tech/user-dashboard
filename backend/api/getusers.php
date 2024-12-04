<?php
// header('Content-Type: application/json');
// header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Methods: GET');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once '../config/database.php';
require_once '../includes/functions.php';

try {
    $conn = getDatabaseConnection();

    $page = isset($_GET['page']) ? max(1, intval($_GET['page'])) : 1;
    $limit = isset($_GET['limit']) ? max(1, intval($_GET['limit'])) : 10;
    $search = isset($_GET['search']) ? trim($_GET['search']) : '';

    // Calculate offset
    $offset = ($page - 1) * $limit;

    $query = "SELECT id, firstname, lastname, email, dob, created_at FROM users";
    $countQuery = "SELECT COUNT(*) FROM users";

    $searchCondition = '';
    $searchParams = [];
    if (!empty($search)) {
        $searchCondition = " WHERE firstname LIKE ? OR lastname LIKE ? OR email LIKE ?";
        $searchParams = ["%$search%", "%$search%", "%$search%"];
    }

    $countStmt = $conn->prepare($countQuery . $searchCondition);
    $countStmt->execute($searchParams);
    $totalUsers = $countStmt->fetchColumn();

    $stmt = $conn->prepare($query . $searchCondition . " LIMIT ? OFFSET ?");
    $queryParams = array_merge($searchParams, [$limit, $offset]);
    $stmt->execute($queryParams);
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $response = [
        'total_users' => $totalUsers,
        'page' => $page,
        'limit' => $limit,
        'total_pages' => ceil($totalUsers / $limit),
        'search' => $search,
        'users' => $users
    ];

    sendJsonResponse($response);
} catch (PDOException $e) {
    logError("Get Users Error: " . $e->getMessage());
    sendJsonResponse(['error' => 'Failed to retrieve users'], 500);
}
