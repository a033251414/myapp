import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const EmailChange = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleSave = () => {
    const emailPattern = /^[^\s@]+@gmail\.com$/;
    if (emailPattern.test(inputValue)) {
      localStorage.setItem("email", inputValue);
      alert("Email儲存成功");
      navigate("/profile");
    } else {
      alert("請輸入有效的 email 地址");
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
        <div className="profile-title">變更Email</div>
        <table className="profile-table">
          <tbody>
            <tr>
              <td>
                <label className="change-label" htmlFor="email">
                  請輸入Email
                </label>
              </td>
              <td>
                <input
                  onChange={handleChange}
                  className="change-input"
                  type="email"
                  id="email"
                  placeholder="請輸入您的Email"
                  value={inputValue}
                />
              </td>
            </tr>
            <tr>
              <td>
                <button onClick={handleSave} className="email-change-save">
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

export default EmailChange;
