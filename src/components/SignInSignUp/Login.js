import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/myapp");
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://myapp1-test-3490f09779f0.herokuapp.com/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, email } = response.data;

        console.log(response.data);

        localStorage.setItem("token", token);
        localStorage.setItem("username", email);
        localStorage.setItem("isLoggedIn", "true");

        setIsLoggedIn(true);
        alert("登入成功, 即將導向");
        navigate("/myapp");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        alert(err.response.data);
      }
    }
  };

  return (
    <div className="loginpage-container">
      <div className="form-group">
        <label htmlFor="Email">電子郵件：</label>
        <input
          id="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="Password">輸入密碼：</label>
        <input
          id="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
      </div>
      <div className="login-button-container">
        <button onClick={handleBack} className="login-button">
          返回
        </button>
        <button onClick={handleLogin} className="login-button">
          登入
        </button>
      </div>
    </div>
  );
};

export default Login;
