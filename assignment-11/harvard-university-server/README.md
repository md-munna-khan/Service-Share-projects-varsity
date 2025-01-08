# Harvard University Backend

**Live API URL**: _Provide the live API URL if deployed_  
**Repository**: [Harvard University Backend GitHub](https://github.com/your-repository/harvard-university-backend)

## Description

The backend of the Harvard University website is built using **Node.js** and **Express**, with **MongoDB** as the database. This API handles user authentication, service management, and other functionalities required for the frontend of the Harvard University Website.

## Features

### 1. **User Authentication**:
   - Secure login and registration system using **JWT (JSON Web Tokens)**.
   - User login, registration, and logout functionalities.
   - Password hashing with **bcrypt** for secure password storage.

### 2. **Service Management**:
   - CRUD (Create, Read, Update, Delete) operations for services.
   - Services are stored in a **MongoDB** database.
   - Endpoints for viewing, adding, editing, and deleting services.

### 3. **User-specific Data**:
   - Fetches user-specific services, bookings, and to-do lists.
   - The backend filters data based on the logged-in user's email.

### 4. **MongoDB Integration**:
   - Uses **MongoDB** for data storage, with collections for services, users, and more.
   - Implements **Mongoose** for easy data manipulation.

### 5. **Environment Variables**:
   - Configured with environment variables for database URIs, JWT secrets, and API configurations.

## Installation

To run the backend locally:

1. Clone the backend repository:
   ```bash
   git clone https://github.com/your-repository/harvard-university-backend.git
