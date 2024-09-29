import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import axios from "axios";

const AddProduct = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodeToken = jwtDecode(token);
      console.log(decodeToken.role);
      if (decodeToken.role === "admin") {
        setIsAdmin(true);
      }
    }
  }, []);

  const AdminPageShow = () => {
    return (
      <li className="itembox drop-down">
        <Link className="item" to="/myapp/adminpage">
          管理員操作
        </Link>
        <div className="submenu">
          <Link className="submenu-item" to="/myapp/addproduct">
            新增商品
          </Link>
          <Link className="submenu-item" to="/myapp/addcoupon">
            新增優惠券
          </Link>
        </div>
      </li>
    );
  };

  const handleProductName = (e) => {
    setProductName(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handlePrice = (e) => {
    setPrice(e.target.value);
  };
  const handleCategory = (e) => {
    setCategory(e.target.value);
  };
  const handleStock = (e) => {
    setStock(e.target.value);
  };
  const handleImageUrl = (e) => {
    setImageUrl(e.target.value);
  };
  const handleCreate = async () => {
    try {
      const response = await axios.post(
        "https://myapp1-test-3490f09779f0.herokuapp.com/addproduct",
        {
          isAdmin,
          productName,
          description,
          price,
          category,
          stock,
          imageUrl,
        }
      );
      if (response.status === 201) {
        alert("新增商品成功");
      }
    } catch (err) {
      const errorMessage =
        err.response && err.response.data ? err.response.data.message : "新生商品時發生錯誤";
      alert(errorMessage);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-menu-container">
        <ul className="menu">
          <li className="itembox drop-down">
            <Link className="item" to="/myapp/profile">
              我的帳戶
            </Link>
            <div className="submenu">
              <Link className="submenu-item" to="/myapp/profile">
                個人檔案
              </Link>
              <Link className="submenu-item" to="/myapp/passwordcheck">
                更改密碼
              </Link>
            </div>
          </li>
          <li className="itembox drop-down">
            <Link className="item" to="/myapp/shoppinglist">
              購買清單
            </Link>
          </li>
          <li className="itembox drop-down">
            <Link className="item" to="/myapp/mycoupons">
              我的優惠券
            </Link>
          </li>
          {isAdmin && AdminPageShow()}
        </ul>
      </div>

      <div className="center-background">
        <div className="profile-title">新增商品</div>

        <table className="profile-table">
          <tbody>
            <tr>
              <td>
                <div className="addPage-container">
                  <label htmlFor="productname" className="addPage-label">
                    商品名稱：
                  </label>
                  <input
                    onChange={handleProductName}
                    value={productName}
                    className="addPage-input"
                    placeholder="必填"
                    type="text"
                    id="productname"
                    required
                  />
                </div>
              </td>
              <td>
                <div className="addPage-container">
                  <label htmlFor="description" className="addPage-label">
                    商品描述：
                  </label>
                  <input
                    onChange={handleDescription}
                    value={description}
                    type="text"
                    id="description"
                    className="addPage-input"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="addPage-container">
                  <label htmlFor="price" className="addPage-label">
                    商品價格：
                  </label>
                  <input
                    onChange={handlePrice}
                    value={price}
                    className="addPage-input"
                    type="number"
                    id="price"
                    required
                  />
                </div>
              </td>
              <td>
                <div className="addPage-container">
                  <label htmlFor="category" className="addPage-label">
                    商品分類：
                  </label>
                  <input
                    onChange={handleCategory}
                    value={category}
                    type="text"
                    id="category"
                    className="addPage-input"
                    required
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="addPage-container">
                  <label htmlFor="stock" className="addPage-label">
                    商品庫存：
                  </label>
                  <input
                    onChange={handleStock}
                    value={stock}
                    type="number"
                    id="stock"
                    className="addPage-input"
                  />
                </div>
              </td>
              <td>
                <div className="addPage-container">
                  <label htmlFor="imageUrl" className="addPage-label">
                    商品圖片：
                  </label>
                  <input
                    onChange={handleImageUrl}
                    value={imageUrl}
                    type="url"
                    id="imageUrl"
                    className="addPage-input"
                  />
                </div>
              </td>
            </tr>

            <tr>
              <td></td>
              <td>
                <button onClick={handleCreate} className="create-btn">
                  新增商品
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddProduct;
