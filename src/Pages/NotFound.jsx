import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center px-6 text-center font-sans bg-white">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-4">
          Status — 404
        </p>
        <h1 className="text-[28px] md:text-[32px] font-light tracking-tight text-[#1a1a1a] mb-6">
          This page is currently <br /> under construction.
        </h1>
        <p className="text-gray-500 text-[13px] max-w-xs mx-auto mb-10 leading-relaxed font-light">
          We're working on something special. In the meantime, you can continue exploring our collections.
        </p>
        
        <Link 
          to="/shop" 
          className="inline-block bg-black text-white px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-all"
        >
          Back to Shop
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;