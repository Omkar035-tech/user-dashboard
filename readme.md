CRUD Application using React, PHP, and MySQL
This is a simple CRUD (Create, Read, Update, Delete) application built using React for the frontend and PHP & MySQL for the backend, hosted on InfinityFree web hosting.

Features:
Add User: Allows the addition of user data including First Name, Last Name, Email, Password, and Date of Birth.
Update User: Enables updating existing user data, including First Name, Last Name, Email, and Date of Birth.
Delete User: Provides the ability to delete a user from the system.
Paginated User Details: Displays user details with pagination, allowing users to change the number of rows per page.
Search Users: Enables searching for a specific user by name or email.
Project Setup:
Frontend:

Built using React.
React's state and props manage the dynamic behavior of the UI.
Uses axios for HTTP requests to interact with the PHP backend.
Backend:

Built with PHP and connected to a MySQL database.
Uses prepared statements to prevent SQL injection and ensure safe database interactions.
The backend includes APIs for handling user data (add, update, delete, search, pagination).
Database:

A MySQL database to store user data.
The database includes a users table with the following fields:
id (INT, primary key)
firstname (VARCHAR)
lastname (VARCHAR)
email (VARCHAR, unique)
password (VARCHAR)
dob (DATE)
Hosting:

The application is hosted on InfinityFree, a free web hosting platform.
The PHP API is deployed on the backend, and the React frontend is connected to it.
Setup Details:
Backend Setup:

Create a database in MySQL with the necessary table (users).
Clone or upload the PHP scripts to the InfinityFree hosting server/Xamapp server for local setup.
Configure the database connection settings in the PHP scripts.
Frontend Setup:

Clone or download the React project.
Install dependencies using:
bash
Copy code
npm install
Update the API endpoints in the React code to point to the hosted PHP backend.
Run the Application:

For development, run the React app locally using:
bash
Copy code
npm start
The application will be accessible in the browser at http://localhost:3000.
API Endpoints:
GET /getusers: Retrieves paginated user data. Supports query parameters for pagination (page and limit).
POST /adduser: Adds a new user with firstname, lastname, email, password, and dob.
POST /updateuser: Updates an existing user's firstname, lastname, email, and dob.
POST /deleteuser: Deletes a user by id and email for safer check.
GET /getusers.php?page=${page}&limit=${limit}&search=${search}: Searches for a user by firstname, lastname, or email.
API Testing:
Frontend Testing:

Manually test all CRUD operations on the user interface by adding, updating, deleting, and searching users.
Ensure pagination and row limit functionality work as expected.
Validate the user interface for proper handling of form inputs and error messages.
Backend Testing:

Use Postman or cURL to test the PHP APIs.
Test GET, POST requests for user-related operations.
Check the correct HTTP response codes (e.g., 200 for success, 400 for bad request).

Issue with infinityfree Free Hosting Provider tier:
1) Unable to connect apis to another subdomain as free tier policy it shows forbidden with status 403 or throw CORS errors
2) Free tier support GET and POST requests PUT and DELETE request restrited by Domain
3) For current project support free SSL certificate.

Example Postman request for adding a user:

http
Copy code
POST /users
Content-Type: application/json
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "dob": "1990-01-01"
}
Validation Details:
Frontend Validation:

Required fields: firstname, lastname, email, dob.
Email format validation.
Password strength (min 8 characters).
All fields must be filled before submitting.
Backend Validation:

Prevent SQL injection using prepared statements in PHP.
Validate the email format and check if it’s unique before adding or updating.
Check for missing or invalid fields before processing requests.
PHP Prepared Statements for SQL Injection Prevention:
To prevent SQL injection, the PHP backend uses prepared statements with bound parameters for all database interactions.

Example (adding a user):

php
Copy code
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get data from request
    $data = json_decode(file_get_contents("php://input"));

    // Validate the data
    if (isset($data->firstname) && isset($data->lastname) && isset($data->email) && isset($data->password) && isset($data->dob)) {
        // Database connection
        $conn = new mysqli('localhost', 'username', 'password', 'dbname');
        
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // Prepare statement to prevent SQL injection
        $stmt = $conn->prepare("INSERT INTO users (firstname, lastname, email, password, dob) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sssss", $data->firstname, $data->lastname, $data->email, $data->password, $data->dob);

        // Execute query
        if ($stmt->execute()) {
            echo json_encode(["message" => "User added successfully"]);
        } else {
            echo json_encode(["error" => "Failed to add user"]);
        }

        $stmt->close();
        $conn->close();
    } else {
        echo json_encode(["error" => "Missing required fields"]);
    }
}
?>

Deployed Environment Details:
Frontend (React): https://usermanage.ct.ws/index.html
Backend (PHP & MySQL): https://usermanage.ct.ws/user_manage/api/[api-name].php
Conclusion:
This project demonstrates a simple full-stack application with a React frontend and PHP/MySQL backend, providing CRUD operations with proper validation, security against SQL injection, and pagination. It's deployed on InfinityFree hosting for easy access and testing.