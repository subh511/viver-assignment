import React, { useState } from "react";
import axios from "axios";
import "./LoginForm.css";

const LoginForm = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!formData.email || !formData.password) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    axios
      .post("https://reqres.in/api/login", formData)
      .then((response) => {
        console.log(response.data);
        onLoginSuccess(response.data.token);
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("Invalid email or password");
      });
  };

  return (
    <div className="login-form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
