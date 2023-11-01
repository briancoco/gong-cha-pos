import React, {useState} from 'react'
import '../index.css';

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function createAccountButtonClicked() {
    const response = await fetch("http://localhost:3001/users", {
      headers: {
        "Content-Type": "application/json"
      },
      method: 'POST',
      body: JSON.stringify({
        user_name: username,
        user_password: password,
      })
    });
    
    if (!response.ok) {
      console.log("Register.js: Account creation failed");
    }
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          style={{fontFamily: "Lusitana"}}
          type="password"
          placeholder="Password"
          className="login-box-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button onClick={createAccountButtonClicked} className="create-account-box-button">Register</button>
    </div>
  )
}

export default Register