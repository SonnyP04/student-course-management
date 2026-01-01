CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    enrollment_date DATE DEFAULT CURRENT_DATE

);

CREATE TABLE courses(
    id SERIAL PRIMARY KEY,
    course_name VARCHAR(255) NOT NULL,
    course_code VARCHAR(20) UNIQUE NOT NULL,
    credits INTEGER NOT NULL

);

CREATE TABLE enrollments(
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    entrollment_date DATE DEFAULT CURRENT_DATE,
    UNIQUE(student_id, course_id)

);