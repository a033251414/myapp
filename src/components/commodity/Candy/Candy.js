import React from "react";
import { useNavigate } from "react-router-dom";
const Candy = ({ isLoggedIn, setQuantity }) => {
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
    {
      name: "比菲多軟糖葡萄",
      imgSrc: "/零食/糖果/軟糖/比菲多軟糖葡萄(75g53$).png",
      price: 53,
    },
    {
      name: "原始風味益生菌軟糖",
      imgSrc: "/零食/糖果/軟糖/原始風味益生菌軟糖(90g53$).png",
      price: 53,
    },
    {
      name: "偉特軟糖",
      imgSrc: "/零食/糖果/軟糖/偉特軟糖(80g67$).png",
      price: 67,
    },
    {
      name: "夢之梅糖",
      imgSrc: "/零食/糖果/軟糖/夢之梅糖(100g42$).png",
      price: 42,
    },
    {
      name: "酷露露Q糖-白葡萄味",
      imgSrc: "/零食/糖果/軟糖/酷露露Q糖-白葡萄味(48g55$).png",
      price: 55,
    },
    {
      name: "酸Q熊軟糖",
      imgSrc: "/零食/糖果/軟糖/酸Q熊軟糖(220g215$).png",
      price: 215,
    },
    {
      name: "寶吉果汁QQ糖葡萄",
      imgSrc: "/零食/糖果/軟糖/寶吉果汁QQ糖葡萄(176g包83$).png",
      price: 83,
    },
    {
      name: "QQ熱帶水果軟糖",
      imgSrc: "/零食/糖果/軟糖/QQ熱帶水果軟糖(340g袋125$).png",
      price: 125,
    },
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

export default Candy;
