const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, '.env') // ensures it loads from /backend/.env
});

const mysql = require('mysql2/promise');
const { URL } = require('url');

// Get connection string
const connectionString = process.env.DATABASE_URL;

// Safety check (prevents vague crashes)
if (!connectionString) {
  throw new Error('DATABASE_URL is missing. Make sure .env is in /backend and loaded correctly.');
}

// Parse the DATABASE_URL
const dbUrl = new URL(connectionString);

// Create MySQL pool
const db = mysql.createPool({
  host: dbUrl.hostname,
  user: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.replace('/', ''), // cleaner extraction
  port: dbUrl.port ? Number(dbUrl.port) : 3306, // fallback to default MySQL port
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = db;