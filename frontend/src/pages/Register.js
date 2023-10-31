import React from 'react'
import '../index.css';

const Register = () => {
  function createAccountButtonClicked() {
    console.log("Register.js: Create Account button clicked")
  }

  return (
    <div className="login-box">
      <span style={{fontSize: '24px'}}>Register New Account</span>
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

      <button onClick={createAccountButtonClicked} className="create-account-box-button">Register</button>
    </div>
  )
}

export default Register