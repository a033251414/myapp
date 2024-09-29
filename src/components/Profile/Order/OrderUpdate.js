import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const OrderUpdate = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [recipientName, setRecipientName] = useState("");
  const [telUpdate, setTelUpdate] = useState("");
  const [addressUpdate, setAddressUpdate] = useState("");
  const handleSave = async () => {
    if (recipientName && telUpdate && addressUpdate) {
      try {
        const response = await axios.patch(
          `https://myapp1-test-3490f09779f0.herokuapp.com/orderupdate/${orderId}`,
          {
            recipientName,
            telUpdate,
            addressUpdate,
          }
        );
        if (response.status === 204) {
          alert("資料修改成功");
          navigate("/myapp/shoppinglist");
        }
      } catch (err) {
        const errorMessage =
          err.response && err.response.data ? err.response.data.message : "修改時發生錯誤";
        alert(errorMessage);
      }
    } else {
      alert("請填寫所有欄位");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-menu-container">
        <ul className="menu">
          <li className="itembox drop-down">
            <a className="item" href="/myapp/profile">
              我的帳戶
            </a>
            <div className="submenu">
              <a className="submenu-item" href="/myapp/profile">
                個人檔案
              </a>
              <a className="submenu-item" href="/myapp/passwordcheck">
                更改密碼
              </a>
            </div>
          </li>
          <li className="itembox drop-down">
            <a className="item" href="/myapp/shoppinglist">
              購買清單
            </a>
          </li>
          <li className="itembox drop-down">
            <a className="item" href="/myapp/mycoupons">
              我的優惠券
            </a>
          </li>
        </ul>
      </div>
      <div className="center-background">
        <div className="profile-title">修改訂單</div>
        <table className="orderupdate-table">
          <thead>
            <tr>
              <td>
                <h2>要修改的資訊</h2>
              </td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="orderupdate-td">
                <label forhtml="name-update">姓名：</label>
              </td>
              <td>
                <input
                  onChange={(e) => setRecipientName(e.target.value)}
                  value={recipientName}
                  className="orderupdate-input"
                  type="text"
                  id="name-update"
                  placeholder="請輸入姓名"
                ></input>
              </td>
            </tr>
            <tr>
              <td className="orderupdate-td">
                <label forhtml="tel-update">電話：</label>
              </td>
              <td>
                <input
                  onChange={(e) => setTelUpdate(e.target.value)}
                  value={telUpdate}
                  className="orderupdate-input"
                  type="tel"
                  id="tel-update"
                  placeholder="請輸入電話"
                ></input>
              </td>
            </tr>
            <tr>
              <td className="orderupdate-td">
                <label forhtml="address-update">取貨地址：</label>
              </td>
              <td>
                <input
                  onChange={(e) => setAddressUpdate(e.target.value)}
                  value={addressUpdate}
                  className="orderupdate-input"
                  type="text"
                  id="address-update"
                  placeholder="請輸入取貨地址"
                ></input>
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <button onClick={handleSave} className="orderupdate-save">
            確認送出
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderUpdate;
