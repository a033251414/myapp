import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Cart = ({ isLoggedIn, setQuantity, cartItems, setCartItems, setCartQuantity }) => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const CartQuantityKey = `CartQuantity_${username}`;
  const [activeButton, setActiveButton] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      const cartKey = `cartItems_${username}`;
      try {
        const storedCartItems = JSON.parse(localStorage.getItem(cartKey)) || [];
        setCartItems(storedCartItems);
        setQuantity(storedCartItems.length);
      } catch (error) {
        console.error("解析 JSON 時發生錯誤:", error);
        setCartItems([]);
      }
    }
  }, [isLoggedIn, setCartItems, setQuantity]);

  /*刪除購物車物品*/
  const handleDelete = (indexToRemove, quantity, updateQuantity = true) => {
    /*更新購物車圖示數量*/
    if (updateQuantity) {
      let cartQuantity = localStorage.getItem(CartQuantityKey);
      cartQuantity = cartQuantity ? parseInt(cartQuantity, 10) : 0;
      const newQuantity = cartQuantity - quantity;
      localStorage.setItem(CartQuantityKey, newQuantity);
    }

    const cartKey = `cartItems_${username}`;
    const updatedCartItems = cartItems.filter((item, index) => index !== indexToRemove);
    setCartItems(updatedCartItems);
    localStorage.setItem(cartKey, JSON.stringify(updatedCartItems));
    setQuantity(updatedCartItems.length);
  };

  const handleQuantityChange = (index, change) => {
    const intChange = parseInt(change, 10);
    const currentQuantity = parseInt(localStorage.getItem(CartQuantityKey), 10);
    const newQuantity = currentQuantity + intChange;
    localStorage.setItem(CartQuantityKey, newQuantity);
    setCartQuantity(newQuantity);

    const cartKey = `cartItems_${username}`;
    const updatedCartItems = [...cartItems];
    const item = updatedCartItems[index];

    if (item.quantity + change <= 0) {
      handleDelete(index, 0, false);
      return;
    }

    item.quantity += change;
    updatedCartItems[index] = item;
    setCartItems(updatedCartItems);
    localStorage.setItem(cartKey, JSON.stringify(updatedCartItems));
    setQuantity(updatedCartItems.length);
  };
  const handlePlaceOrder = () => {
    const storePickup = localStorage.getItem("DeliveryMethod");
    if (!storePickup) {
      alert("請選擇寄送方式");
    } else {
      navigate("/myapp/checkout");
    }
  };

  const handleback = () => {
    navigate("/myapp");
  };

  const habdlestorePickup = (method) => {
    setActiveButton(0);
    localStorage.setItem("DeliveryMethod", method);
  };
  const habdlehomeDeliveryClick = (method) => {
    setActiveButton(1);
    localStorage.setItem("DeliveryMethod", method);
  };

  const totalAmount = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className="cart-container">
      <div>
        <h1>您的購物車</h1>
        <button onClick={handleback} className="cart-back">
          <p>返回</p>
        </button>
      </div>
      {isLoggedIn ? (
        cartItems.length > 0 ? (
          <table className="cart-table">
            <thead>
              <tr className="cart-tr">
                <th>商品</th>
                <th>單價</th>
                <th>數量</th>
                <th>總計</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index} className="cart-tr">
                  <td>
                    <img className="cart-img" src={item.imgSrc} alt={item.name} />
                    <p>{item.name}</p>
                  </td>
                  <td>
                    <p>{item.price}</p>
                  </td>
                  <td>
                    <div className="quantity-container">
                      <button
                        className="quantity-button"
                        onClick={() => handleQuantityChange(index, -1)}
                      >
                        -
                      </button>
                      <p className="quantity-number">{item.quantity}</p>
                      <button
                        className="quantity-button"
                        onClick={() => handleQuantityChange(index, 1)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>
                    <p>${item.price * item.quantity}</p>
                  </td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(index, item.quantity)}
                    >
                      移除
                    </button>
                  </td>
                </tr>
              ))}

              <tr className="delivery-tr">
                <td>寄送方式</td>

                <td>
                  <h3>請選擇寄送方式：</h3>
                </td>
                <td>
                  <button
                    onClick={() => habdlestorePickup("storePickup")}
                    className={`delivery-button ${activeButton === 0 ? "active" : ""}`}
                  >
                    711超商取貨付款
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => habdlehomeDeliveryClick("homeDelivery")}
                    className={`delivery-button ${activeButton === 1 ? "active" : ""}`}
                  >
                    宅配
                  </button>
                </td>
              </tr>

              <tr className="cart-tfoot">
                <td className="cart-total" colSpan="3">
                  總金額：{totalAmount}
                </td>
                <td className="cart-total-amount" colSpan="2">
                  <div className="total-amount-container">
                    <button className="place-order-button" onClick={handlePlaceOrder}>
                      <p>前往下訂單</p>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p className="cart-p">您的購物車是空的</p>
        )
      ) : (
        <p className="cart-p">
          請先<Link to="/myapp/login">登入</Link>以查看購物車內容
        </p>
      )}
    </div>
  );
};

export default Cart;
