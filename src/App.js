import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Nav from "./components/Nav";
import HomePage from "./components/HomePage";
import Coupon from "./components/Coupon";
import { Background } from "./components/Background";
import { Register, Login } from "./components/SignInSignUp";
import { Cart, Checkout } from "./components/Cart";
import { PhoneChange } from "./components/Profile/Change";
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
import { AddCoupon, AddProduct } from "./components/Profile/Admin";
import Profile from "./components/Profile/Profile";
import MyCoupons from "./components/Profile/MyCoupons";
import ProtectedRoute from "./components/Profile/PasswordChange/ProtectedRoute";
import { OrderUpdate, OrderDetail, ShoppingList } from "./components/Profile/Order";
import PlaceOrder from "./components/Cart/PlaceOrder";
function App() {
  const location = useLocation();
  const noNavRoutes = [
    "/myapp/register",
    "/myapp/login",
    "/myapp/Coupon",
    "/myapp/passwordcheck",
    "/myapp/placeorder",
  ];
  const HomePageRoutes = ["/myapp"];

  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    // 檢查 localStorage 是否有登入資訊
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    if (loggedInStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const routesConfig = [
    {
      path: "/myapp/cookie",
      element: <Cookie isLoggedIn={isLoggedIn} setCartQuantity={setCartQuantity} />,
    },
    {
      path: "/myapp/crisps",
      element: (
        <Crisps
          isLoggedIn={isLoggedIn}
          setQuantity={setQuantity}
          setCartQuantity={setCartQuantity}
        />
      ),
    },
    {
      path: "/myapp/eggroll",
      element: (
        <Eggroll
          isLoggedIn={isLoggedIn}
          setQuantity={setQuantity}
          setCartQuantity={setCartQuantity}
        />
      ),
    },
    {
      path: "/myapp/sandwichcookie",
      element: (
        <Sandwichcookie
          isLoggedIn={isLoggedIn}
          setQuantity={setQuantity}
          setCartQuantity={setCartQuantity}
        />
      ),
    },
    {
      path: "/myapp/sodacracker",
      element: (
        <Sodacracker
          isLoggedIn={isLoggedIn}
          setQuantity={setQuantity}
          setCartQuantity={setCartQuantity}
        />
      ),
    },

    {
      path: "/myapp/candy",
      element: (
        <Candy
          isLoggedIn={isLoggedIn}
          setQuantity={setQuantity}
          setCartQuantity={setCartQuantity}
        />
      ),
    },
    {
      path: "/myapp/caramel",
      element: (
        <Caramel
          isLoggedIn={isLoggedIn}
          setQuantity={setQuantity}
          setCartQuantity={setCartQuantity}
        />
      ),
    },
    {
      path: "/myapp/chewinggum",
      element: (
        <Chewinggum
          isLoggedIn={isLoggedIn}
          setQuantity={setQuantity}
          setCartQuantity={setCartQuantity}
        />
      ),
    },
    {
      path: "/myapp/gummy",
      element: (
        <Gummy
          isLoggedIn={isLoggedIn}
          setQuantity={setQuantity}
          setCartQuantity={setCartQuantity}
        />
      ),
    },
    {
      path: "/myapp/throatlozenge",
      element: (
        <Throatlozenge
          isLoggedIn={isLoggedIn}
          setQuantity={setQuantity}
          setCartQuantity={setCartQuantity}
        />
      ),
    },
    {
      path: "/myapp/driedfruits",
      element: (
        <Driedfruits
          isLoggedIn={isLoggedIn}
          setQuantity={setQuantity}
          setCartQuantity={setCartQuantity}
        />
      ),
    },
    {
      path: "/myapp/driedmango",
      element: (
        <Driedmango
          isLoggedIn={isLoggedIn}
          setQuantity={setQuantity}
          setCartQuantity={setCartQuantity}
        />
      ),
    },
    {
      path: "/myapp/driedpineapple",
      element: (
        <Driedpineapple
          isLoggedIn={isLoggedIn}
          setQuantity={setQuantity}
          setCartQuantity={setCartQuantity}
        />
      ),
    },
    {
      path: "/myapp/jujube",
      element: (
        <Jujube
          isLoggedIn={isLoggedIn}
          setQuantity={setQuantity}
          setCartQuantity={setCartQuantity}
        />
      ),
    },
    {
      path: "/myapp/raisin",
      element: (
        <Raisin
          isLoggedIn={isLoggedIn}
          setQuantity={setQuantity}
          setCartQuantity={setCartQuantity}
        />
      ),
    },
    {
      path: "/myapp/nut",
      element: (
        <Nut isLoggedIn={isLoggedIn} setQuantity={setQuantity} setCartQuantity={setCartQuantity} />
      ),
    },
    {
      path: "/myapp/almond",
      element: (
        <Almond
          isLoggedIn={isLoggedIn}
          setQuantity={setQuantity}
          setCartQuantity={setCartQuantity}
        />
      ),
    },
    {
      path: "/myapp/cashew",
      element: (
        <Cashew
          isLoggedIn={isLoggedIn}
          setQuantity={setQuantity}
          setCartQuantity={setCartQuantity}
        />
      ),
    },
    {
      path: "/myapp/peanut",
      element: (
        <Peanut
          isLoggedIn={isLoggedIn}
          setQuantity={setQuantity}
          setCartQuantity={setCartQuantity}
        />
      ),
    },
    {
      path: "/myapp/pistachio",
      element: (
        <Pistachio
          isLoggedIn={isLoggedIn}
          setQuantity={setQuantity}
          setCartQuantity={setCartQuantity}
        />
      ),
    },
    { path: "/myapp/coupon", element: <Coupon isLoggedIn={isLoggedIn} /> },
    { path: "/myapp/profile", element: <Profile isLoggedIn={isLoggedIn} /> },
    { path: "/myapp/addcoupon", element: <AddCoupon /> },
    { path: "/myapp/addproduct", element: <AddProduct /> },
    { path: "/myapp/register", element: <Register /> },
    { path: "/myapp/login", element: <Login setIsLoggedIn={setIsLoggedIn} /> },
    { path: "/myapp/phonechange", element: <PhoneChange /> },
    { path: "/myapp/shoppinglist", element: <ShoppingList isLoggedIn={isLoggedIn} /> },
    { path: "/myapp/orderupdate/:orderId", element: <OrderUpdate /> },
    { path: "/myapp/orderdetail/:orderId", element: <OrderDetail /> },

    { path: "/myapp/placeorder", element: <PlaceOrder /> },

    {
      path: "/myapp/passwordchange",
      element: <ProtectedRoute isAuthenticated={passwordSuccess} element={<PasswordChange />} />,
    },
    {
      path: "/myapp/passwordcheck",
      element: (
        <PasswordCheck passwordSuccess={passwordSuccess} setPasswordSuccess={setPasswordSuccess} />
      ),
    },
    { path: "/myapp/mycoupons", element: <MyCoupons isLoggedIn={isLoggedIn} /> },
    {
      path: "/myapp/cart",
      element: (
        <Cart
          isLoggedIn={isLoggedIn}
          quantity={quantity}
          setQuantity={setQuantity}
          cartItems={cartItems}
          setCartItems={setCartItems}
          setCartQuantity={setCartQuantity}
        />
      ),
    },
    {
      path: "/myapp/checkout",
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
        <Nav
          setIsLoggedIn={setIsLoggedIn}
          isLoggedIn={isLoggedIn}
          cartQuantity={cartQuantity}
          setCartQuantity={setCartQuantity}
        />
      )}
      {HomePageRoutes.includes(location.pathname) && <HomePage />}

      <Background />

      <Routes>
        {routesConfig.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
