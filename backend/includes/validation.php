<?php

function validateEmail($email)
{
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

function validatePassword($password)
{
    return preg_match("/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/", $password);
}

function validateDate($date)
{
    return (bool)strtotime($date);
}

function sanitizeInput($input)
{
    return htmlspecialchars(strip_tags(trim($input)));
}

function validateUserData($firstname, $lastname, $email, $password, $dob)
{
    $errors = [];

    if (empty($firstname) || strlen($firstname) > 50) {
        $errors[] = "Invalid first name";
    }

    if (empty($lastname) || strlen($lastname) > 50) {
        $errors[] = "Invalid last name";
    }

    if (!validateEmail($email)) {
        $errors[] = "Invalid email format";
    }

    if (!validatePassword($password)) {
        $errors[] = "Password must be at least 8 characters, include uppercase, lowercase, and number";
    }

    if (!validateDate($dob)) {
        $errors[] = "Invalid date of birth";
    }

    return $errors;
}

function checkEmailExists($email, $conn)
{
    $stmt = $conn->prepare("SELECT COUNT(*) FROM users WHERE email = ?");
    $stmt->execute([$email]);
    return $stmt->fetchColumn() > 0;
}
