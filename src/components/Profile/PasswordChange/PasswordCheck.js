import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PasswordCheck = ({ passwordSuccess, setPasswordSuccess }) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  /*提取token中email資料 與輸入的password一起傳入後端確認密碼*/
  const handleCheck = async () => {
    const token = localStorage.getItem("token");
    let email;
    if (token) {
      const decodedToken = jwtDecode(token);
      email = decodedToken.email;
    }
    try {
      const response = await axios.post("http://localhost:8080/passwordcheck", {
        email,
        password,
      });
      if (response.status === 200) {
        setPasswordSuccess(true);
        localStorage.setItem("passwordSuccess", passwordSuccess);
        alert("密碼正確");
        navigate("/passwordchange");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        alert(err.response.data);
      }
    }
  };

  const handleBack = () => {
    navigate("/profile");
  };

  return (
    <div>
      <div className="passwordcheck-container">
        <button onClick={handleBack} className="passwordcheck-back-button">
          ←
        </button>

        <p>請輸入您的密碼</p>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="passwordcheck-input"
          placeholder="請輸入您的密碼"
          value={password}
        ></input>
        <button onClick={handleCheck} className="passwordcheck-button">
          確認
        </button>
      </div>
    </div>
  );
};

export default PasswordCheck;
