import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCartItemQuantity, removeFromCart, moveToWishlist } from "../features/cart/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleIncreaseQuantity = (productId) => {
    const product = cartItems.find(item => item.productId === productId);
    dispatch(updateCartItemQuantity({ productId, quantity: product.quantity + 1 }));
  };

  const handleDecreaseQuantity = (productId) => {
    const product = cartItems.find(item => item.productId === productId);
    if (product.quantity > 1) {
      dispatch(updateCartItemQuantity({ productId, quantity: product.quantity - 1 }));
    }
  };

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleMoveToWishlist = (productId) => {
    dispatch(moveToWishlist({ productId }));
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.map((item) => (
        <div key={item.productId}>
          <h3>{item.name}</h3>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => handleIncreaseQuantity(item.productId)}>+</button>
          <button onClick={() => handleDecreaseQuantity(item.productId)}>-</button>
          <button onClick={() => handleRemove(item.productId)}>Remove</button>
          <button onClick={() => handleMoveToWishlist(item.productId)}>Add to Wishlist</button>
        </div>
      ))}
      <div>
        <h3>Price Details</h3>
        <p>Total Price: ${totalPrice}</p>
        <button>Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
