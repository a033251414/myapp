import React from "react";
import { useNavigate } from "react-router-dom";
const Nut = ({ isLoggedIn, setQuantity }) => {
  const products = [
    {
      name: "低溫烘焙原味杏仁",
      imgSrc: "/零食/堅果/杏仁果/低溫烘焙原味杏仁(300g罐350$).png",
      price: 350,
    },
    {
      name: "杏仁小魚",
      imgSrc: "/零食/堅果/杏仁果/杏仁小魚(115g包111$).png",
      price: 111,
    },
    {
      name: "杏仁果",
      imgSrc: "/零食/堅果/杏仁果/杏仁果(142g包111$).png",
      price: 111,
    },
    {
      name: "海苔杏仁小魚",
      imgSrc: "/零食/堅果/杏仁果/海苔杏仁小魚(115g包111$).png",
      price: 111,
    },
    {
      name: "無調味烘焙杏仁果",
      imgSrc: "/零食/堅果/杏仁果/無調味烘焙杏仁果(160g包134$).png",
      price: 134,
    },
    {
      name: "可可腰果",
      imgSrc: "/零食/堅果/腰果/可可腰果(60g包108$).png",
      price: 108,
    },
    {
      name: "無調味烘焙腰果",
      imgSrc: "/零食/堅果/腰果/無調味烘焙腰果(160g包134$).png",
      price: 134,
    },
    {
      name: "越南鹽酥帶皮腰果",
      imgSrc: "/零食/堅果/腰果/越南頂級鹽酥帶皮腰果(480g271$).png",
      price: 271,
    },
    {
      name: "風堂腰果",
      imgSrc: "/零食/堅果/腰果/楓糖腰果(140g包111$).png",
      price: 111,
    },
    {
      name: "蜜汁腰果",
      imgSrc: "/零食/堅果/腰果/蜜汁腰果(140g包111$).png",
      price: 111,
    },
    {
      name: "大哥椰漿味花生豆",
      imgSrc: "/零食/堅果/花生/大哥椰漿味花生豆(90g55$).png",
      price: 55,
    },
    {
      name: "小魚干脆花生",
      imgSrc: "/零食/堅果/花生/小魚干脆花生(84g67$).png",
      price: 67,
    },

    {
      name: "黑金剛花生",
      imgSrc: "/零食/堅果/花生/黑金剛花生(500gX1包211$).png",
      price: 211,
    },

    {
      name: "蒜味花生",
      imgSrc: "/零食/堅果/花生/蒜味花生(130g5$).png",
      price: 130,
    },
    {
      name: "辣味柿米果小魚干花生",
      imgSrc: "/零食/堅果/花生/辣味柿米果小魚干花生(80g包87$).png",
      price: 87,
    },
    {
      name: "原味珍珠開心果",
      imgSrc: "/零食/堅果/開心果/原味珍珠開心果(300g罐272$).png",
      price: 55,
    },
    {
      name: "無調味珍珠開心果",
      imgSrc: "/零食/堅果/開心果/無調味珍珠開心果(160g包134$).png",
      price: 67,
    },
    {
      name: "開心果",
      imgSrc: "/零食/堅果/開心果/開心果450G包裝450$.png",
      price: 90,
    },
    {
      name: "源豐瓜子行方開心果",
      imgSrc: "/零食/堅果/開心果/源豐瓜子行方開心果600g327$.png",
      price: 96,
    },
    {
      name: "經典原味開心果",
      imgSrc: "/零食/堅果/開心果/經典原味無調味無添加(210g229$).png",
      price: 211,
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

export default Nut;
