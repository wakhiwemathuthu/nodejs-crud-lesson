# Node.js Express App

---

## Description

An Express.js app enabling user authentication and post management, encompassing signup, signin, logout, and full CRUD operations on posts. Data is locally stored using the fs common core module.

## Key Features

1. Authentication: Utilizing JSON Web Tokens (JWT) for secure authentication and authorization.
2. Password Security: Employing bcrypt for enhanced password hashing and authentication.
3. Protected Routes: Access to CRUD operations on posts is restricted, ensuring that only users with valid access tokens can perform these actions.

## Installation

1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Install dependencies by running:
   ```
   npm install
   ```
4. Create a .env file in the main project directory and add values for PORT , ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET

## Usage

1. Start the server by running:
   ```
   npm start
   ```
2. Access the application through the endpoints in requests.rest file make sure to install Rest Client extension on VS Code.
3. The server will be running at `http://localhost:8080` by default.