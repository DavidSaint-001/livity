import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("livity_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("livity_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // NEW: Function to empty the cart after successful checkout
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("livity_cart");
  };

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) => 
          item.id === product.id && 
          item.selectedColor === product.selectedColor &&
          item.selectedSize === product.selectedSize
      );

      if (existingItem) {
        return prev.map((item) =>
          item === existingItem 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id, color, size) => {
    setCartItems((prev) => prev.filter((item) => 
      !(item.id === id && item.selectedColor === color && item.selectedSize === size)
    ));
  };

  const updateQuantity = (id, color, size, amount) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.selectedColor === color && item.selectedSize === size
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, // Crucial: This makes it available to Checkout.jsx
      subtotal, 
      cartCount 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);