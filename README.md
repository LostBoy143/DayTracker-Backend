# Mini Attendance + Task System

A simple backend system that allows users to:

* Sign up and log in securely
* Mark daily attendance (only once per day)
* Create, update, and delete personal tasks

This project was built as part of a Full Stack Developer assignment to demonstrate backend design, authentication, database modeling, and deployment.

---

## Tech Stack

Backend:

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* bcrypt for password hashing

Deployment:

* Azure App Service (Backend)
* MongoDB Atlas (Database)

---

## Features

* Secure signup and login using JWT
* Password hashing (no plaintext passwords)
* Attendance marking with one record per user per day
* Task management (Create, Read, Update, Delete)
* Protected routes using authentication middleware
* Environment-based configuration
* Clean and scalable API structure

---

## Database Design

### User

```js
{
  name: String,
  email: String (unique),
  password: String (hashed)
}
```

### Attendance

```js
{
  userId: ObjectId,
  date: String (YYYY-MM-DD)
}
```

* Compound unique index on `{ userId, date }` to prevent duplicate attendance per day

### Task

```js
{
  userId: ObjectId,
  title: String,
  description: String,
  status: "pending" | "in-progress" | "done"
}
```

---

## API Endpoints

### Authentication

* POST `/api/auth/register`
* POST `/api/auth/login`

### Attendance

* POST `/api/attendance/mark`
* GET `/api/attendance/me`

### Tasks

* POST `/api/tasks`
* GET `/api/tasks`
* PUT `/api/tasks/:id`
* DELETE `/api/tasks/:id`

All attendance and task routes are protected using JWT authentication.

---

## Authentication Mechanism

JWT tokens are sent using the HTTP Authorization header:

```
Authorization: Bearer <token>
```

---

## Environment Variables

Create a `.env` file in the root directory using the provided `.env.example` as reference.

### `.env.example`

```env
PORT=5000
MONGODB_URI=
JWT_SECRET=
JWT_EXPIRES_IN=1d
```

### `.env`

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
```

---

## Setup Instructions

1. Ensure Node.js (v18 or later) is installed

2. Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file and configure environment variables

4. Start the development server

```bash
npm run dev
```

---

## Live API

Backend deployed on cloud infrastructure:

* AWS (primary deployment)
* Azure App Service (alternative deployment)

Example:

```
https://<your-app-name>.<region>.compute.amazonaws.com
```

---

## Security Considerations

* Passwords are hashed using bcrypt
* JWT-based stateless authentication
* No hardcoded credentials
* Environment variables managed securely
* Attendance uniqueness enforced at both API and database levels

---

## Notes

This system is designed for individual users to manage their own attendance and tasks.
No admin or HR roles are included, as they were not part of the assignment requirements.

---

## Author

Shubham Singh
Full Stack Developer
