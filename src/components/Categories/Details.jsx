import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import "./Details.css";

const Details = ({ userId }) => {
  const { encodedSubCategory } = useParams();
  const subCategory = JSON.parse(decodeURIComponent(encodedSubCategory));

  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const pricePerUnit = subCategory?.price;
  const nameDrink = subCategory?.name;
  const navigate = useNavigate();

  const handleSizeChange = (newSize) => {
    setSelectedSize((prevSize) => (prevSize === newSize ? "" : newSize));
  };

  const handleQuantityChange = (increment) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + increment));
  };

  const totalPrice = pricePerUnit * quantity;

  const addToCart = () => {
    if (selectedSize) {
      const productId = uuidv4();
      const orderDetails = {
        productId,
        userId,
        nameDrink,
        quantity,
        pricePerUnit,
      };

      if (!userId) {
        alert("Please login first");
      } else {
        try {
          const existingCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
          existingCart.push(orderDetails);
          localStorage.setItem(`cart_${userId}`, JSON.stringify(existingCart));
          alert("Order added to shopping cart.");
        } catch (error) {
          console.error("Error adding order:", error);
          alert("Error adding order. Please try again.");
        }
      }
    } else {
      alert("Please select a size before adding to cart.");
    }
  };

  return (
    <div className="details-container">
      <div className="details-img-container">
        <img src={subCategory?.img || subCategory?.imgPath} className="details-image" alt={subCategory?.name} />
      </div>
      <div className="details-panel">
        <h2 className="details-title">Details for {subCategory?.name}</h2>

        <div className="details-option">
          <p className="details-option-label">Select Size</p>
          <div className="details-size-buttons">
            {["S", "M", "L"].map((buttonSize) => (
              <button
                key={buttonSize}
                onClick={() => handleSizeChange(buttonSize)}
                className={selectedSize === buttonSize ? "details-size-btn active" : "details-size-btn"}
              >
                {buttonSize}
              </button>
            ))}
          </div>
        </div>

        <div className="details-option">
          <p className="details-option-label">Select Quantity</p>
          <div className="details-quantity-buttons">
            <button className="details-qty-btn" onClick={() => handleQuantityChange(-1)}>
              <FaMinus size={16} />
            </button>
            <span className="details-qty-value">{quantity}</span>
            <button className="details-qty-btn" onClick={() => handleQuantityChange(1)}>
              <FaPlus size={16} />
            </button>
          </div>
        </div>

        <div className="details-price">
          <span>Price: </span>
          <span>{totalPrice} ₪</span>
        </div>

        <button
          className="details-cta"
          style={{ opacity: selectedSize ? 1 : 0.5 }}
          onClick={addToCart}
        >
          Add to cart
        </button>
        <button className="details-cta details-cta-secondary" onClick={() => navigate("/")}>
          Home
        </button>
      </div>
    </div>
  );
};

export default Details;
