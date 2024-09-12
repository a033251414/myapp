import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/register", {
        email,
        password,
        confirmPassword,
      });

      if (response.status === 201) {
        alert("Registration successful");
        navigate("/login");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        alert(response.data.message || "An error occurred. Please try again.");
      }
    } catch (err) {
      console.error("Error:", err.response ? err.response.data : err.message);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="RegisterPage">
      <div>
        <label htmlFor="Email">電子郵件：</label>
        <input
          id="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="register-input"
        />
      </div>
      <div>
        <label htmlFor="Password">密碼：</label>
        <input
          id="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register-input"
        />
      </div>
      <div>
        <label htmlFor="ConfirmPassword">確認密碼：</label>
        <input
          id="ConfirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="register-input"
        />
      </div>
      <div className="register-button-container">
        <button onClick={handleBack} className="register-button">
          返回
        </button>
        <button onClick={handleRegister} className="register-button">
          註冊
        </button>
      </div>
    </div>
  );
};

export default Register;
