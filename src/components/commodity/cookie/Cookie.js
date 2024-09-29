import React from "react";
import { useNavigate } from "react-router-dom";
const Cookie = ({ isLoggedIn, setCartQuantity }) => {
  const products = [
    {
      name: "多力多滋醬烤豬五花",
      imgSrc: "/myapp/零食/餅乾/洋芋片/多力多滋醬烤豬五花.png",
      price: 35,
    },
    {
      name: "多力多滋爆蒜鮮蝦口味",
      imgSrc: "/myapp/零食/餅乾/洋芋片/多力多滋爆蒜鮮蝦口味.png",
      price: 35,
    },
    {
      name: "奇多奶油玉米風味玉米棒",
      imgSrc: "/myapp/零食/餅乾/洋芋片/奇多北海道奶油玉米風味玉米棒.png",
      price: 35,
    },
    {
      name: "厚切洋芋片-香蔥",
      imgSrc: "/myapp/零食/餅乾/洋芋片/美國Ruffles波樂 厚切洋芋片-香蔥.png",
      price: 35,
    },
    {
      name: "樂事九州岩燒海苔",
      imgSrc: "/myapp/零食/餅乾/洋芋片/樂事九州岩燒海苔.png",
      price: 35,
    },
    {
      name: "芝麻蛋捲",
      imgSrc: "/myapp/零食/餅乾/蛋捲/芝麻蛋捲(180公克96$).png",
      price: 96,
    },
    {
      name: "原味蛋捲經濟包",
      imgSrc: "/myapp/零食/餅乾/蛋捲/原味蛋捲經濟包(192g109$).png",
      price: 109,
    },
    {
      name: "無糖肉鬆蛋捲",
      imgSrc: "/myapp/零食/餅乾/蛋捲/無糖肉鬆蛋捲(68g115$).png",
      price: 115,
    },
    {
      name: "精緻肉鬆蛋捲",
      imgSrc: "/myapp/零食/餅乾/蛋捲/精緻肉鬆蛋捲(68g盒115$).png",
      price: 115,
    },
    {
      name: "爆餡花生醬脆卷",
      imgSrc: "/myapp/零食/餅乾/蛋捲/爆餡花生醬脆卷(120g145$).png",
      price: 145,
    },
    {
      name: "芝麻蛋捲",
      imgSrc: "/myapp/零食/餅乾/夾心餅/巧心蘇打原味牛軋餅乾(145g77$).png",
      price: 77,
    },
    {
      name: "原味蛋捲經濟包",
      imgSrc: "/myapp/零食/餅乾/夾心餅/夾心酥經濟包巧克力(400公克96$).png",
      price: 96,
    },
    {
      name: "無糖肉鬆蛋捲",
      imgSrc: "/myapp/零食/餅乾/夾心餅/香濃花生夾心酥經濟包(400g96$).png",
      price: 96,
    },
    {
      name: "精緻肉鬆蛋捲",
      imgSrc: "/myapp/零食/餅乾/夾心餅/義美夾心酥 咖啡 (400g96$).png",
      price: 96,
    },
    {
      name: "爆餡花生醬脆卷",
      imgSrc: "/myapp/零食/餅乾/夾心餅/義美香醇牛奶夾心酥(400g101$).png",
      price: 101,
    },
    {
      name: "爆餡花生醬脆卷",
      imgSrc: "/myapp/零食/餅乾/夾心餅/義美清香檸檬夾心酥(400g96$0.png",
      price: 96,
    },
    {
      name: "天然取向紫菜蘇打餅",
      imgSrc: "/myapp/零食/餅乾/蘇打餅/天然取向紫菜蘇打餅(300公克72$).png",
      price: 72,
    },
    {
      name: "天然取向鮮蔥蘇打餅",
      imgSrc: "/myapp/零食/餅乾/蘇打餅/天然取向鮮蔥蘇打餅(330公克72$).png",
      price: 72,
    },
    {
      name: "多穀物黃金胚芽蘇打餅",
      imgSrc: "/myapp/零食/餅乾/蘇打餅/多穀物黃金胚芽蘇打餅(180g盒50$).png",
      price: 50,
    },
    {
      name: "海太營養餅",
      imgSrc: "/myapp/零食/餅乾/蘇打餅/海太營養餅(197g63$).png",
      price: 63,
    },
    {
      name: "湘辣蘇打餅",
      imgSrc: "/myapp/零食/餅乾/蘇打餅/湘辣蘇打餅(306g149$).png",
      price: 149,
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

      /*取得購物車資料*/
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
  );
};

export default Cookie;
