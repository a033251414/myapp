import React from "react";
import { useNavigate } from "react-router-dom";
const Sandwichcookie = ({ isLoggedIn, setQuantity }) => {
  const products = [
    {
      name: "芝麻蛋捲",
      imgSrc: "/零食/餅乾/夾心餅/巧心蘇打原味牛軋餅乾(145g77$).png",
      price: 77,
    },
    {
      name: "原味蛋捲經濟包",
      imgSrc: "/零食/餅乾/夾心餅/夾心酥經濟包巧克力(400公克96$).png",
      price: 96,
    },
    {
      name: "無糖肉鬆蛋捲",
      imgSrc: "/零食/餅乾/夾心餅/香濃花生夾心酥經濟包(400g96$).png",
      price: 96,
    },
    {
      name: "精緻肉鬆蛋捲",
      imgSrc: "/零食/餅乾/夾心餅/義美夾心酥 咖啡 (400g96$).png",
      price: 96,
    },
    {
      name: "爆餡花生醬脆卷",
      imgSrc: "/零食/餅乾/夾心餅/義美香醇牛奶夾心酥(400g101$).png",
      price: 101,
    },
    {
      name: "爆餡花生醬脆卷",
      imgSrc: "/零食/餅乾/夾心餅/義美清香檸檬夾心酥(400g96$0.png",
      price: 96,
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

export default Sandwichcookie;
