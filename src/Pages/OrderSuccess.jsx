import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function OrderSuccess() {
  const location = useLocation();
  const orderNumber = location.state?.orderNo || "LIV-UNKNOWN";

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full text-center space-y-8"
      >
        <div className="flex justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          >
            <CheckCircle size={60} strokeWidth={1} className="text-gray-900" />
          </motion.div>
        </div>

        <div className="space-y-4">
          <h1 className="text-[14px] font-bold uppercase tracking-[0.5em]">Order Confirmed</h1>
          <p className="text-[12px] text-gray-500 leading-relaxed font-light">
            Thank you for choosing Livity Atelier. Your order <span className="text-black font-medium">{orderNumber}</span> has been received and is currently being processed.
          </p>
        </div>

        <div className="pt-8 border-t border-gray-100">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-6">
            A confirmation email has been sent to your inbox.
          </p>
          <Link 
            to="/" 
            className="inline-block bg-black text-white px-10 py-4 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-zinc-800 transition-all"
          >
            Continue Shopping
          </Link>
        </div>
      </motion.div>
    </div>
  );
}