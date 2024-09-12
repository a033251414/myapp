import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Profile = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodeToken = jwtDecode(token);
      console.log(decodeToken.role);
      if (decodeToken.role === "admin") {
        setIsAdmin("true");
      }
    }
  }, []);

  useEffect(() => {
    const name = localStorage.getItem("username");
    if (name) {
      setUsername(name);
    }
  }, []);

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      setEmail(email);
    }
  }, []);
  useEffect(() => {
    const tel = localStorage.getItem("tel");
    if (tel) {
      setTel(tel);
    }
  }, []);

  const handleEmailChange = () => {
    navigate("/emailchange");
  };

  const handlePhoneChange = () => {
    navigate("/phonechange");
  };

  const AdminPageShow = () => {
    return (
      <li className="itembox drop-down">
        <Link className="item" to="/adminpage">
          管理員操作
        </Link>
        <div className="submenu">
          <Link className="submenu-item" to="/addproduct">
            新增商品
          </Link>
          <Link className="submenu-item" to="/addcoupon">
            新增優惠券
          </Link>
        </div>
      </li>
    );
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
          {isAdmin && AdminPageShow()}
        </ul>
      </div>

      <div className="center-background">
        <div className="profile-title">我的個人檔案</div>
        <table className="profile-table">
          <tbody>
            <tr>
              <td>使用者帳號</td>
              <td>{username}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>
                <p>{email}</p>
                <button className="profile-email-button" onClick={handleEmailChange}>
                  變更
                </button>
              </td>
            </tr>
            <tr>
              <td>手機號碼</td>
              <td>
                <p>{tel}</p>
                <button className="profile-phone-button" onClick={handlePhoneChange}>
                  變更
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
