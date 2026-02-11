import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Context & Auth
import { useAuth } from "./Context/AuthContext";

// Layouts & Components
import MainLayout from "./Layouts/Mainlayout";
import Loader from "./Components/Loader";
import BackButton from "./Components/BackButton";

// Pages
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Profile from "./Pages/Profile";
import NewArrivals from "./Pages/NewArrivals";
import Sales from "./Pages/Sales";
import Story from "./Pages/Story";
import Care from './Pages/Care';
import Wishlist from './Pages/wishlist';
import FAQ from "./Pages/Faq";
import Return from "./Pages/Return";
import CustomDesign from "./Pages/CustomDesign";
import OrderSuccess from "./Pages/OrderSuccess";
import NotFound from "./Pages/NotFound";

function App() {
  const [introLoading, setIntroLoading] = useState(true);
  const { loading: authLoading } = useAuth(); // Listen to Supabase's loading state

  useEffect(() => {
    // Keep the branding loader visible for at least 2.5 seconds
    const timer = setTimeout(() => {
      setIntroLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // The app is only "Ready" when BOTH the intro timer AND auth check are done
  const isAppReady = !introLoading && !authLoading;

  return (
    <>
      <AnimatePresence mode="wait">
        {!isAppReady && <Loader key="loader" />}
      </AnimatePresence>

      {/* We only render the Router and content once isAppReady is true. 
        This prevents "Profile" from seeing user=null for a split second on refresh.
      */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isAppReady ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        {isAppReady && (
          <Router>
            <Routes>
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
                <Route path="/custom-design" element={<CustomDesign />} />
                <Route path="/success" element={<OrderSuccess />} />

                
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Router>
        )}
      </motion.div>
    </>
  );
}

export default App;