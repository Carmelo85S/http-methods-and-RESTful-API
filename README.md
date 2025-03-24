# User Management API

This is a simple REST API built with Express.js to manage users. It allows you to create, read, update, and delete users.

## Features
- Retrieve a list of users
- Add a new user
- Update an existing user
- Delete a user

## Installation

1. Clone the repository:
   ```sh
   git clone <repository_url>
   cd <repository_folder>
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the server:
   ```sh
   npm start
   ```
   The server will run on `http://localhost:3000`.

## API Endpoints

### Get all users
**GET** `/user`
- Returns a list of all users.

### Add a new user
**POST** `/user`
- Request body (JSON):
  ```json
  {
    "name": "John Doe",
    "nationality": "USA"
  }
  ```
- Response:
  ```json
  {
    "message": "User added successfully",
    "newUser": {
      "id": 3,
      "name": "John Doe",
      "nationality": "USA"
    }
  }
  ```

### Update a user
**PUT** `/user/:id`
- Request body (JSON):
  ```json
  {
    "name": "Updated Name",
    "nationality": "Updated Nationality"
  }
  ```
- Response:
  ```json
  {
    "message": "User updated successfully",
    "updatedUser": {
      "id": 1,
      "name": "Updated Name",
      "nationality": "Updated Nationality"
    }
  }
  ```

### Delete a user
**DELETE** `/user/:id`
- Response:
  ```json
  {
    "message": "User deleted successfully"
  }
  ```

## Technologies Used
- Node.js
- Express.js

