import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Coupon = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState([]);

  const handleBack = () => {
    navigate("/myapp");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://myapp1-test-3490f09779f0.herokuapp.com/coupon");
        setCoupons(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("抓取資料錯誤:", error);
      }
    };
    fetchData();
  }, []);

  const handleGetCoupon = async (couponId, usageLimit) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "https://myapp1-test-3490f09779f0.herokuapp.com/coupon",
        { couponId, usageLimit },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("優惠券領取成功");
    } catch (error) {
      if (error.response.status === 400) {
        alert("您已領取過優惠券");
      } else {
        console.error("領取優惠券錯誤:", error);
        alert("領取優惠券失敗");
      }
    }
  };

  const CouponImg = ({ discountAmount }) => {
    if (discountAmount === 60) {
      return <img className="coupon-claim-img" src="/myapp/免運券.png" alt="優惠券"></img>;
    }
    return null;
  };

  return (
    <div className="coupon-container">
      <button onClick={handleBack} className="coupon-back-btn">
        返回首頁
      </button>
      {coupons.map((coupon) => (
        <div key={coupon.id} className="coupon-claim-container">
          <CouponImg discountAmount={coupon.discountAmount} />

          <button
            onClick={() => handleGetCoupon(coupon._id, coupon.usageLimit)}
            className="claim-button"
          >
            <p>領取</p>
          </button>
        </div>
      ))}
    </div>
  );
};

export default Coupon;
