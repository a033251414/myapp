import React, { useState, useEffect } from "react";
import "../App.css";
import { useNavigate, Link } from "react-router-dom";

const Nav = ({ setIsLoggedIn, isLoggedIn }) => {
  const [isFixed, setIsFixed] = useState(false);
  const [useremail, setEmail] = useState(null);
  const navigate = useNavigate();
  const scrollThreshold = 110;

  useEffect(() => {
    // 檢查本地存儲中的 token
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setEmail(decodedToken.email);
    }
  }, [setIsLoggedIn]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      // 當滾動超過閾值時，選單固定在頁面頂部
      if (scrollTop > scrollThreshold) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // 清理事件監聽器
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // 空依賴數組確保只在組件掛載和卸載時運行

  const handleRegister = () => {
    navigate("/register");
  };
  const handleLogin = () => {
    navigate("/login");
  };
  const handleCart = () => {
    navigate("/Cart");
  };
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");

    setIsLoggedIn(false);
    setEmail("");
    navigate("/");
  };
  return (
    <div>
      <nav className="navbar">
        <div className="left">
          <Link to="/">
            <img className="icon" src="/icon/icon.png" alt="Icon" />
          </Link>
        </div>

        <div className="center">
          <input className="Search-input" type="text" placeholder="搜尋"></input>
          <button className="search-button">搜尋</button>

          <ul className={`drop-down-menu ${isFixed ? "fixed" : "absolute"}`}>
            <li>
              <Link className="border-line" to="/">
                首頁
              </Link>
            </li>
            <li>
              <Link className="border-line" to="/cookie">
                餅乾
              </Link>
              <ul className="border-bottom-line">
                <li>
                  <Link className="border-bottom-line" to="crisps">
                    洋芋片
                  </Link>
                </li>
                <li>
                  <Link className="border-bottom-line" to="/sodacracker">
                    蘇打餅
                  </Link>
                </li>
                <li>
                  <Link className="border-bottom-line" to="/sandwichcookie">
                    夾心餅
                  </Link>
                </li>
                <li>
                  <Link to="/eggroll">蛋捲</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link className="border-line" to="/candy">
                糖果
              </Link>
              <ul className="border-bottom-line">
                <li>
                  <Link className="border-bottom-line" to="/chewinggum">
                    口香糖
                  </Link>
                </li>
                <li>
                  <Link className="border-bottom-line" to="/caramel">
                    牛奶糖
                  </Link>
                </li>
                <li>
                  <Link className="border-bottom-line" to="throatlozenge">
                    喉糖
                  </Link>
                </li>
                <li>
                  <Link to="gummy">軟糖</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link className="border-line" to="/driedfruits">
                果乾
              </Link>
              <ul className="border-bottom-line">
                <li>
                  <Link className="border-bottom-line" to="/driedpineapple">
                    鳳梨乾
                  </Link>
                </li>
                <li>
                  <Link className="border-bottom-line" to="raisin">
                    葡萄乾
                  </Link>
                </li>
                <li>
                  <Link className="border-bottom-line" to="/driedmango">
                    芒果乾
                  </Link>
                </li>
                <li>
                  <Link to="Jujube">棗類</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link className="border-line" to="/Nut">
                堅果
              </Link>
              <ul>
                <li>
                  <Link className="border-bottom-line" to="/Almond">
                    杏仁果
                  </Link>
                </li>
                <li>
                  <Link className="border-bottom-line" to="/Cashew">
                    腰果
                  </Link>
                </li>
                <li>
                  <Link className="border-bottom-line" to="/Peanut">
                    花生
                  </Link>
                </li>
                <li>
                  <Link to="/Pistachio">開心果</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="right">
          <Link to="/Profile" className="useremail">
            {useremail}
          </Link>

          <ul className="action-links">
            {isLoggedIn ? (
              <>
                <li>
                  <button onClick={handleLogout} className="nav-buttons">
                    登出
                  </button>
                </li>
                <li>
                  <img
                    className="nav-cart"
                    src="./Cart.png"
                    onClick={handleCart}
                    alt="購物車"
                    role="button"
                  />
                </li>
              </>
            ) : (
              <>
                <li>
                  <button onClick={handleRegister} className="nav-buttons">
                    註冊
                  </button>
                </li>
                <li>
                  <button onClick={handleLogin} className="nav-buttons">
                    登入
                  </button>
                </li>
                <li>
                  <img
                    className="nav-cart"
                    src="./Cart.png"
                    onClick={handleCart}
                    alt="購物車"
                    role="button"
                  />
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
