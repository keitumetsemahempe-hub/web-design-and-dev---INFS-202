const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, '.env')
});

const mysql = require('mysql2/promise');
const { URL } = require('url');

// Get connection string
const connectionString = process.env.MYSQL_URL;

// Safety check
if (!connectionString) {
  throw new Error('MYSQL_URL is missing. Check Render environment variables.');
}

// Parse the MYSQL_URL
const dbUrl = new URL(connectionString);

// Create MySQL pool
const db = mysql.createPool({
  host: dbUrl.hostname,
  user: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.replace('/', ''),
  port: dbUrl.port ? Number(dbUrl.port) : 3306,
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = db;