import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import MainLayout from "./Layouts/Mainlayout";
import NewArrivals from "./Pages/NewArrivals";
import Sales from "./Pages/Sales";
import Story from "./Pages/Story";
import Care from './Pages/Care';
import Wishlist from './Pages/wishlist';
import FAQ from "./Pages/Faq";
import Return from "./Pages/Return";
import NotFound from "./Pages/NotFound"; 
import Profile from "./Pages/Profile";

function App() {
  return (
    <Router>
      <Routes>
        {/* All routes inside MainLayout will have the Navbar and Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/new-arrivals" element={<NewArrivals />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/story" element={<Story />} />
          <Route path="/care" element={<Care />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/returns" element={<Return />} />
          
          
          
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;