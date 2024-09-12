import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Nav from "./components/Nav";
import HomePage from "./components/HomePage";
import Coupon from "./components/Coupon";
import { Background, Footer } from "./components/Background";
import { Register, Login } from "./components/SignInSignUp";
import { Cart, Checkout } from "./components/Cart";
import { EmailChange, PhoneChange } from "./components/Profile/Change";
import { PasswordChange, PasswordCheck } from "./components/Profile/PasswordChange";
import {
  Cookie,
  Crisps,
  Sodacracker,
  Sandwichcookie,
  Eggroll,
} from "./components/commodity/cookie";
import { Caramel, Candy, Chewinggum, Gummy, Throatlozenge } from "./components/commodity/Candy";
import {
  Driedfruits,
  Driedmango,
  Driedpineapple,
  Jujube,
  Raisin,
} from "./components/commodity/Driedfruits";
import { Almond, Cashew, Nut, Peanut, Pistachio } from "./components/commodity/Nut";
import { AddCoupon, AddProduct, AdminPage } from "./components/Profile/Admin";
import Profile from "./components/Profile/Profile";
import MyCoupons from "./components/Profile/MyCoupons";
import ProtectedRoute from "./components/Profile/PasswordChange/ProtectedRoute";
import { OrderUpdate, OrderDetail, ShoppingList } from "./components/Profile/Order";
import PlaceOrder from "./components/Cart/PlaceOrder";
function App() {
  const location = useLocation();
  const noNavRoutes = ["/register", "/login", "/Coupon", "/passwordcheck", "/placeorder"];
  const HomePageRoutes = ["/"];

  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  useEffect(() => {
    // 檢查 localStorage 是否有登入資訊
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    if (loggedInStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const routesConfig = [
    {
      path: "/cookie",
      element: <Cookie isLoggedIn={isLoggedIn} setQuantity={setQuantity} />,
    },
    {
      path: "/crisps",
      element: <Crisps isLoggedIn={isLoggedIn} setQuantity={setQuantity} />,
    },
    {
      path: "/eggroll",
      element: <Eggroll isLoggedIn={isLoggedIn} setQuantity={setQuantity} />,
    },
    {
      path: "/sandwichcookie",
      element: <Sandwichcookie isLoggedIn={isLoggedIn} setQuantity={setQuantity} />,
    },
    {
      path: "/sodacracker",
      element: <Sodacracker isLoggedIn={isLoggedIn} setQuantity={setQuantity} />,
    },

    {
      path: "/candy",
      element: <Candy isLoggedIn={isLoggedIn} setQuantity={setQuantity} />,
    },
    {
      path: "/caramel",
      element: <Caramel isLoggedIn={isLoggedIn} setQuantity={setQuantity} />,
    },
    {
      path: "/chewinggum",
      element: <Chewinggum isLoggedIn={isLoggedIn} setQuantity={setQuantity} />,
    },
    {
      path: "/gummy",
      element: <Gummy isLoggedIn={isLoggedIn} setQuantity={setQuantity} />,
    },
    {
      path: "/throatlozenge",
      element: <Throatlozenge isLoggedIn={isLoggedIn} setQuantity={setQuantity} />,
    },
    {
      path: "/driedfruits",
      element: <Driedfruits isLoggedIn={isLoggedIn} setQuantity={setQuantity} />,
    },
    {
      path: "/driedmango",
      element: <Driedmango isLoggedIn={isLoggedIn} setQuantity={setQuantity} />,
    },
    {
      path: "/driedpineapple",
      element: <Driedpineapple isLoggedIn={isLoggedIn} setQuantity={setQuantity} />,
    },
    {
      path: "/jujube",
      element: <Jujube isLoggedIn={isLoggedIn} setQuantity={setQuantity} />,
    },
    {
      path: "/raisin",
      element: <Raisin isLoggedIn={isLoggedIn} setQuantity={setQuantity} />,
    },
    {
      path: "/nut",
      element: <Nut isLoggedIn={isLoggedIn} setQuantity={setQuantity} />,
    },
    {
      path: "/almond",
      element: <Almond isLoggedIn={isLoggedIn} setQuantity={setQuantity} />,
    },
    {
      path: "/cashew",
      element: <Cashew isLoggedIn={isLoggedIn} setQuantity={setQuantity} />,
    },
    {
      path: "/peanut",
      element: <Peanut isLoggedIn={isLoggedIn} setQuantity={setQuantity} />,
    },
    {
      path: "/pistachio",
      element: <Pistachio isLoggedIn={isLoggedIn} setQuantity={setQuantity} />,
    },
    { path: "/coupon", element: <Coupon isLoggedIn={isLoggedIn} /> },
    { path: "/profile", element: <Profile isLoggedIn={isLoggedIn} /> },
    { path: "/adminpage", element: <AdminPage /> },
    { path: "/addcoupon", element: <AddCoupon /> },
    { path: "/addproduct", element: <AddProduct /> },
    { path: "/register", element: <Register /> },
    { path: "/login", element: <Login setIsLoggedIn={setIsLoggedIn} /> },
    { path: "/emailchange", element: <EmailChange /> },
    { path: "/phonechange", element: <PhoneChange /> },
    { path: "/shoppinglist", element: <ShoppingList /> },
    { path: "/orderupdate/:orderId", element: <OrderUpdate /> },
    { path: "/orderdetail/:orderId", element: <OrderDetail /> },

    { path: "/placeorder", element: <PlaceOrder /> },

    {
      path: "/passwordchange",
      element: <ProtectedRoute isAuthenticated={passwordSuccess} element={<PasswordChange />} />,
    },
    {
      path: "/passwordcheck",
      element: (
        <PasswordCheck passwordSuccess={passwordSuccess} setPasswordSuccess={setPasswordSuccess} />
      ),
    },
    { path: "/mycoupons", element: <MyCoupons /> },
    {
      path: "/cart",
      element: (
        <Cart
          isLoggedIn={isLoggedIn}
          quantity={quantity}
          setQuantity={setQuantity}
          cartItems={cartItems}
          setCartItems={setCartItems}
        />
      ),
    },
    {
      path: "/checkout",
      element: (
        <Checkout
          isLoggedIn={isLoggedIn}
          quantity={quantity}
          setQuantity={setQuantity}
          cartItems={cartItems}
          setCartItems={setCartItems}
        />
      ),
    },
  ];

  return (
    <div className="App">
      {!noNavRoutes.includes(location.pathname) && (
        <Nav setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
      )}
      {HomePageRoutes.includes(location.pathname) && <HomePage />}

      <Background />

      <Routes>
        {routesConfig.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
