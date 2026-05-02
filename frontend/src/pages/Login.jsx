import { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

const API = "https://web-design-and-dev-infs-202.onrender.com/api";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const [isLogin, setIsLogin] = useState(true);

    const [name, setName] = useState("");

    const navigate = useNavigate();


const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        
        const url = isLogin ? "/login" : "/register";

        const body = isLogin 
          ? { email, password }
          : { name, email, password };

        const res = await fetch(`${API}${url}`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(body)
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message || "Login failed");
            setLoading(false);
            return;
        }
  
        if (!isLogin) {
            alert("Registration successful. Please login.");
            setIsLogin(true);
            setName("");
            setEmail("");
            setPassword("");
            setLoading(false);
            return;
        }
         
        localStorage.setItem("token",data.token);

        alert("Login successful");

        navigate("/home");
    
    } catch (err) {
        console.error(err);
        alert("Server error")
    }
    setLoading(false);
};

return (
    <div className="login-container">
        <div className="login-card">
            <h2>
                {isLogin ? "Workspace Login" : "Create Account"}</h2>
                
             <p>
                {isLogin
                ? "Sign in to manage your tasks"
                :"Register to start "}
                </p>
            <form onSubmit={handleLogin}>
                {!isLogin && (
                     <input
                   type="text"
                   placeholder="Name"
                   value={name}
                   onChange={(e) => setName(e.target.value)}
                
                required
                />
                )}
                <input
                   type="email"
                   placeholder="Email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                
                required
                />
                <input
                type="password"
                   placeholder="Password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
               
                required
                />
                <button type="submit">
                     {loading 
                     ? "Processing..." 
                     :isLogin
                         ?"Login"
                         :"Register"}    
                </button> 
            </form>
            <p
               onClick={() => setIsLogin(!isLogin)}
               style={{cursor: "pointer", color: "blue"}}
               >
                {isLogin
                ? "Don't have an account? Register"
                : "Already have an account?? Login"}
               </p>
        </div>
    </div>
);
}

