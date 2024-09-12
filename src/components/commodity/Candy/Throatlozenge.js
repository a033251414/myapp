import React from "react";
import { useNavigate } from "react-router-dom";
const Throatlozenge = ({ isLoggedIn, setQuantity }) => {
  const products = [
    {
      name: "八仙果",
      imgSrc: "/零食/糖果/喉糖/八仙果(20g29$).png",
      price: 29,
    },
    {
      name: "甘蔘八仙果喉糖涼糖",
      imgSrc: "/零食/糖果/喉糖/珍茶柚130g65$(甘蔘八仙果喉糖涼糖).png",
      price: 65,
    },
    {
      name: "梨膏糖-枇杷口味",
      imgSrc: "/零食/糖果/喉糖/梨膏糖-枇杷口味(100g105$).png",
      price: 105,
    },
    {
      name: "舒必克冰涼喉片",
      imgSrc: "/零食/糖果/喉糖/舒必克冰涼喉片30顆盒95$.png",
      price: 95,
    },
    {
      name: "舒暢潤喉珠",
      imgSrc: "/零食/糖果/喉糖/舒暢潤喉珠(60粒罐70$).png",
      price: 70,
    },
    {
      name: "薄荷岩鹽檸檬糖",
      imgSrc: "/零食/糖果/喉糖/薄荷岩鹽檸檬糖(138g65$).png",
      price: 65,
    },
  ];
  const navigate = useNavigate();

  const addToCart = (product) => {
    if (isLoggedIn) {
      setQuantity((prevQuantity) => prevQuantity + 1);

      const username = localStorage.getItem("username");
      const cartKey = `cartItems_${username}`;

      let existingCart = [];

      try {
        const storedCartItems = localStorage.getItem(cartKey);
        existingCart = storedCartItems ? JSON.parse(storedCartItems) : [];
      } catch (error) {
        console.error("解析 JSON 時發生錯誤:", error);
        existingCart = [];
      }

      const productIndex = existingCart.findIndex((item) => item.name === product.name);

      if (productIndex !== -1) {
        // 如果商品已存在，增加數量
        existingCart[productIndex].quantity += 1;
      } else {
        // 如果商品不存在，添加商品並設置數量為 1
        existingCart.push({ ...product, quantity: 1 });
      }
      // 儲存更新後的購物車
      localStorage.setItem(cartKey, JSON.stringify(existingCart));

      // existingCart.push(product);
    } else {
      alert("請先登入帳號");
      navigate("/Login");
    }
  };

  return (
    <div>
      <div className="product-grid-container">
        <div className="product-grid">
          {products.map((product, index) => (
            <div className="product-item" key={index}>
              <img className="product-img" src={product.imgSrc} alt={product.name} />

              <div className="product-border-container">
                <p className="product-name">{product.name}</p>
              </div>

              <div className="product-border-container">
                <button className="add-button" onClick={() => addToCart(product)}>
                  加入購物車
                </button>
                <p className="product-price">價格</p>
                <p className="money-red product-price">{product.price}元</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Throatlozenge;
