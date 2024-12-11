import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = () => {
    if (email === "admin@gmail.com" && password === "123456") {
      navigate("/dashboard"); 
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>
        ADMIN
      </h2>
      <p style={{ fontSize: "16px", color: "#555", marginBottom: "30px",marginTop:-10 }}>
        Đăng nhập để quản lý dữ liệu
      </p>

      <div
        style={{
          width: "40%",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          alignItems: "center",
        }}
      >
        {error && (
          <p style={{ color: "red", fontSize: "14px", marginBottom: "10px" }}>
            {error}
          </p>
        )}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address *"
          style={{
            width: "100%",
            height: 30,
            padding: "10px",
            fontSize: "16px",
            border: "1px solid black",
            borderRadius: "4px",
            outline: "none",
          }}
        />
        <input
          type="password"
          style={{
            width: "100%",
            height: 30,
            padding: "10px",
            fontSize: "16px",
            border: "1px solid black",
            borderRadius: "4px",
            outline: "none",
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password *"
        />
        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            height: 40,
            backgroundColor: "red",
            color: "white",
            fontSize: "16px",
            border: "none",
            borderRadius: "4px",
            outline: "none",
            cursor: "pointer",
          }}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Login;
