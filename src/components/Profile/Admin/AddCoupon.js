import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
const AddCoupon = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [discountAmount, setDiscountAmount] = useState("");
  const [discountType, setDiscountType] = useState("fixed");
  const [startDate, setStartDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [usageLimit, setUsageLimit] = useState(1);
  const [minSpend, setMinSpend] = useState(0);
  const [couponCode, setCouponCode] = useState(0);

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

  const handleDiscountAmount = (e) => {
    setDiscountAmount(e.target.value);
  };
  const handleDiscpimtType = (e) => {
    setDiscountType(e.target.value);
  };
  const handleStartDate = (e) => {
    setStartDate(e.target.value);
  };
  const handleExpiryDate = (e) => {
    setExpiryDate(e.target.value);
  };
  const handUsageLimit = (e) => {
    setUsageLimit(e.target.value);
  };
  const handleMinSpend = (e) => {
    setMinSpend(e.target.value);
  };
  const handleCouponCode = (e) => {
    setCouponCode(e.target.value);
  };
  const handleCreate = async () => {
    try {
      const response = await axios.post("http://localhost:8080/addcoupon", {
        discountAmount,
        discountType,
        startDate,
        expiryDate,
        usageLimit,
        minSpend,
        couponCode,
      });
      if (response.status === 201) {
        alert("優惠券生成成功");
      }
    } catch (err) {
      const errorMessage =
        err.response && err.response.data ? err.response.data.message : "創建優惠券時發生錯誤";
      alert(errorMessage);
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
          {isAdmin && AdminPageShow()}
        </ul>
      </div>

      <div className="center-background">
        <div className="profile-title">新增優惠券</div>

        <table className="profile-table">
          <tbody>
            <tr>
              <td>
                <div className="addPage-container">
                  <label htmlFor="discountAmount" className="addPage-label">
                    折扣金額：
                  </label>
                  <input
                    onChange={handleDiscountAmount}
                    value={discountAmount}
                    className="addPage-input"
                    placeholder="必填"
                    type="number"
                    id="discountAmount"
                    required
                  />
                </div>
              </td>
              <td>
                <div className="addPage-container">
                  <label htmlFor="discountType" className="addPage-label">
                    折扣類型：
                  </label>
                  <select
                    onChange={handleDiscpimtType}
                    value={discountType}
                    id="discountType"
                    className="addPage-input"
                  >
                    <option value="fixed">固定金額</option>
                    <option value="percentage">百分比</option>
                  </select>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="addPage-container">
                  <label htmlFor="startDate" className="addPage-label">
                    生效日期：
                  </label>
                  <input
                    onChange={handleStartDate}
                    value={startDate}
                    className="addPage-input"
                    type="date"
                    id="startDate"
                    required
                  />
                </div>
              </td>
              <td>
                <div className="addPage-container">
                  <label htmlFor="expiryDate" className="addPage-label">
                    到期日期：
                  </label>
                  <input
                    onChange={handleExpiryDate}
                    value={expiryDate}
                    type="date"
                    id="expiryDate"
                    className="addPage-input"
                    required
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="addPage-container">
                  <label htmlFor="usageLimit" className="addPage-label">
                    能用次數：
                  </label>
                  <input
                    onChange={handUsageLimit}
                    value={usageLimit}
                    type="number"
                    id="usageLimit"
                    className="addPage-input"
                  />
                </div>
              </td>
              <td>
                <div className="addPage-container">
                  <label htmlFor="minSpend" className="addPage-label">
                    最低消費：
                  </label>
                  <input
                    onChange={handleMinSpend}
                    value={minSpend}
                    type="number"
                    id="minSpend"
                    className="addPage-input"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="addPage-container">
                  <label htmlFor="couponCode" className="addPage-label">
                    優惠券碼：
                  </label>
                  <input
                    onChange={handleCouponCode}
                    value={couponCode}
                    placeholder="必填"
                    type="text"
                    id="couponCode"
                    className="addPage-input"
                    required
                  />
                </div>
              </td>
              <td>
                <button onClick={handleCreate} className="create-btn">
                  生成優惠券
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddCoupon;
