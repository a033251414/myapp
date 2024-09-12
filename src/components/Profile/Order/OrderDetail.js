import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const OrderDetail = () => {
  const { orderId } = useParams();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:8080/orderdetail/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setOrders(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("抓取資料錯誤:", error);
      });
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-menu-container">
        <ul className="menu">
          <li className="itembox drop-down">
            <a className="item" href="/profile">
              我的帳戶
            </a>
            <div className="submenu">
              <a className="submenu-item" href="/profile">
                個人檔案
              </a>
              <a className="submenu-item" href="/passwordcheck">
                更改密碼
              </a>
            </div>
          </li>
          <li className="itembox drop-down">
            <a className="item" href="/shoppinglist">
              購買清單
            </a>
          </li>
          <li className="itembox drop-down">
            <a className="item" href="/mycoupons">
              我的優惠券
            </a>
          </li>
        </ul>
      </div>
      <div className="center-background">
        <div className="detail-title">訂單明細</div>
        <div>
          <table className="detail-table">
            <thead>
              <tr>
                <td>購買商品</td>
                <td>數量</td>
                <td>價格小計</td>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) =>
                order.items.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <div className="item-info-container">
                        <img className="detail-img" src={item.imgSrc} alt={item.name} />
                        <p>{item.name}</p>
                      </div>
                    </td>
                    <td>{item.quantity}</td>
                    <td>{item.price * item.quantity}</td> {/* 假設 item.price 是單價 */}
                  </tr>
                ))
              )}
            </tbody>

            <thead>
              <tr>
                <td className="divider">
                  <h1>收件人資訊</h1>
                </td>
                <td className="divider"></td>
                <td className="divider"></td>
              </tr>
              <tr>
                <td>收件人姓名</td>
                <td>手機號碼</td>
                <td>收件地址</td>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.recipientname}</td>
                  <td>{order.tel}</td>
                  <td>{order.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
