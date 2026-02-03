import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; 
import { WishlistProvider } from "./Context/WishlistContext";
import { CartProvider } from "./Context/CartContext";
import { AuthProvider } from "./Context/AuthContext"; // Import the new AuthProvider

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider> {/* Wrap the entire tree */}
    <CartProvider>
      <WishlistProvider>
        <App />
      </WishlistProvider>
    </CartProvider>
  </AuthProvider>
);