import React from "react";
import { useCart } from "../context/CartContext";
import "./Cart.css";

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <ul className="cart-list">
          {cart.map((item) => (
            <li key={item.product_id} className="cart-item">
              <span>
                {item.name} - ₹{item.price} x {item.quantity}
              </span>
              <button className="remove-btn" onClick={() => removeFromCart(item.product_id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
