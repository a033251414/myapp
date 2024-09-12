import React from "react";
import { useNavigate } from "react-router-dom";
const Chewinggum = ({ isLoggedIn, setQuantity }) => {
  const products = [
    {
      name: "飛壘無糖口香糖",
      imgSrc: "/零食/糖果/口香糖/飛壘無糖口香糖60.9gx1入(葡萄口味35$).png",
      price: 35,
    },
    {
      name: "野崎製果超長口香糖",
      imgSrc: "/零食/糖果/口香糖/野崎製果超長口香糖(55g45$).png",
      price: 45,
    },
    {
      name: "葡萄風味口香糖",
      imgSrc: "/零食/糖果/口香糖/葡萄風味口香糖(47g49$).png",
      price: 49,
    },
    {
      name: "潔淨無糖口香糖",
      imgSrc: "/零食/糖果/口香糖/潔淨無糖口香糖(28g5入139$).png",
      price: 139,
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

export default Chewinggum;