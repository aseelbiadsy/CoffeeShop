import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../constans/Urls/Url";
import "./CheckOut.css";

const CheckOut = ({ userId }) => {
  const navigate = useNavigate();
  const { cart } = useParams();
  const cartItems = JSON.parse(decodeURIComponent(cart));

  const totalAmount = cartItems.reduce((acc, item) => {
    const itemTotal = item.pricePerUnit * item.quantity;
    return isNaN(itemTotal) ? acc : acc + itemTotal;
  }, 0);

  const [shippingAddress, setShippingAddress] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const submitOrder = async () => {
    if (!name || !phoneNumber || !shippingAddress) {
      alert("Please fill in all required fields.");
      return;
    }

    const CheckoutOrder = {
      userId: userId,
      products: cartItems.map((item) => ({
        name: item.nameDrink,
        quantity: item.quantity,
        price: item.pricePerUnit,
      })),
      totalAmount: totalAmount.toFixed(2),
      shippingAddress: shippingAddress,
      customer: {
        name,
        phoneNumber,
      },
    };

    try {
      await axios.post(`${BASE_URL}/Checkout`, CheckoutOrder);
      alert("Order submitted successfully.");
      localStorage.removeItem(`cart_${userId}`);
      navigate("/");
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>
      <p className="checkout-subtitle">Pick up of your order and cash payment.</p>

      <div className="checkout-summary">
        <h3 className="checkout-summary-title">Order Summary:</h3>
        {cartItems.map((item) => (
          <div key={item.productId} className="checkout-item">
            <span className="checkout-item-text">{item.nameDrink}</span>
            <span className="checkout-item-text">{`X${item.quantity}`}</span>
            <span className="checkout-item-text">{`Price: ₪${(item.pricePerUnit * item.quantity).toFixed(2)}`}</span>
          </div>
        ))}
        <p className="checkout-total">{`Total: ₪${totalAmount.toFixed(2)}`}</p>
      </div>

      <form
        className="checkout-form"
        onSubmit={(e) => {
          e.preventDefault();
          submitOrder();
        }}
      >
        <input
          className="checkout-input"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="checkout-input"
          placeholder="your phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          type="tel"
        />

        <input
          className="checkout-input"
          placeholder="your shipping address"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
        />

        <button type="submit" className="checkout-submit">
          Submit Order
        </button>
      </form>
    </div>
  );
};

export default CheckOut;
