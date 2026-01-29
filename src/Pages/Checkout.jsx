import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Lock, CreditCard } from "lucide-react";

export default function Checkout() {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 95 ? 0 : 15;
  const total = subtotal + shipping;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Processing your order...");
    navigate("/order-success");
  };

  return (
    <div className="pt-32 pb-24 px-6 md:px-10 max-w-[1200px] mx-auto font-sans">
      <button 
        onClick={() => navigate("/cart")}
        className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest mb-10 hover:opacity-50 transition-opacity"
      >
        <ChevronLeft size={14} /> Back to Bag
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* LEFT COLUMN: FORMS */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }}
          className="space-y-12"
        >
          {/* Section 1: Contact */}
          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-6 border-b pb-2">01. Contact Information</h2>
            <div className="space-y-4">
              <input required type="email" placeholder="Email Address" className="checkout-input" />
              <div className="flex items-center gap-2 mt-2">
                <input type="checkbox" id="news" className="accent-black" />
                <label htmlFor="news" className="text-[12px] text-gray-500">Keep me updated on new arrivals and sales</label>
              </div>
            </div>
          </section>

          {/* Section 2: Shipping */}
          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-6 border-b pb-2">02. Shipping Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input required type="text" placeholder="First Name" className="checkout-input" />
              <input required type="text" placeholder="Last Name" className="checkout-input" />
              <input required type="text" placeholder="Address" className="checkout-input md:col-span-2" />
              <input required type="text" placeholder="City" className="checkout-input" />
              <input required type="text" placeholder="Postal Code" className="checkout-input" />
            </div>
          </section>

          {/* Section 3: Payment */}
          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-6 border-b pb-2">03. Payment</h2>
            <div className="border border-black p-4 flex justify-between items-center bg-gray-50">
              <div className="flex items-center gap-3">
                <span className="text-[12px] font-medium tracking-widest uppercase">Credit Card</span>
              </div>
              <Lock size={14} className="text-gray-400" />
            </div>
            <div className="mt-4 space-y-4 p-4 border border-t-0 border-gray-100">
                <input type="text" placeholder="Card Number" className="checkout-input" />
                <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="MM / YY" className="checkout-input" />
                    <input type="text" placeholder="CVC" className="checkout-input" />
                </div>
            </div>
          </section>

          <button 
            onClick={handleSubmit}
            className="w-full bg-black text-white py-5 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-gray-800 transition-colors"
          >
            Place Order — ${total.toFixed(2)}
          </button>
        </motion.div>

        {/* RIGHT COLUMN: ORDER SUMMARY */}
        <div className="lg:sticky lg:top-32 bg-[#F9F9F9] p-8 md:p-10">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-8">Order Summary</h2>
          
          <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2 mb-8 custom-scrollbar">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex gap-4">
                  <div className="relative w-16 h-20 bg-white border border-gray-100 flex-shrink-0">
                    {/* FIXED: Added mainImage check and better styling */}
                    <img 
                      src={item.mainImage || item.image} 
                      alt={item.name} 
                      className="w-full h-full object-contain p-2" 
                    />
                    <span className="absolute -top-2 -right-2 bg-black text-white text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="text-[11px] font-bold uppercase tracking-widest">{item.name}</h4>
                    <p className="text-[10px] text-gray-400 uppercase">
                        {item.selectedColor || "Standard"}
                    </p>
                  </div>
                </div>
                <span className="text-[13px] font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3 border-t border-gray-200 pt-6">
            <div className="flex justify-between text-[13px] font-light">
              <span className="text-gray-500">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[13px] font-light">
              <span className="text-gray-500">Shipping</span>
              <span>{shipping === 0 ? "Complimentary" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between items-center pt-6 mt-2 border-t border-gray-100">
              <span className="text-[11px] font-bold uppercase tracking-widest">Total</span>
              <span className="text-2xl font-light">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}