import React from "react";
import { useNavigate } from "react-router-dom";
const Gummy = ({ isLoggedIn, setCartQuantity }) => {
  const products = [
    {
      name: "比菲多軟糖葡萄",
      imgSrc: "/myapp/零食/糖果/軟糖/比菲多軟糖葡萄(75g53$).png",
      price: 53,
    },
    {
      name: "原始風味益生菌軟糖",
      imgSrc: "/myapp/零食/糖果/軟糖/原始風味益生菌軟糖(90g53$).png",
      price: 53,
    },
    {
      name: "偉特軟糖",
      imgSrc: "/myapp/零食/糖果/軟糖/偉特軟糖(80g67$).png",
      price: 67,
    },
    {
      name: "夢之梅糖",
      imgSrc: "/myapp/零食/糖果/軟糖/夢之梅糖(100g42$).png",
      price: 42,
    },
    {
      name: "酷露露Q糖-白葡萄味",
      imgSrc: "/myapp/零食/糖果/軟糖/酷露露Q糖-白葡萄味(48g55$).png",
      price: 55,
    },
    {
      name: "酸Q熊軟糖",
      imgSrc: "/myapp/零食/糖果/軟糖/酸Q熊軟糖(220g215$).png",
      price: 215,
    },
    {
      name: "寶吉果汁QQ糖葡萄",
      imgSrc: "/myapp/零食/糖果/軟糖/寶吉果汁QQ糖葡萄(176g包83$).png",
      price: 83,
    },
    {
      name: "QQ熱帶水果軟糖",
      imgSrc: "/myapp/零食/糖果/軟糖/QQ熱帶水果軟糖(340g袋125$).png",
      price: 125,
    },
  ];
  const navigate = useNavigate();

  const addToCart = (product) => {
    if (isLoggedIn) {
      const username = localStorage.getItem("username");
      const cartKey = `cartItems_${username}`;
      let existingCart = [];

      /*增加購物車圖示數量*/

      const CartQuantityKey = `CartQuantity_${username}`;
      let cartQuantity = localStorage.getItem(CartQuantityKey);
      cartQuantity = cartQuantity ? parseInt(cartQuantity, 10) : 0;
      const newQuantity = cartQuantity + 1;
      localStorage.setItem(CartQuantityKey, newQuantity);
      setCartQuantity(newQuantity);

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
      alert("加入購物車成功");
      // 儲存更新後的購物車
      localStorage.setItem(cartKey, JSON.stringify(existingCart));
    } else {
      alert("請先登入帳號");
      navigate("/myapp/login");
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

export default Gummy;
