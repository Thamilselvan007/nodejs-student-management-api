# Node.js Student Management API

A RESTful Student Management API built using Node.js and its built-in HTTP module. This project demonstrates core backend development concepts, including HTTP routing, CRUD operations, request handling, input validation, and error handling.

## Features

- Create a student
- Retrieve all students
- Update an existing student
- Delete a student
- Validate student names and email addresses
- Handle invalid JSON and malformed requests
- Centralized JSON error responses
- Request body size limit of 1 MB
- Appropriate HTTP status codes

## Technologies Used

- Node.js
- JavaScript
- Built-in Node.js HTTP module
- Postman for API testing

## Getting Started

### Prerequisites

- Node.js installed
- npm installed
- Postman (optional, for API testing)

### Installation

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
```

Navigate to the project directory:

```bash
cd YOUR_PROJECT_FOLDER
```

Start the server:

```bash
npm start
```

The server will run at:

```text
http://localhost:4000
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/students` | Retrieve all students |
| POST | `/students` | Create a student |
| PUT | `/students/:id` | Update a student |
| DELETE | `/students/:id` | Delete a student |

## Example Request

### Create a student

**POST** `/students`

Request body:

```json
{
  "name": "Example Student",
  "email": "student@example.com"
}
```

### Update a student

**PUT** `/students/1`

Request body:

```json
{
  "name": "Updated Student",
  "email": "updated@example.com"
}
```

## HTTP Status Codes

| Status | Meaning |
|---|---|
| 200 | Request successful |
| 201 | Student created |
| 400 | Invalid request or input |
| 404 | Student not found or route not found |
| 413 | Request body too large |

## Project Structure

```text
Http server/
│
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Data Storage

This project currently uses an in-memory JavaScript array to store student records.

**Note:** Data is temporary and resets when the server restarts. A database will be integrated in a future version.

## Learning Outcomes

This project demonstrates practical understanding of:

- Node.js HTTP server creation
- HTTP request and response lifecycle
- REST API design
- GET, POST, PUT, and DELETE methods
- JSON parsing and serialization
- Request body streams
- Input validation
- Error handling
- HTTP status codes

## License

This project is available under the MIT License.