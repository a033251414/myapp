import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const [timeLeft, setTimeLeft] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer); // 清除計時器
    } else {
      console.log("倒數結束，執行動作");
      navigate("/myapp");
    }
  }, [timeLeft]);

  return (
    <div>
      <div className="circle-container">
        <div>
          <div class="circle"></div>
        </div>
      </div>

      <div>
        <p className="checkmark">✔️</p>
        <p className="placeorder-text">完成訂購,即將跳轉畫面:{timeLeft}</p>
      </div>
    </div>
  );
};

export default PlaceOrder;
