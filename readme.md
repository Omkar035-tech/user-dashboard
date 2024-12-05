# CRUD Application with React, PHP, and MySQL  

A **CRUD (Create, Read, Update, Delete)** application built using **React** for the frontend and **PHP** with a **MySQL database** for the backend. This project allows seamless interaction with user data and includes various features like pagination, searching, and secure API interactions. Deployed on **InfinityFree web hosting**. 🚀  

---
## Deployed Environment Details
✅ **Frontend (React)**: https://usermanage.ct.ws/index.html                                                   
✅ **Backend (PHP & MySQL)**: https://usermanage.ct.ws/user_manage/api/[api-name].php 



## Features  
✅ **Add User**  
- Collects **First Name**, **Last Name**, **Email**, **Password**, and **Date of Birth (DOB)**.  

✅ **Update User**  
- Modifies existing user data: **First Name**, **Last Name**, **Email**, and **DOB**.  

✅ **Delete User**  
- Permanently removes user records.  

✅ **Paginated User Details**  
- Retrieves paginated user lists with dynamic row limit selection.  

✅ **Search Specific User**  
- Allows searching for users by their details.  

---

## Validation Details  
Data validation is implemented to ensure the integrity of user information:  
1. **Frontend Validation:**  
   - Form fields are validated for required inputs, email format, and password strength.  
   - Instant feedback is provided for invalid or missing fields.  

2. **Backend Validation:**  
   - Server-side validation ensures data consistency and rejects invalid or incomplete data.  
   - **Prepared Statements** are used in PHP to prevent SQL injection.  

---

## Testing Details  

### API Testing  
- API endpoints were tested using **Postman** for:  
  - POST (Add User)  
  - GET (Fetch Users with Pagination)  
  - PUT (Update User)  
  - DELETE (Remove User)  

### Frontend Testing  
- UI testing was conducted to ensure all forms, buttons, and input fields work as expected.  
- Pagination and search functionality were verified for correctness.  

---

## Deployment Details  
The application is deployed on **InfinityFree Web Hosting**:  
- **Frontend:** React built files are hosted as static assets.  
- **Backend:** PHP scripts handle API requests, connected to the MySQL database.  

---

## Setup Details  

### Requirements  
- **Node.js** (for React development)  
- **PHP 7.x or above**  
- **MySQL**  
- **InfinityFree account** (or similar hosting)  

### Installation Steps  
1. Clone the repository:  
   ```bash  
   git clone https://github.com/Omkar035-tech/user-dashboard.git  
   ```  

2. Setup the **frontend**:  
   ```bash  
   cd frontend  
   npm install  
   npm run build  
   ```  
   Upload the `build/` folder to your web hosting.  

3. Setup the **backend**:  
   - Configure your database by creating a table:  
     ```sql  
     CREATE TABLE users (  
        id INT AUTO_INCREMENT PRIMARY KEY,
        firstname VARCHAR(50) NOT NULL,
        lastname VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        dob DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  ON UPDATE CURRENT_TIMESTAMP 
     );  
     ```  
   - Update `config/database.php` with your database credentials.  
   - Upload all PHP files to your web hosting.  

4. Access the app through the deployed URL.  

---

## Security Measures  
- **Prepared Statements** in PHP protect against SQL injection.  
- Passwords are securely hashed before storage using PHP's `password_hash()`.  

---

### Example API Endpoints  
- **Create User:**  
  `POST /api/adduser.php`  
  Body:  
  ```json  
  {  
    "firstname": "John",  
    "lastname": "Doe",  
    "email": "john.doe@example.com",  
    "password": "securepassword",  
    "dob": "1990-01-01"  
  }  
  ```  

- **Fetch Users:**  
  `GET /api/getusers.php?page=${page}&limit=${limit}&search=${search}`  

- **Update User:**  
  `PUT /api/updateuser.php`  
  Body:  
  ```json  
  {  
    "id": 1,  
    "firstname": "John",  
    "lastname": "Smith",  
    "email": "john.smith@example.com",  
    "dob": "1990-01-01"  
  }  
  ```  

- **Delete User:**  
  `DELETE /api/deleteuser.php`  
  Body:  
  ```json  
  {  
    "id": 1,
    "email":"test@mail.com", 
  }  
  ```  

### Issue with infinityfree Free Hosting Provider tier:

1. Unable to connect apis to another subdomain as free tier policy it shows forbidden with status 403 or throw CORS errors
2. Free tier support GET and POST requests PUT and DELETE request restrited by Domain
3. For current project support free SSL certificate.


### Roadmap  
- Add user authentication.  
- Implement bulk operations (e.g., delete multiple users).  
- Enhance search with advanced filters.  

Feel free to contribute and improve this project! 💡


###  Conclusion
This project demonstrates a simple full-stack application with a React frontend and PHP/MySQL backend, providing CRUD operations with proper validation, security against SQL injection, and pagination. It's deployed on InfinityFree hosting for easy access and testing.