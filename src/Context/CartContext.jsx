import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("livity_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("livity_cart", JSON.stringify(cartItems));
  }, [cartItems]);

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

  // FIX: Identify by ID + Color + Size
  const removeFromCart = (id, color, size) => {
    setCartItems((prev) => prev.filter((item) => 
      !(item.id === id && item.selectedColor === color && item.selectedSize === size)
    ));
  };

  // FIX: Update quantity specifically for that variant
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
  
  // Extra helper: Total number of items (for the badge on your Navbar)
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      subtotal, 
      cartCount 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);