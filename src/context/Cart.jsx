//10. Creating the cart context and the cart provider to avoid props drilling 
//useState hook- To create a store the cart state
//useEffect - To persist the cart state in the local browser. 
import React, { createContext, useState, useEffect } from 'react';
//11.CreateContext hook- To create a cart context
export const CartContext = createContext();
//12. Creating the cart provider
export const CartProvider = ({ children }) => {
  const initialCartItems = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];

//13.Initialize the State of the cart 
  const [cartItems, setCartItems] = useState(initialCartItems);

  //14.creating the Add to cart function
  const addToCart = (item) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);
    if (isItemInCart) {
      setCartItems((prevCartItems) =>
        prevCartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems((prevCartItems) => [...prevCartItems, { ...item, quantity: 1 }]);
    }
  };
//15.creating the Remove from cart function
  const removeFromCart = (item) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);
    if (isItemInCart) {
      setCartItems((prevCartItems) =>
        prevCartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    } else {
      setCartItems((prevCartItems) => [...prevCartItems, { ...item, quantity: 1 }]);
    }
  };
//16.creating the Clear cart function
  const clearCart = () => {
    setCartItems([]);
  };
//17.creating the getCartTotal function to get the cart total
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };
//18. Using the UseEffect hook to persist the cart state in the local browser.
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  return (
    //19.Passing the cart state to the componenets - & import the cartprovider in the main.jsx
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, getCartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};
