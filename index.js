require("dotenv").config();
const express = require('express');
const { readFile } = require('fs').promises;
const { Pool } = require('pg');

const app = express();
app.use(express.json());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error(' Database connection error:', err.message);
    } else {
        console.log(' Database connected successfully at', res.rows[0].now);
    }
});

// Serve homepage
app.get('/', async (request, response) => {
    response.send(await readFile('./index.html', 'utf8'));
});

// ========== STUDENTS ENDPOINTS ==========

// GET all students
app.get('/api/students', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM students ORDER BY id');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// POST create new student
app.post('/api/students', async (req, res) => {
    const { first_name, last_name, email } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO students (first_name, last_name, email) VALUES ($1, $2, $3) RETURNING *',
            [first_name, last_name, email]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// DELETE student
app.delete('/api/students/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM students WHERE id = $1', [id]);
        res.json({ message: 'Student deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// ========== COURSES ENDPOINTS ==========

// GET all courses
app.get('/api/courses', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM courses ORDER BY id');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// POST create new course
app.post('/api/courses', async (req, res) => {
    const { course_code, course_name, credits } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO courses (course_code, course_name, credits) VALUES ($1, $2, $3) RETURNING *',
            [course_code, course_name, credits]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// DELETE course
app.delete('/api/courses/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM courses WHERE id = $1', [id]);
        res.json({ message: 'Course deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// ========== START SERVER ==========

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
});