import React, { useState, useEffect } from "react";
import "../App.css";
import { useNavigate, Link } from "react-router-dom";

const Nav = ({ setIsLoggedIn, isLoggedIn, cartQuantity, setCartQuantity }) => {
  const [useremail, setEmail] = useState(null);
  const [isVisibleMenu, setIsVisibleMenu] = useState(false);
  const navigate = useNavigate();

  /*抓取購物車數量顯示*/
  useEffect(() => {
    const username = localStorage.getItem("username");
    const CartQuantity = `CartQuantity_${username}`;
    setCartQuantity(localStorage.getItem(CartQuantity));
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setEmail(decodedToken.email);
    }
  }, [setIsLoggedIn]);

  const handleRegister = () => {
    navigate("/myapp/register");
  };
  const handleLogin = () => {
    navigate("/myapp/login");
  };
  const handleCart = () => {
    navigate("/myapp/cart");
  };
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");

    setIsLoggedIn(false);
    setEmail("");
    navigate("/myapp");
  };

  const handleVisbleMenu = () => {
    setIsVisibleMenu(!isVisibleMenu);
  };

  const handleClick = () => {
    setIsVisibleMenu(!isVisibleMenu);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="left">
          <Link to="/myapp">
            <img className="icon" src="/myapp/icon/icon.png" alt="Icon" />
          </Link>
        </div>

        <div className="center">
          <div className="drop-down-menu-container">
            <ul className="drop-down-menu">
              <li>
                <Link className="border-line" to="/myapp">
                  首頁
                </Link>
              </li>
              <li>
                <Link className="border-line" to="/myapp/cookie">
                  餅乾
                </Link>
                <ul className="sub-menu">
                  <li>
                    <Link className="border-bottom-line" to="/myapp/crisps">
                      洋芋片
                    </Link>
                  </li>
                  <li>
                    <Link className="border-bottom-line" to="/myapp/sodacracker">
                      蘇打餅
                    </Link>
                  </li>
                  <li>
                    <Link className="border-bottom-line" to="/myapp/sandwichcookie">
                      夾心餅
                    </Link>
                  </li>
                  <li>
                    <Link to="/myapp/eggroll">蛋捲</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link className="border-line" to="/myapp/candy">
                  糖果
                </Link>
                <ul className="sub-menu">
                  <li>
                    <Link className="border-bottom-line" to="/myapp/chewinggum">
                      口香糖
                    </Link>
                  </li>
                  <li>
                    <Link className="border-bottom-line" to="/myapp/caramel">
                      牛奶糖
                    </Link>
                  </li>
                  <li>
                    <Link className="border-bottom-line" to="/myapp/throatlozenge">
                      喉糖
                    </Link>
                  </li>
                  <li>
                    <Link to="/myapp/gummy">軟糖</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link className="border-line" to="/myapp/driedfruits">
                  果乾
                </Link>
                <ul className="sub-menu">
                  <li>
                    <Link className="border-bottom-line" to="/myapp/driedpineapple">
                      鳳梨乾
                    </Link>
                  </li>
                  <li>
                    <Link className="border-bottom-line" to="/myapp/raisin">
                      葡萄乾
                    </Link>
                  </li>
                  <li>
                    <Link className="border-bottom-line" to="/myapp/driedmango">
                      芒果乾
                    </Link>
                  </li>
                  <li>
                    <Link to="/myapp/jujube">棗類</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link className="border-line" to="/myapp/nut">
                  堅果
                </Link>
                <ul className="sub-menu">
                  <li>
                    <Link className="border-bottom-line" to="/myapp/almond">
                      杏仁果
                    </Link>
                  </li>
                  <li>
                    <Link className="border-bottom-line" to="/myapp/cashew">
                      腰果
                    </Link>
                  </li>
                  <li>
                    <Link className="border-bottom-line" to="/myapp/peanut">
                      花生
                    </Link>
                  </li>
                  <li>
                    <Link to="/myapp/pistachio">開心果</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div className="phone-drop-down-menu">
          <button onClick={handleVisbleMenu} className="menu-btn">
            <img className="phone-menu-icon" src="/myapp/MenuIcon.png"></img>
          </button>
          <nav className={`phone-menu-container ${isVisibleMenu ? "active" : ""}`}>
            <div>
              <ul className="phone-menu">
                <li className="phone-itembox">
                  <Link onClick={handleClick} className="phone-item" to="/myapp">
                    <h1>首頁</h1>
                  </Link>
                </li>
                <li className="phone-itembox phone-drop-down">
                  <Link className="phone-item">
                    <h1>餅乾</h1>
                  </Link>
                  <div className="phone-submenu">
                    <Link onClick={handleClick} className="phone-submenu-item" to="/myapp/crisps">
                      洋芋片
                    </Link>
                    <Link
                      onClick={handleClick}
                      className="phone-submenu-item"
                      to="/myapp/sodacracker"
                    >
                      蘇打餅
                    </Link>
                    <Link
                      onClick={handleClick}
                      className="phone-submenu-item"
                      to="/myapp/sandwichcookie"
                    >
                      夾心餅
                    </Link>
                    <Link onClick={handleClick} className="phone-submenu-item" to="/myapp/eggroll">
                      蛋捲
                    </Link>
                  </div>
                </li>
                <li className="phone-itembox phone-drop-down">
                  <Link className="phone-item">
                    <h1>糖果</h1>
                  </Link>
                  <div className="phone-submenu">
                    <Link
                      onClick={handleClick}
                      className="phone-submenu-item"
                      to="/myapp/chewinggum"
                    >
                      口香糖
                    </Link>
                    <Link onClick={handleClick} className="phone-submenu-item" to="/myapp/caramel">
                      牛奶糖
                    </Link>
                    <Link
                      onClick={handleClick}
                      className="phone-submenu-item"
                      to="/myapp/throatlozenge"
                    >
                      喉糖
                    </Link>
                    <Link onClick={handleClick} className="phone-submenu-item" to="/myapp/gummy">
                      軟糖
                    </Link>
                  </div>
                </li>
                <li className="phone-itembox phone-drop-down">
                  <Link className="phone-item">
                    <h1>果乾</h1>
                  </Link>
                  <div className="phone-submenu">
                    <Link
                      onClick={handleClick}
                      className="phone-submenu-item"
                      to="/myapp/driedpineapple"
                    >
                      鳳梨乾
                    </Link>
                    <Link onClick={handleClick} className="phone-submenu-item" to="/myapp/jujube">
                      葡萄乾
                    </Link>
                    <Link
                      onClick={handleClick}
                      className="phone-submenu-item"
                      to="/myapp/driedmango"
                    >
                      芒果乾
                    </Link>
                    <Link onClick={handleClick} className="phone-submenu-item" to="/myapp/raisin">
                      棗類
                    </Link>
                  </div>
                </li>
                <li className="phone-itembox phone-drop-down">
                  <Link className="phone-item">
                    <h1>堅果</h1>
                  </Link>
                  <div className="phone-submenu">
                    <Link onClick={handleClick} className="phone-submenu-item" to="/myapp/almond">
                      杏仁果
                    </Link>
                    <Link onClick={handleClick} className="phone-submenu-item" to="/myapp/cashew">
                      腰果
                    </Link>
                    <Link onClick={handleClick} className="phone-submenu-item" to="/myapp/peanut">
                      花生
                    </Link>
                    <Link
                      onClick={handleClick}
                      className="phone-submenu-item"
                      to="/myapp/pistachio"
                    >
                      開心果
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="nav-right">
          <table className="nav-table">
            {isLoggedIn ? (
              <tbody>
                <tr>
                  <td className="nav-td">
                    <button onClick={() => navigate("/myapp/profile")} className="nav-to-profile">
                      個人資料
                    </button>
                  </td>
                  <td className="nav-td nav-actions">
                    <button onClick={handleLogout} className="nav-buttons">
                      登出
                    </button>
                    <div>
                      <img
                        className="nav-cart-icon"
                        src="/myapp/icon/Cart.png"
                        onClick={handleCart}
                        alt="購物車"
                        role="button"
                      />
                      <div className="cart-number">{cartQuantity}</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td className="nav-td">
                    <button onClick={handleRegister} className="nav-register-buttons">
                      註冊
                    </button>
                  </td>
                  <td className="nav-td">
                    <button onClick={handleLogin} className="nav-buttons">
                      登入
                    </button>
                  </td>
                  <td className="nav-td">
                    <div className="nav-cart-container">
                      <img
                        className="nav-cart-icon"
                        src="/myapp/icon/Cart.png"
                        onClick={handleCart}
                        alt="購物車"
                        role="button"
                      />
                      <div className="cart-number">{cartQuantity}</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
