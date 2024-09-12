import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const MyCoupons = () => {
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState([]);

  /*顯示優惠券*/

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/mycoupons", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCoupons(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("取得優惠券資料失敗:", error);
      }
    };
    fetchData();
  }, []);

  const CouponImg = ({ discountAmount }) => {
    if (discountAmount === 60) {
      return <img className="coupon-img" src="/免運券.png" alt="優惠券"></img>;
    }
    return null;
  };

  const handleGoHomePage = () => {
    navigate("/");
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
        <div className="profile-title">我的優惠券</div>
        <table className="profile-table">
          <tbody>
            {coupons.length > 0 ? (
              coupons.map((claimedCoupon) => (
                <tr key={claimedCoupon.id} className="coupon-tr">
                  <td className="coupon-td">
                    <div className="content">
                      <CouponImg discountAmount={claimedCoupon.coupon.discountAmount} />
                      <div className="text-content">
                        <p>使用超商取貨免運費</p>
                        <button onClick={handleGoHomePage}>稍後使用</button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <p className="no-coupons-message">沒有可顯示的優惠券</p>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyCoupons;
