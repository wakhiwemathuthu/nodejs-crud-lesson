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
2. Access the application through your web browser or API testing tools like Postman or VS Code extention Thunder Client.
3. The server will be running at `http://localhost:8080` by default.

## API Endpoints

1. **GET /users**: Retrieves all users.
2. **GET /users/:id**: Retrieves a user by ID.
3. **POST /auth/register**: Creates a new user.
4. **PUT /users/:id**: Updates an existing user by ID.
5. **DELETE /users/:id**: Deletes a user by ID.
6. **POST /auth/signin**: Checks if the provided in the body password matches the one on the user db using bcrypt the signs in the user.

## Data Storage

User data is stored in `data/users.json` file.

## Example Data Structure (users.json)

```json
[
  {
    "id": "37630e3b-46fd-4951-8dcb-3c6ef290ed61",
    "email": "john@gmail.com",
    "password": "$2b$10$hl6k8qo/CBxw8RtOmfLwQ.WxPvkhPEqllFhqaLTL6p2MpeNIJtcTm"
  },
  {
    "id": "6de5594f-8f61-443c-9083-38f7096399ae",
    "email": "jane@gmail.com",
    "password": "$2b$10$vAsoFh5u4RI1thcaPWndNea.zM01XSNC6AYL21uFFXD3gbs179iwa"
  }
]
```
