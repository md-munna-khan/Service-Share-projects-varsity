Harvard University Website
Live Site URL: Harvard University Website
Category: Education

This project showcases a dynamic educational website for Harvard University, built using React and Vite for an optimized development experience. It provides a robust setup for both frontend and backend integration.

Features
1. Dynamic Navbar
Collapsible menu for mobile responsiveness with links to Home, All Services, Login, and user-specific options.
Dark mode toggle to enhance the user experience.
2. User Authentication
Secure login system for personalized user access.
User-specific dashboards to add, manage, and view their services.
Logout functionality for authenticated users.
3. Service Management
Users can:
Add Services: Provide service details with form validation.
View Services: Organized layout to browse added services.
Manage Services: Edit or delete services as needed.
Features for Booked Services and Service To-Do Lists for efficient service tracking.
4. Responsive Design
Mobile-first approach ensures compatibility across all devices.
Sleek and modern interface for enhanced user interaction.
5. React + Vite Setup
Built with React and Vite for a faster, minimal, and efficient development setup.
Features Hot Module Replacement (HMR) for a seamless development experience.
Backend Features
1. Backend Stack
Node.js: Runtime environment for server-side execution.
Express.js: Fast and lightweight framework for building APIs.
MongoDB: NoSQL database for storing user and service data.
JWT Authentication: Secure user authentication with JSON Web Tokens.
Dotenv: For managing environment variables securely.
2. API Endpoints
User Routes:

POST /users/register: Register a new user.
POST /users/login: Authenticate user credentials.
GET /users/profile: Fetch user profile data (protected route).
Service Routes:

POST /services/add: Add a new service (authenticated).
GET /services: Retrieve all available services.
PUT /services/:id: Update a specific service.
DELETE /services/:id: Remove a service.
Booking Routes:

POST /bookings: Book a service with user details.
GET /bookings: Fetch all bookings for a user.
3. Middleware
Authentication Middleware: Validates JWT tokens for protected routes.
Error Handling Middleware: Provides structured error messages for API issues.
4. Database Schema
Users: Stores user information including email, password (hashed), and roles.
Services: Stores service details such as name, description, price, and creator info.
Bookings: Tracks bookings with user, service, and status details.
Installation
Frontend Setup
Clone this repository:
bash
Copy code
git clone https://github.com/your-repository/harvard-university-website.git
cd harvard-university-website
Install dependencies:
bash
Copy code
npm install
Run the development server:
bash
Copy code
npm run dev
Backend Setup
Navigate to the backend folder:
bash
Copy code
cd backend
Install dependencies:
bash
Copy code
npm install
Set up environment variables:
Create a .env file in the root directory.
Add the following:
env
Copy code
MONGO_URI=<Your MongoDB Connection String>
JWT_SECRET=<Your Secret Key>
PORT=5000
Run the server:
bash
Copy code
npm start
License
This project is licensed under the MIT License. See the LICENSE file for details.

Feel free to contribute, fork, or share! 😊






