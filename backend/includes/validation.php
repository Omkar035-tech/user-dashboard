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
