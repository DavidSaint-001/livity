import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion"; // The missing import!

const BackButton = ({ variant = "dark" }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide on Home page
  if (location.pathname === "/") return null;

  // Check if we are on Auth pages to apply the "floating" style
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  const baseStyles = `flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.4em] transition-all hover:opacity-60 cursor-pointer z-50`;
  
  // Floating style for Auth, Relative style for Shop/Product pages
  const positionStyles = isAuthPage 
    ? "absolute top-8 left-6 md:left-12 mb-0" 
    : "relative mb-10";

  const colorStyles = variant === "light" ? "text-white" : "text-black";

  return (
    <motion.button
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: -4 }}
      onClick={() => navigate(-1)}
      className={`${baseStyles} ${positionStyles} ${colorStyles}`}
    >
      <div className={`flex items-center justify-center w-8 h-8 rounded-full border ${
        variant === "light" ? "border-white/20" : "border-black/5"
      }`}>
        <ChevronLeft size={14} strokeWidth={2.5} />
      </div>
      <span className={isAuthPage ? "hidden md:block" : "block"}>Back</span>
    </motion.button>
  );
};

export default BackButton;