const mysql = require('mysql2/promise');
const { URL } = require('url');
require('dotenv').config();

// Parse the DATABASE_URL string
const dbUrl = new URL(process.env.DATABASE_URL);

const db = mysql.createPool({
    host: dbUrl.hostname,
    user: dbUrl.username,
    password: dbUrl.password,
    database: dbUrl.pathname.split('/')[1],
    port: dbUrl.port,
    waitForConnections: true,
    connectionLimit: 10,
});

module.exports = db;