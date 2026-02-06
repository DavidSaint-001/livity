import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

const BackButton = ({ variant = "dark" }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // If the user is on the Home page, don't render the button
  if (location.pathname === "/") return null;

  return (
    <motion.button
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: -4 }}
      onClick={() => navigate(-1)}
      className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] mb-10 transition-all hover:opacity-60 cursor-pointer ${
        variant === "light" ? "text-white" : "text-black"
      }`}
    >
      <ChevronLeft size={14} strokeWidth={3} /> Back
    </motion.button>
  );
};

export default BackButton;