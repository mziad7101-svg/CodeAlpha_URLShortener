
require('dotenv').config();

const express = require('express');
const { nanoid } = require('nanoid');
const { Pool } = require('pg');

const app = express();

app.use(express.json());

const PORT = 3000;

// PostgreSQL Connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT)
});

// Test Database Connection
pool.query('SELECT NOW()')
    .then(() => {
        console.log('PostgreSQL connected successfully!');
    })
    .catch((err) => {
        console.error('Database connection error:', err.message);
    });

// Home Route
app.get('/', (req, res) => {
    res.send('Welcome to URL Shortener API!');
});

// POST Route - Shorten URL
app.post('/shorten', async (req, res) => {

    console.log('POST /shorten request received');

    const originalUrl = req.body.url;

    console.log('Received URL:', originalUrl);

    if (!originalUrl) {
        return res.status(400).json({
            message: 'URL is required'
        });
    }

    const shortCode = nanoid(6);

    try {

        const result = await pool.query(
            'INSERT INTO urls (original_url, short_code) VALUES ($1, $2) RETURNING *',
            [originalUrl, shortCode]
        );

        console.log('Inserted data:', result.rows[0]);

        res.status(201).json({
            message: 'URL shortened successfully',
            originalUrl: originalUrl,
            shortCode: shortCode,
            shortUrl: `http://localhost:${PORT}/${shortCode}`
        });

    } catch (err) {

        console.error('INSERT ERROR:', err.message);

        res.status(500).json({
            message: 'Database Error',
            error: err.message
        });

    }

});

// GET Route - Redirect
app.get('/:shortCode', async (req, res) => {

    const shortCode = req.params.shortCode;

    try {

        const result = await pool.query(
            'SELECT original_url FROM urls WHERE short_code = $1',
            [shortCode]
        );

        if (result.rows.length === 0) {
            return res.status(404).send('URL not found');
        }

        const originalUrl = result.rows[0].original_url;

        console.log('Redirecting to:', originalUrl);

        res.redirect(originalUrl);

    } catch (err) {

        console.error('REDIRECT ERROR:', err.message);

        res.status(500).send('Server Error');

    }

});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
