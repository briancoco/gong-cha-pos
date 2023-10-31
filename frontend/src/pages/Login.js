import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function loginButtonClicked() {
    const response = await fetch("http://localhost:3001/users/login", {
    "Content-type": "application/json",
    method: "POST",
    body: JSON.stringify({
      user_name: username,
      user_password: password,
      })
    });

    console.log("Login.js: Login button clicked")
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
        />
        <input
          style={{fontFamily: "Lusitana"}}
          type="password"
          placeholder="Password"
          className="login-box-input"
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