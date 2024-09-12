import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ShoppingList = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]); // 初始化為空數組

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/shoppinglist", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("抓取資料錯誤:", error);
      }
    };

    fetchData(); // 調用 async 函數
  }, []);
  const handleOrderDetail = (orderId) => {
    navigate(`/orderdetail/${orderId}`);
  };

  const handleUpdate = (orderId) => {
    navigate(`/orderupdate/${orderId}`);
  };

  const handleDelete = async (orderId) => {
    const result = window.confirm("是否確定要刪除訂單？");
    if (result) {
      const response = await axios.delete(`http://localhost:8080/shoppinglist/${orderId}`);
      if (response.status === 200) {
        alert("已刪除訂單");
        window.location.reload();
      }
    } else {
      console.log("用戶點擊了取消");
    }
  };

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
        <div className="profile-title">我的購買清單</div>
        <table className="order-table">
          <thead>
            <tr>
              <td>訂單編號</td>
              <td>購買商品</td>
              <td>總價</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  <button
                    className="order-number-button"
                    onClick={() => handleOrderDetail(order._id)}
                  >
                    {order._id}
                  </button>
                </td>
                <td>
                  {order.items.map((item) => (
                    <p key={item._id}>
                      {item.name} x {item.quantity}
                    </p>
                  ))}
                </td>
                <td>{order.total}$</td>
                <td className="order-action-button">
                  <div>
                    <button onClick={() => handleUpdate(order._id)} className="order-edit-button">
                      修改訂單
                    </button>
                  </div>
                  <div>
                    <button onClick={() => handleDelete(order._id)} className="order-edit-button">
                      取消訂單
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShoppingList;
