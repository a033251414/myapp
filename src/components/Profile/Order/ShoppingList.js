import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const ShoppingList = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isVisibleMenu, setIsVisibleMenu] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://myapp1-test-3490f09779f0.herokuapp.com/shoppinglist",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("抓取資料錯誤:", error);
      }
    };

    fetchData(); // 調用 async 函數
  }, []);
  const handleOrderDetail = (orderId) => {
    navigate(`/myapp/orderdetail/${orderId}`);
  };

  const handleUpdate = (orderId) => {
    navigate(`/myapp/orderupdate/${orderId}`);
  };

  const handleDelete = async (orderId) => {
    const result = window.confirm("是否確定要刪除訂單？");
    if (result) {
      const response = await axios.delete(
        `https://myapp1-test-3490f09779f0.herokuapp.com/shoppinglist/${orderId}`
      );
      if (response.status === 200) {
        alert("已刪除訂單");
        window.location.reload();
      }
    } else {
      console.log("用戶點擊了取消");
    }
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
                      {order._id.slice(-8)}
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
      ) : (
        <div className="center-background">
          <div className="profile-title">我的購買清單</div>
          <div className="profile-shoppinglist-reminder-container">
            <p className="profile-shoppinglist-reminder">
              請先<Link to="/myapp/login">登入</Link>查看訊息
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingList;
