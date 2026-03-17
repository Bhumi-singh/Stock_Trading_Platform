import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    username: "",
    password: "",
  });

  const { email, username, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://stock-trading-platform-r8t9.onrender.com/signup",
        { ...inputValue }
      );
      
      const { success, message, token } = data;
      
      if (success) {
        // 1. Save the token to the browser's local storage!
        localStorage.setItem("token", token);
        alert(message);
        // 2. Redirect the user to the dashboard
        navigate("/");
      } else {
        alert(message);
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Signup failed!");
    }
  };

  return (
    <div className="form_container" style={{ margin: "50px auto", maxWidth: "400px", textAlign: "center" }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Email</label><br/>
          <input type="email" name="email" value={email} onChange={handleOnChange} required style={{ width: "100%", padding: "8px" }}/>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Username</label><br/>
          <input type="text" name="username" value={username} onChange={handleOnChange} required style={{ width: "100%", padding: "8px" }}/>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Password</label><br/>
          <input type="password" name="password" value={password} onChange={handleOnChange} required style={{ width: "100%", padding: "8px" }}/>
        </div>
        <button type="submit" className="btn btn-blue" style={{ padding: "10px 20px", cursor: "pointer" }}>Submit</button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;