import { motion } from "framer-motion";

const Loader = () => {
  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ 
        y: "-100%", 
        transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.2 } 
      }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
    >
      <div className="relative flex flex-col items-center">
        {/* LOGO IMAGE CONTAINER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ 
            duration: 1.2, 
            ease: [0.76, 0, 0.24, 1] 
          }}
          className="w-100 md:w-100 h-auto" // Adjust width to fit your logo size
        >
          <img 
            src="/logo.png" 
            alt="Livity Logo" 
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* ELEGANT UNDERLINE */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "60px" }}
          transition={{ 
            duration: 1, 
            delay: 0.5, 
            ease: "easeInOut" 
          }}
          className="h-[1px] bg-black mt-6"
        />
      </div>
    </motion.div>
  );
};

export default Loader;