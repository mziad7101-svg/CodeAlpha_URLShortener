# URL Shortener API

A simple URL Shortener API built using **Node.js, Express.js, and PostgreSQL**.

## Project Overview

This project allows users to convert long URLs into short URLs.

Users can:

- Shorten long URLs.
- Store URLs in a PostgreSQL database.
- Redirect users from short URLs to their original URLs.
- Retrieve stored URLs using unique short codes.

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- JavaScript
- nanoid
- dotenv

## Features

- Generate unique short codes using nanoid.
- Store original URLs and short codes in PostgreSQL.
- Redirect users to original URLs.
- Handle invalid URLs and missing short codes.
- Secure database configuration using environment variables.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/mziad7101-svg/CodeAlpha_URLShortener.git
```

2. Navigate to the project folder:

```bash
cd CodeAlpha_URLShortener
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file in the project root:

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=url_shortener
DB_PASSWORD=your_password
DB_PORT=5432
```

5. Make sure PostgreSQL is running and create the `urls` table:

```sql
CREATE TABLE urls (
    id SERIAL PRIMARY KEY,
    original_url TEXT NOT NULL,
    short_code VARCHAR(10) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

6. Start the server:

```bash
node index.js
```

The server will run on:

`http://localhost:3000`

## API Endpoints

### 1. Home Route

**GET /**

Returns a welcome message.

### 2. Shorten URL

**POST /shorten**

Request Body:

```json
{
  "url": "https://www.youtube.com"
}
```

Example Response:

```json
{
  "message": "URL shortened successfully",
  "originalUrl": "https://www.youtube.com",
  "shortCode": "abc123",
  "shortUrl": "http://localhost:3000/abc123"
}
```

### 3. Redirect to Original URL

**GET /:shortCode**

Example:

`http://localhost:3000/abc123`

Redirects the user to the original URL.

If the short code does not exist, the API returns a 404 error.

## Database

The project uses PostgreSQL to store:

- ID
- Original URL
- Short Code
- Creation Date

## Author

**Ziad Mohamed**

GitHub: https://github.com/mziad7101-svg

## Internship

CodeAlpha Internship Program - 2026
