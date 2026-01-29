import { useCart } from "../Context/CartContext";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // 1. Added useNavigate
import { motion } from "framer-motion";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, subtotal } = useCart();
  const navigate = useNavigate(); // 2. Initialize navigate

  if (cartItems.length === 0) {
    // ... your existing empty state logic ...
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center font-sans mt-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-8">
              <ShoppingBag size={30} strokeWidth={1} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-light tracking-tight mb-4">Your bag is empty</h2>
            <p className="text-gray-400 text-sm mb-10 max-w-[300px] leading-relaxed">
              Discover our latest collections and find something handcrafted just for you.
            </p>
            <Link 
              to="/shop" 
              className="bg-black text-white px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors"
            >
              Explore Collections
            </Link>
          </motion.div>
        </div>
      );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-10 md:py-20 mt-10 font-sans">
      <h1 className="text-2xl font-light text-center mb-10 md:mb-16 tracking-tight">Shopping Bag</h1>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left: Cart Items Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {cartItems.map((item) => (
            <div key={item.id} className="border border-gray-100 p-6 relative flex flex-col items-center">
              <button 
                onClick={() => removeFromCart(item.id)} 
                className="absolute top-4 right-4 text-gray-300 hover:text-black z-30 transition-colors p-2"
              >
                <X size={18} strokeWidth={1} />
              </button>
              
              <div className="text-center mb-6">
                <h3 className="text-[13px] font-medium uppercase tracking-tight">{item.name}</h3>
                <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider font-bold">
                  {item.selectedColor || "Standard"}
                </p>
              </div>

              <div className="w-full aspect-[4/5] bg-[#F9F9F9] mb-6 overflow-hidden">
                <img 
                  src={item.mainImage || item.image} 
                  alt={item.name} 
                  className="w-full h-full object-contain p-4" 
                />
              </div>

              <div className="flex items-center gap-6 border border-gray-200 rounded-full px-5 py-1.5 mb-8">
                <button onClick={() => updateQuantity(item.id, -1)} className="text-gray-400 hover:text-black">
                    <Minus size={14} />
                </button>
                <span className="text-xs font-medium w-4 text-center">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)} className="text-gray-400 hover:text-black">
                    <Plus size={14} />
                </button>
              </div>

              <div className="w-full pt-4 border-t border-gray-100 flex justify-between items-center text-[10px] text-gray-400 uppercase tracking-[0.15em]">
                <span>Price</span>
                <span className="text-black font-semibold">${item.price * item.quantity}</span>
              </div>
              <div className="w-full pt-4 border-t border-gray-100 flex justify-between items-center text-[10px] text-gray-400 uppercase tracking-[0.15em]">
                <span>Colour</span>
                <span className="text-black font-semibold">${item.price * item.quantity}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Order Summary */}
        <div className="w-full lg:w-[400px] space-y-6">
          <div className="border border-gray-100 bg-white sticky top-32 shadow-sm">
            <div className="py-4 border-b border-gray-100 text-center">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em]">Order Summary</h2>
            </div>
            
            <div className="p-8 space-y-5">
              <div className="flex justify-between text-[13px] text-gray-500">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between text-[13px] text-gray-500">
                <span>Shipping</span>
                <span className="text-[10px] uppercase tracking-widest text-green-600 font-bold">Complimentary</span>
              </div>
              <div className="flex justify-between font-bold pt-5 border-t border-gray-100 uppercase tracking-widest text-[11px]">
                <span>Bag Total</span>
                <span>${subtotal}</span>
              </div>
            </div>

            <div className="px-8 pb-8 border-t border-gray-100 pt-6">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-black block mb-4 text-center">
                  Add a gift message
                </label>
                <textarea 
                  placeholder="Enter your message here..."
                  className="w-full border border-gray-100 p-4 h-28 text-xs focus:outline-none focus:border-black resize-none placeholder:text-gray-300 transition-all" 
                />
            </div>
            
            <div className="px-8 pb-8">
              {/* 3. Updated Button with onClick navigate */}
              <button 
                onClick={() => navigate("/checkout")} 
                className="w-full bg-black text-white py-5 text-[11px] uppercase font-bold tracking-[0.25em] hover:bg-gray-800 transition-colors"
              >
                Proceed to Checkout
              </button>
              <p className="text-[10px] text-gray-400 mt-6 text-center italic">
                Final shipping & taxes calculated at checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;