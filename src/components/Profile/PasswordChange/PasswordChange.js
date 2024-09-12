import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
const PasswordChange = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const handleSave = async () => {
    const token = localStorage.getItem("token");
    let email;
    if (token) {
      const decodedToken = jwtDecode(token);
      email = decodedToken.email;
    }
    if (newPassword == passwordCheck) {
      try {
        const response = await axios.put("http://localhost:8080/passwordchange", {
          email,
          newPassword,
        });
        if (response.status === 200) {
          alert("密碼修改成功");
          navigate("/profile");
        }
      } catch (err) {
        const errorMessage =
          err.response && err.response.data ? err.response.data.message : "密碼修改時發生錯誤";
        alert(errorMessage);
      }
    } else {
      alert("新密碼和確認密碼不一致");
    }
  };
  return (
    <div className="profile-container">
      <div className="profile-menu-container">
        <ul className="menu">
          <li className="itembox drop-down">
            <Link className="item" to="/profile">
              我的帳戶
            </Link>
            <div className="submenu">
              <Link className="submenu-item" to="/profile">
                個人檔案
              </Link>
              <Link className="submenu-item" to="/passwordcheck">
                更改密碼
              </Link>
            </div>
          </li>
          <li className="itembox drop-down">
            <Link className="item" to="/shoppinglist">
              購買清單
            </Link>
          </li>
          <li className="itembox drop-down">
            <Link className="item" to="/mycoupons">
              我的優惠券
            </Link>
          </li>
        </ul>
      </div>

      <div className="center-background">
        <div className="profile-title">變更你的密碼</div>
        <table className="profile-table">
          <tbody>
            <tr>
              <td>
                <label className="change-label" htmlFor="email">
                  新的密碼
                </label>
              </td>
              <td>
                <input
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="change-input"
                  type="email"
                  id="email"
                  value={newPassword}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label className="change-label" htmlFor="email">
                  確認密碼
                </label>
              </td>
              <td>
                <input
                  onChange={(e) => setPasswordCheck(e.target.value)}
                  className="change-input"
                  type="email"
                  id="email"
                  value={passwordCheck}
                />
              </td>
            </tr>

            <tr>
              <td>
                <button onClick={handleSave} className="password-change-save ">
                  儲存
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PasswordChange;
