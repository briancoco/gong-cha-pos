import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const Login = ({navigate}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function loginButtonClicked() {
    try {
      const response = await fetch("http://localhost:3001/users/login", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        user_name: username,
        user_password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Get users position error, user not found");
      }

      const data = await response.json();
      localStorage.setItem("user_info", JSON.stringify(data[0]));    
      navigate('/');  
    }
    catch (error) {
      console.error("Error occurred in loginButtonClicked: " + error.message);
    }
  }

  return (
    <div className="login-box">
      <span style={{fontSize: '24px'}}>Log In</span>
      <div className="login-container">
        <input
          style={{fontFamily: "Lusitana"}}
          type="text"
          placeholder="Username"
          className="login-box-input"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          style={{fontFamily: "Lusitana"}}
          type="password"
          placeholder="Password"
          className="login-box-input"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button onClick={loginButtonClicked} className="login-box-button">Login</button>
      <Link to="/register" style={{textDecoration: 'none'}}>
        <button className="create-account-box-button">Create Account</button>
      </Link>
    </div>
  )
}

export default Login