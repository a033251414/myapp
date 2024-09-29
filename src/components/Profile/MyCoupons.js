import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyCoupons = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState([]);
  const [isVisibleMenu, setIsVisibleMenu] = useState(false);
  const availableCoupons = coupons.filter((coupon) => coupon.usageLimit !== coupon.usedTimes);
  /*顯示優惠券*/

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://myapp1-test-3490f09779f0.herokuapp.com/mycoupons",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCoupons(response.data);
      } catch (error) {
        console.log("取得優惠券資料失敗:", error);
      }
    };
    fetchData();
  }, []);

  const CouponImg = ({ discountAmount }) => {
    if (discountAmount === 60) {
      return <img className="mycoupon-img" src="/myapp/免運券.png" alt="優惠券"></img>;
    }
    return null;
  };

  const handleGoHomePage = () => {
    navigate("/myapp");
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
                <Link onClick={handleClick} className="profile-phone-item" to="/myapp/shoppinglist">
                  <h1>購買清單</h1>
                </Link>
              </li>
              <li className="profile-phone-itembox profile-phone-drop-down">
                <Link onClick={handleClick} className="phone-item" to="/myapp/mycoupons">
                  <h1>我的優惠券</h1>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      {isLoggedIn ? (
        <div className="center-background">
          <div className="profile-title">我的優惠券</div>
          <div className="mycoupon-container">
            <table className="mycoupon-table">
              <tbody>
                {availableCoupons.length > 0 ? (
                  availableCoupons.map((claimedCoupon) => (
                    <tr key={claimedCoupon.id} className="mycoupon-tr">
                      <td className="mycoupon-td">
                        <div className="mycoupon-content-container">
                          <CouponImg discountAmount={claimedCoupon.coupon.discountAmount} />
                          <div className="mycoupon-content">
                            <p>使用超商取貨免運費</p>
                            <button onClick={handleGoHomePage}>稍後使用</button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <p className="no-mycoupons-message">沒有可顯示的優惠券</p>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="center-background">
          <div className="profile-title">我的優惠券</div>
          <div className="profile-mycoupons-reminder-container">
            <p className="profile-mycoupons-reminder">
              請先<Link to="/myapp/login">登入</Link>查看訊息
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCoupons;
