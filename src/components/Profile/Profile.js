import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Profile = ({ isLoggedIn }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [tel, setTel] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isVisibleMenu, setIsVisibleMenu] = useState(false);

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
    const fetchData = async () => {
      try {
        const response = await axios.get("https://myapp1-test-3490f09779f0.herokuapp.com/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response) {
          setTel(response.data.phonenumber);
        }
      } catch (err) {
        console.error("抓取資料錯誤:", err);
      }
    };
    fetchData();
  }, []);

  const handlePhoneChange = () => {
    navigate("/myapp/phonechange");
  };

  const AdminPageShow = () => {
    return (
      <li className="itembox drop-down">
        <Link className="item">管理員操作</Link>
        <div className="submenu">
          <Link className="submenu-item" to="/myapp/addproduct">
            新增商品
          </Link>
          <Link className="submenu-item" to="/myapp/addcoupon">
            新增優惠券
          </Link>
        </div>
      </li>
    );
  };

  const PhoneAdminPageShow = () => {
    return (
      <li className="profile-phone-itembox profile-phone-drop-down">
        <Link className="profile-phone-item">
          <h1>管理員操作</h1>
        </Link>
        <div className="profile-phone-submenu">
          <Link onClick={handleClick} className="profile-phone-submenu-item" to="/myapp/addproduct">
            新增商品
          </Link>
          <Link onClick={handleClick} className="profile-phone-submenu-item" to="/myapp/addcoupon">
            新增優惠券
          </Link>
        </div>
      </li>
    );
  };

  const handleVisbleMenu = () => {
    setIsVisibleMenu(!isVisibleMenu);
  };

  const handleClick = () => {
    setIsVisibleMenu(!isVisibleMenu);
  };

  return (
    <div className="profile-container">
      <div className="profile-menu-container">
        <ul className="menu">
          <li className="itembox drop-down">
            <Link className="item" to="/myapp/profile">
              我的帳戶
            </Link>
            <div className="submenu">
              <Link className="submenu-item" to="/myapp/profile">
                個人檔案
              </Link>
              <Link className="submenu-item" to="/myapp/passwordcheck">
                更改密碼
              </Link>
            </div>
          </li>
          <li className="itembox drop-down">
            <Link className="item" to="/myapp/shoppinglist">
              購買清單
            </Link>
          </li>
          <li className="itembox drop-down">
            <Link className="item" to="/myapp/mycoupons">
              我的優惠券
            </Link>
          </li>
          {isAdmin && AdminPageShow()}
        </ul>
      </div>
      <div className="profile-phone-drop-down-menu">
        <button
          onClick={handleVisbleMenu}
          className={`profile-menu-btn ${isVisibleMenu ? "active" : ""}`}
        >
          <img className="profile-menu-icon" src="/myapp/箭頭.png"></img>
        </button>
        <nav className={`profile-phone-menu-container ${isVisibleMenu ? "active" : ""}`}>
          <div>
            <ul className="profile-phone-menu">
              <li className="profile-phone-itembox profile-phone-drop-down">
                <Link className="profile-phone-item">
                  <h1>我的帳戶</h1>
                </Link>
                <div className="profile-phone-submenu">
                  <Link
                    onClick={handleClick}
                    className="profile-phone-submenu-item"
                    to="/myapp/profile"
                  >
                    個人檔案
                  </Link>
                  <Link
                    onClick={handleClick}
                    className="profile-phone-submenu-item"
                    to="/myapp/passwordcheck"
                  >
                    更改密碼
                  </Link>
                </div>
              </li>
              <li className="profile-phone-itembox profile-phone-drop-down">
                <Link className="profile-phone-item" to="/myapp/shoppinglist">
                  <h1>購買清單</h1>
                </Link>
              </li>
              <li className="profile-phone-itembox profile-phone-drop-down">
                <Link className="phone-item" to="/myapp/mycoupons">
                  <h1>我的優惠券</h1>
                </Link>
              </li>
              {isAdmin && PhoneAdminPageShow()}
            </ul>
          </div>
        </nav>
      </div>
      {isLoggedIn ? (
        <div className="center-background">
          <div className="profile-title">我的個人檔案</div>
          <div className="profile-table-container">
            <table className="profile-table">
              <tbody>
                <tr>
                  <td>使用者帳號</td>
                  <td>{username}</td>
                </tr>

                <tr>
                  <td>手機號碼</td>
                  <td>
                    <p>{tel}</p>
                  </td>
                  <td>
                    <button className="profile-phone-button" onClick={handlePhoneChange}>
                      變更
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="center-background">
          <div className="profile-title">我的個人檔案</div>
          <div className="profile-login-reminder-container">
            <p className="profile-login-reminder">
              請先<Link to="/myapp/login">登入</Link>查看訊息
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
