import React from 'react'
import '../index.css';
import {Link} from 'react-router-dom';

const Login = () => {
  function loginButtonClicked() {
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