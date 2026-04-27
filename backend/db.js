const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "@theo12",
    database: "task_manager",
    waitForConnections: true,
    connectionLimit: 10,
});

console.log("Connected to MySQL");

module.exports = db;