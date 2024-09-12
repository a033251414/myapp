import React from "react";
import { useNavigate } from "react-router-dom";
const Caramel = ({ isLoggedIn, setQuantity }) => {
  const products = [
    {
      name: "牛奶糖袋裝",
      imgSrc: "/零食/糖果/牛奶糖/牛奶糖袋裝(90gx1入35$).png",
      price: 35,
    },
    {
      name: "旺仔牛奶糖牛奶口味",
      imgSrc: "/零食/糖果/牛奶糖/旺仔牛奶糖牛奶口味(100g36$).png",
      price: 36,
    },
    {
      name: "特濃牛奶糖",
      imgSrc: "/零食/糖果/牛奶糖/特濃牛奶糖(103g85$).png",
      price: 85,
    },
    {
      name: "特濃牛奶糖草莓味",
      imgSrc: "/零食/糖果/牛奶糖/特濃牛奶糖草莓味(58g62$).png",
      price: 62,
    },
    {
      name: "特濃牛奶糖鹽味",
      imgSrc: "/零食/糖果/牛奶糖/特濃牛奶糖鹽味(67g62$).png",
      price: 62,
    },
    {
      name: "鮮奶油糖",
      imgSrc: "/零食/糖果/牛奶糖/鮮奶油糖(90g67$).png",
      price: 67,
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

export default Caramel;
