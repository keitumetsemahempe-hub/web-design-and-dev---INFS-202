require("dotenv").config();

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// const db = require("./db");

const app = express();

app.use(cors({
    origin: "*",
    credentials: true
}));
app.use(express.json());

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "secretkey";



app.get("/", (req, res) => {
    res.send("API running");
});

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: "Invalid token" });
    }
}

//app.get("/api/tasks/:id", authMiddleware, async (req, res) => {
  //  const taskId = req.params.id;
//
  //  try {
    //    const [rows] = await db.execute(
//            "SELECT * FROM Tasks WHERE task_id = ? AND user_id = ?",
//            [taskId, req.user.id] 
//    );
//    if (rows.length=== 0) {
//        return res.status(404).json({ message: "Task not found"});
//    }
//        res.json(rows[0]);
//    } catch (err) {
  //      console.error(err);
//        res.status(500).json({ message: err.message });
//    }
//});

//app.get("/api/tasks", authMiddleware, async (req, res) => {
 //   
//
//    try {
//        const [rows] = await db.execute(
//            "SELECT * FROM Tasks WHERE  user_id = ?",
//                [req.user.id] 
//    );
//    
//        res.json(rows);
//    } catch (err) {
//        console.error(err);
//      res.status(500).json({ message: err.message });
//    }
//});



//app.post("/api/tasks", authMiddleware, async (req, res) => {
//    const { title , description } = req.body;
//
//    try {
//
//        if (!title) {
//            return res.status(400).json({ message: "Title is required" });
//        }
//
//        await db.execute(
//            "INSERT INTO Tasks (title, description, user_id) VALUES (?, ?, ?)",
//            [title, description, req.user.id]
//        );
//        res.json({ message: "Task created" });
//    } catch (err) {
//        console.error(err);
//        res.status(500).json({ message: err.message });
//    }
//});

//app.put("/api/tasks/:id", authMiddleware, async (req, res) => {
//   const taskId = parseInt(req.params.id);
//    const { title, description , status } = req.body;
//
//    try {
//        if (!title || !status) {
//            return res.status(400).json({ message: "Title and status are required" });
//        }
//        await db.execute(
//            "UPDATE Tasks SET title = ?, description = ?, status = ? WHERE task_id = ? AND user_id = ?",
//            [title, description, status, taskId, req.user.id]
//        );
//        res.json({ message: "Task updated" });
//    } catch (err) {
//        console.error(err);
//        res.status(500).json({ message: err.message });
//   }
//});

//app.delete("/api/tasks/:id", authMiddleware, async (req, res) => {
//    const taskId = parseInt(req.params.id);
//
//    try {
//        await db.execute(
//            "DELETE FROM Tasks WHERE task_id = ? AND user_id = ?",
//            [taskId, req.user.id]
//        );
//        res.json({ message: "Task deleted" });
//    } catch (err) {
//        console.error(err);
//        res.status(500).json({ message: err.message });
//    }
//});

//app.post("/api/register", async (req, res) => {
//
//
//    const { name, email , password } = req.body;
//
//    try {
//
//        if (!name || !email || !password) {
//            return res.status(400).json({ message: "All fields are required" });
//        }
//
//        const[existingUser]=await db.execute(
//            "SELECT * FROM Users WHERE email = ?",
//            [email]
//        );
//        
//        if (existingUser.length > 0){
//            return res.status(400).json({ message: "Email already exists"});
//        }
//
//        const hashedPassword = await bcrypt.hash(password, 10);
//
//        await db.execute(
//            "INSERT INTO Users (name, email, password_hash) VALUES (?, ?, ?)",
//            [name, email, hashedPassword]
//        );
//
//        res.json({ message: "User registered" });
//    } catch (err) {
//        console.error(err);
//        res.status(500).json({ message: err.message });
//    }
//});

//app.post("/api/login", async (req, res) => {
//    const { email , password } = req.body;
//
//    try {
//        if (!email || !password) {
//            return res.status(400).json({ message: "Email and password are required" });
//        }
//
//
//        const [rows] = await db.execute(
//            "SELECT * FROM Users WHERE email = ?",
//            [email]
 //       );
//
//        const user = rows[0];
//
//        if (!user) {
//            return res.status(400).json({ message: "User not found" });
//        }
//
//        const isMatch = await bcrypt.compare(password, user.password_hash);
//
  //      if (!isMatch) {
//            return res.status(400).json({ message: "Invalid credentials" });
//        }
//
//        const token = jwt.sign(
//            { id: user.user_id, email: user.email },
//            JWT_SECRET,
//            { expiresIn: "1h" }
//        );
//
//        res.json({
//            message: "Login successful",
//            token
//        });
//
//    } catch (err) {
//        console.error(err);
//        res.status(500).json({ message: err.message });
//    }
//});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});