import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

const HomePage = () => {
  const recommend = [
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
      name: "奇多北海道奶油玉米風味玉米棒",
      imgSrc: "/myapp/零食/餅乾/洋芋片/奇多北海道奶油玉米風味玉米棒.png",
      price: 35,
    },
    {
      name: "美國Ruffles波樂 厚切洋芋片-香蔥",
      imgSrc: "/myapp/零食/餅乾/洋芋片/美國Ruffles波樂 厚切洋芋片-香蔥.png",
      price: 35,
    },
    {
      name: "樂事九州岩燒海苔",
      imgSrc: "/myapp/零食/餅乾/洋芋片/樂事九州岩燒海苔.png",
      price: 35,
    },
    {
      name: "樂事九州岩燒海苔",
      imgSrc: "/myapp/零食/餅乾/洋芋片/樂事九州岩燒海苔.png",
      price: 35,
    },
    {
      name: "樂事九州岩燒海苔",
      imgSrc: "/myapp/零食/餅乾/洋芋片/樂事九州岩燒海苔.png",
      price: 35,
    },
  ];

  const settings = {
    // 顯示輪播的點點導航
    infinite: true, // 無限循環
    speed: 500, // 切換速度
    slidesToShow: 4, // 每次顯示3張圖片
    slidesToScroll: 1, // 每次滾動1張圖片
    autoplay: true, // 自動播放
    autoplaySpeed: 2000, // 自動播放的速度（2秒）
  };

  return (
    <div className="carousel">
      <Slider {...settings}>
        {recommend.map((item, index) => (
          <div key={index}>
            <img className="recommend-img" src={item.imgSrc} alt={item.name} />
          </div>
        ))}
      </Slider>

      <div>
        <Link to="/myapp/coupon">
          <img className="coupon-icon" src="myapp/限時優惠券.png" alt="優惠券" />
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
