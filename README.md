# Node.js Express CRUD App - README

---

## Description
This Node.js Express CRUD (Create, Read, Update, Delete) application provides basic functionalities to manage user data. It utilizes Express.js for handling HTTP requests and stores user data in a JSON file named `data/users.json`.

## Installation
1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Install dependencies by running:
    ```
    npm install
    ```

## Usage
1. Start the server by running:
    ```
    npm start
    ```
2. Access the application through your web browser or API testing tools like Postman.
3. The server will be running at `http://localhost:3000` by default.

## API Endpoints
1. **GET /users**: Retrieves all users.
2. **GET /users/:id**: Retrieves a user by ID.
3. **POST /users**: Creates a new user.
4. **PUT /users/:id**: Updates an existing user by ID.
5. **DELETE /users/:id**: Deletes a user by ID.

## Data Storage
User data is stored in `data/users.json` file.

## Example Data Structure (users.json)
```json
[
    {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com"
    },
    {
        "id": 2,
        "name": "Jane Smith",
        "email": "jane@example.com"
    }
]
