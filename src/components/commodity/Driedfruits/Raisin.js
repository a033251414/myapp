import React from "react";
import { useNavigate } from "react-router-dom";
const Raisin = ({ isLoggedIn, setCartQuantity }) => {
  const products = [
    {
      name: "三葉葡萄乾",
      imgSrc: "/myapp/零食/果乾/葡萄乾/三葉葡萄乾(250公克75$).png",
      price: 75,
    },
    {
      name: "智利特大葡萄乾",
      imgSrc: "/myapp/零食/果乾/葡萄乾/智利特大葡萄乾(180g包75$).png",
      price: 75,
    },
    {
      name: "超大有籽葡萄乾",
      imgSrc: "/myapp/零食/果乾/葡萄乾/超大有籽葡萄乾(300g88$).png",
      price: 88,
    },
    {
      name: "葡萄乾",
      imgSrc: "/myapp/零食/果乾/葡萄乾/葡萄乾(250gx1包85$0.png",
      price: 85,
    },
    {
      name: "葡萄乾隨手包x1袋",
      imgSrc: "/myapp/零食/果乾/葡萄乾/葡萄乾隨手包x1袋(25gx10包袋27$).png",
      price: 27,
    },
    {
      name: "綜合葡萄乾",
      imgSrc: "/myapp/零食/果乾/葡萄乾/綜合葡萄乾(250G葡萄乾112$).png",
      price: 112,
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

export default Raisin;
