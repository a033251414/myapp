import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const PhoneChange = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSave = async () => {
    const telPattern = /^\+?[0-9]\d{1,14}$/;
    const token = localStorage.getItem("token");
    if (telPattern.test(inputValue)) {
      try {
        const response = await axios.post(
          "https://myapp1-test-3490f09779f0.herokuapp.com/phonechange",
          {
            phonenumber: inputValue,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 204) {
          alert("資料修改成功");
          navigate("/myapp/profile");
        }
      } catch (err) {
        const errorMessage =
          err.response && err.response.data ? err.response.data.message : "修改時發生錯誤";
        alert(errorMessage);
      }
    } else {
      alert("請輸入有效的手機號碼");
    }
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

      <div className="center-background">
        <div className="profile-title">變更手機號碼</div>
        <div className="phone-change-table-container">
          <table className="phone-change-table">
            <tbody>
              <tr>
                <td>
                  <label className="phone-change-label" htmlFor="tel">
                    <p>請輸入手機號碼：</p>
                  </label>
                </td>
                <td>
                  <input
                    onChange={handleChange}
                    className="phone-change-input"
                    type="tel"
                    id="tel"
                    placeholder="請輸入您的手機號碼"
                    value={inputValue}
                  />
                </td>
              </tr>
              <tr>
                <td></td>
                <td className="phone-change-table-last-td">
                  <button onClick={handleSave} className="phone-change-save">
                    儲存
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PhoneChange;
