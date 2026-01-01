# Student Course Management System

A full-stack web application for managing students and courses using Node.js, Express, and PostgreSQL.

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- HTML/CSS/JavaScript

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm

## Installation

1. Clone the repository
```bash
git clone https://github.com/SonnyP04/student-course-management.git
cd student-course-management
```

2. Install dependencies
```bash
npm install
```

## Database Setup

1. Create the database
```sql
CREATE DATABASE student_course_db;
```

2. Connect to the database and create tables
```sql
\c student_course_db

CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    enrollment_date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    course_code VARCHAR(20) UNIQUE NOT NULL,
    course_name VARCHAR(200) NOT NULL,
    credits INTEGER NOT NULL
);

CREATE TABLE enrollments (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    enrollment_date DATE DEFAULT CURRENT_DATE,
    UNIQUE(student_id, course_id)
);
```

## Configuration

Create a `.env` file in the root directory:
```
PORT=3000
DATABASE_URL=postgresql://username:password@localhost:5432/student_course_db
```

Replace `username` and `password` with your PostgreSQL credentials.

## Running the Application
```bash
node index.js
```

The server will start on `http://localhost:3000`

## API Endpoints

### Students
- `GET /api/students` - Retrieve all students
- `POST /api/students` - Create a new student
- `DELETE /api/students/:id` - Delete a student

### Courses
- `GET /api/courses` - Retrieve all courses
- `POST /api/courses` - Create a new course
- `DELETE /api/courses/:id` - Delete a course

## Project Structure
```
student-course-management/
├── index.js           # Main server file
├── index.html         # Frontend interface
├── .env              # Environment variables
├── package.json      # Dependencies
└── README.md         # Documentation
```

## License

MIT