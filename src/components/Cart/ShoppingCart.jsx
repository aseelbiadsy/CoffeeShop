import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./ShoppingCart.css";

const ShoppingCart = ({ userId }) => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const getCartFromLocalStorage = (userId) => {
    const cartKey = `cart_${userId}`;
    const existingCart = JSON.parse(localStorage.getItem(cartKey)) || [];
    return Array.isArray(existingCart) ? existingCart : [];
  };

  useEffect(() => {
    if (userId) {
      setCart(getCartFromLocalStorage(userId));
    } else {
      setCart([]);
    }
  }, [userId]);

  const totalSum = Array.isArray(cart) ? cart.reduce((sum, item) => sum + item.pricePerUnit * item.quantity, 0) : 0;

  const updateQuantityInLocalStorage = (productId, newQuantity) => {
    const cartKey = `cart_${userId}`;
    const existingCart = getCartFromLocalStorage(userId);

    const updatedCart = existingCart.map((item) =>
      item.productId === productId ? { ...item, quantity: newQuantity } : item
    );

    localStorage.setItem(cartKey, JSON.stringify(updatedCart));
  };

  const deleteItemFromLocalStorage = (productId) => {
    const cartKey = `cart_${userId}`;
    const existingCart = getCartFromLocalStorage(userId);
    const updatedCart = existingCart.filter((item) => item.productId !== productId);
    localStorage.setItem(cartKey, JSON.stringify(updatedCart));
  };

  const handleUpdateQuantity = (operation, productId) => {
    setCart((prevCart) => {
      let newQuantity;
      const updatedCart = prevCart.map((item) => {
        if (item.productId === productId) {
          newQuantity = operation === "increment" ? item.quantity + 1 : Math.max(item.quantity - 1, 1);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });

      updateQuantityInLocalStorage(productId, newQuantity);
      return updatedCart;
    });
  };

  const handleDeleteItem = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.productId !== productId);
      deleteItemFromLocalStorage(productId);
      return updatedCart;
    });
  };

  const onBuyPress = () => {
    navigate(`/CheckOut/${encodeURIComponent(JSON.stringify(cart))}`);
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Cart</h2>
      {userId ? (
        cart.length > 0 ? (
          <>
            <div className="cart-list">
              {cart.map((item) => (
                <div className="cart-item" key={item.productId || Math.random()}>
                  <span className="cart-item-name">{item.nameDrink}</span>
                  <div className="cart-item-qty">
                    <button onClick={() => handleUpdateQuantity("decrement", item.productId)}>
                      <FaMinus size={16} />
                    </button>
                    <span className="cart-item-name">{item.quantity}</span>
                    <button onClick={() => handleUpdateQuantity("increment", item.productId)}>
                      <FaPlus size={16} />
                    </button>
                  </div>
                  <span className="cart-item-price">{`${(item.pricePerUnit * item.quantity).toFixed(2)} ₪`}</span>
                  <button onClick={() => handleDeleteItem(item.productId)}>
                    <FaTrash size={16} />
                  </button>
                </div>
              ))}
            </div>
            <div className="cart-total-container">
              <p className="cart-total-text">{`Total: ${totalSum.toFixed(2)} ₪`}</p>
              <button className="cart-buy-button" onClick={onBuyPress}>
                Buy
              </button>
            </div>
          </>
        ) : (
          <p className="cart-empty-text">There is no item in your shopping cart.</p>
        )
      ) : (
        <p className="cart-empty-text">Please log in to view your shopping cart.</p>
      )}
    </div>
  );
};

export default ShoppingCart;
