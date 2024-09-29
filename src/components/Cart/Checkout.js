import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = ({ isLoggedIn, cartItems, setCartItems }) => {
  const navigate = useNavigate();

  const DeliveryMethod = localStorage.getItem("DeliveryMethod");
  const [recipientName, setRecipientName] = useState("");
  const [tel, setTel] = useState("");
  const [address, setAddress] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [isActive, setIsActive] = useState(null);
  const [deductShipping, setDeductShipping] = useState(0);
  const [finalAmountSave, setFinalAmountSave] = useState(0);
  const [couponId, setCouponId] = useState(null);
  const availableCoupons = coupons.filter((coupon) => coupon.usageLimit !== coupon.usedTimes);
  const username = localStorage.getItem("username");
  const CartQuantityKey = `CartQuantity_${username}`;
  /*抓取購物明細*/

  useEffect(() => {
    if (isLoggedIn) {
      const username = localStorage.getItem("username");
      const cartKey = `cartItems_${username}`;
      try {
        const storedCartItems = JSON.parse(localStorage.getItem(cartKey)) || [];
        setCartItems(storedCartItems);
      } catch (error) {
        console.error("解析 JSON 時發生錯誤:", error);
        setCartItems([]);
      }
    }
  }, [isLoggedIn, setCartItems]);

  /*抓取動態視窗優惠券*/

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://myapp1-test-3490f09779f0.herokuapp.com/checkout",
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

  /*額外計算總費用並存進[setFinalAmountSave]*/

  useEffect(() => {
    // 根據 DeliveryMethod 計算運費
    const shippingCost =
      DeliveryMethod === "storePickup" ? 60 : DeliveryMethod === "homeDelivery" ? 100 : 0;
    const baseAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const amountWithShipping = baseAmount + shippingCost;
    const finalAmount = deductShipping ? amountWithShipping - deductShipping : amountWithShipping;
    setFinalAmountSave(finalAmount);
  }, [cartItems, deductShipping, DeliveryMethod]);

  /*商品總共費用組件*/

  const totalAmount = () => {
    const baseAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    return baseAmount;
  };

  /*顯示總運費(有無優惠券)*/
  const finalAmount = (ShippingCost) => {
    const baseAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    if (deductShipping) {
      const amountWithShipping = baseAmount + ShippingCost;
      const finalAmount = amountWithShipping - deductShipping;
      return finalAmount;
    } else {
      const finalAmount = baseAmount + ShippingCost; // 加上運費
      return finalAmount;
    }
  };

  const handlesetAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleNameChange = (e) => {
    setRecipientName(e.target.value);
  };

  const handleTelChange = (e) => {
    setTel(e.target.value);
  };

  const handleback = () => {
    navigate("/myapp/cart");
  };

  /*確認訂單送出*/
  const handleSubmit = async () => {
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    const cartKey = `cartItems_${username}`;
    const cartData = localStorage.getItem(cartKey);
    const total = finalAmountSave;

    if (cartData) {
      const items = JSON.parse(cartData);
      try {
        const response = await axios.post(
          "https://myapp1-test-3490f09779f0.herokuapp.com/checkout",
          {
            couponId,
            items,
            total,
            recipientName,
            tel,
            address,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 201) {
          /*測試*/
          await axios.post("https://myapp1-test-3490f09779f0.herokuapp.com/checkout/send-to-line", {
            recipientName,
            tel,
            address,
            items,
            total,
          });

          alert("已完成訂購");
          localStorage.removeItem(cartKey);
          localStorage.removeItem(CartQuantityKey);
          localStorage.setItem("DeliveryMethod", "");

          navigate("/myapp/placeorder");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  /*顯示動態視窗優惠券圖片組件*/

  const CouponImg = ({ discountAmount, CouponId, usageLimit, usedTimes }) => {
    if (discountAmount === 60) {
      return (
        <button
          onClick={() => handleisActive(CouponId, discountAmount, usageLimit, usedTimes)}
          className={
            isActive == CouponId ? "coupon-modal-select-btn-active" : "coupon-modal-select-btn"
          }
        >
          <img className="coupon-modal-img" src="/myapp/免運券.png" alt="優惠券"></img>
        </button>
      );
    }
    return null;
  };

  /*點擊優惠券*/

  const handleisActive = (CouponId, discountAmount, usedTimes, usageLimit) => {
    if (usedTimes !== usageLimit) {
      setIsActive(CouponId);
      setCouponId(CouponId);
      setDeductShipping(discountAmount);
    } else {
      alert("您已使用過優惠券");
    }
  };

  /*顯示超商取貨或是宅配組件*/
  const renderContent = () => {
    if (DeliveryMethod === "storePickup") {
      return (
        <table>
          <tbody>
            <tr>
              <td>
                <div>
                  <label className="deliverymethod-address-label" htmlFor="storename">
                    超商門市名稱：
                  </label>
                  <input
                    onChange={handlesetAddressChange}
                    value={address}
                    className="deliverymethod-address-input"
                    id="storename"
                    type="text"
                  />
                </div>
              </td>
              <tr>
                <td>
                  <div className="homeDelivery-price-container-div">
                    <div className="shipping-fee">總商品金額：</div>
                    <div className="shipping-fee">總運費金額：</div>
                    <div className="total-amount">總付款金額：</div>
                  </div>
                </td>
                <td className="price-container-td">
                  <div>${totalAmount()}</div>
                  <div className="shipping-fee">$60</div>
                  <div className="total-amount">${finalAmount(60)}</div>
                </td>
                <td>
                  <button onClick={handleModalOpen} className="use-coupon-btn">
                    <p>使用優惠券</p>
                  </button>
                  <div>
                    {/*動態彈出視窗*/}
                    {isModalOpen && (
                      <div className="coupon-modal-container">
                        <div className="coupon-modal-title">請選擇優惠券</div>
                        <table>
                          <tbody>
                            {availableCoupons.length > 0 ? (
                              availableCoupons.map((availableCoupons) => (
                                <tr key={availableCoupons._id}>
                                  <div>
                                    <td>
                                      <CouponImg
                                        discountAmount={availableCoupons.coupon.discountAmount}
                                        CouponId={availableCoupons.coupon._id}
                                        usageLimit={availableCoupons.usageLimit}
                                        usedTimes={availableCoupons.usedTimes}
                                      />
                                    </td>
                                  </div>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="3">沒有可顯示的優惠券</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                        <div className="coupon-modal-bottom">
                          <button onClick={handleCloseModal} className="coupon-modal-cancel">
                            取消
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            </tr>
          </tbody>
        </table>
      );
    } else if (DeliveryMethod === "homeDelivery") {
      return (
        <>
          <tr>
            <td>
              <div>
                <label className="deliverymethod-address-label" htmlFor="address">
                  寄送地址：
                </label>
                <input
                  onChange={handlesetAddressChange}
                  value={address}
                  className="deliverymethod-address-input"
                  id="address"
                  type="text"
                />
              </div>
            </td>
            <td>
              <div className="homeDelivery-price-container-div">
                <div className="shipping-fee">總商品金額：</div>
                <div className="shipping-fee">總運費金額：</div>
                <div className="total-amount">總付款金額：</div>
              </div>
            </td>
            <td className="price-container-td">
              <div>${totalAmount()}</div>
              <div className="shipping-fee">$100</div>
              <div className="total-amount">${finalAmount(100)}</div>
            </td>
          </tr>
        </>
      );
    } else {
      return <h1>請選擇寄送方式</h1>;
    }
  };

  return (
    <div className="cart-container">
      <div>
        <h1>購物明細</h1>
        <button onClick={handleback} className="cart-back">
          <p>返回</p>
        </button>
      </div>

      {/*購物明細*/}

      {isLoggedIn ? (
        cartItems.length > 0 ? (
          <div>
            {" "}
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
                        <p className="quantity-number">{item.quantity}</p>
                      </div>
                    </td>
                    <td>
                      <p>${item.price * item.quantity}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/*寄件資訊*/}
            <div className="checkout-container">
              <table className="checkout">
                <tbody>
                  <tr>
                    <td>收件人資訊</td>
                    <td>
                      <div>
                        <label className="checkout-recipient-label" htmlFor="name">
                          姓名：
                        </label>
                        <input
                          onChange={handleNameChange}
                          value={recipientName}
                          className="checkout-recipient-input"
                          id="name"
                          type="text"
                        />
                        <label className="checkout-recipient-label" htmlFor="tel">
                          電話：
                        </label>
                        <input
                          onChange={handleTelChange}
                          value={tel}
                          className="checkout-recipient-input"
                          id="tel"
                          type="text"
                        />
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>寄送方式</td>
                    <td>{renderContent()}</td>
                  </tr>

                  <tr>
                    <td></td>
                    <td>
                      <div className="confirm-order-container">
                        <button onClick={handleSubmit} className="confirm-order-btn">
                          <p>確認送出</p>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="cart-p">您的購物車是空的</p>
        )
      ) : (
        <p className="cart-p">
          請先<a href="/myapp/login">登入</a>以查看內容
        </p>
      )}
    </div>
  );
};

export default Checkout;
