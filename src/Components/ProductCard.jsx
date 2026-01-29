import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Plus, X, Check } from "lucide-react";
import { Link } from "react-router-dom"; 
import { useWishlist } from "../Context/WishlistContext";
import { useCart } from "../Context/CartContext"; 

const ProductCard = ({ product }) => {
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || "Standard");
  const [isAdded, setIsAdded] = useState(false); // Local feedback state
  
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart(); 
  
  const isLiked = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // 1. Add to context
    addToCart({
      ...product,
      selectedColor: selectedColor,
      selectedSize: "M", // Default for home page quick-add
      quantity: 1
    });

    // 2. Show success feedback
    setIsAdded(true);
    
    // 3. Close panel and reset button after a short delay
    setTimeout(() => {
      setIsQuickAddOpen(false);
      setIsAdded(false);
    }, 800);
  };

  return (
    <Link to={`/product/${product.id}`} className="group cursor-pointer relative block">
      
      <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F5F5]">
        <img 
          src={product.mainImage} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Heart Button */}
        <button 
          onClick={(e) => {
            e.preventDefault(); 
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="absolute top-4 right-4 p-1.5 z-10 transition-transform active:scale-125"
        >
          <Heart 
            size={18} 
            strokeWidth={1.2}
            fill={isLiked ? "black" : "none"} 
            className={isLiked ? "text-black" : "text-gray-400"}
           />
        </button>

        {/* Plus / Quick Add Toggle */}
        <button 
          onClick={(e) => {
            e.preventDefault(); 
            e.stopPropagation();
            setIsQuickAddOpen(!isQuickAddOpen);
          }}
          className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md z-20 hover:bg-black hover:text-white transition-colors"
        >
          {isQuickAddOpen ? <X size={18} /> : <Plus size={18} />}
        </button>

        {/* QUICK ADD COLOR PALLET PANEL */}
        <AnimatePresence>
          {isQuickAddOpen && (
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute bottom-0 left-0 w-full bg-white/95 backdrop-blur-md p-6 z-10 border-t border-gray-100"
              onClick={(e) => e.preventDefault()} 
            >
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Select Color</p>
              
              <div className="flex gap-3">
                {product.colors && product.colors.length > 0 ? (
                  product.colors.map((color) => (
                    <div key={color.name} className="flex flex-col items-center gap-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedColor(color.name);
                        }} 
                        className={`w-8 h-8 rounded-full border p-0.5 transition-all ${
                          selectedColor === color.name ? 'border-black scale-110' : 'border-gray-200 hover:border-gray-400'
                        }`}
                        title={color.name}
                      >
                        <div 
                          className="w-full h-full rounded-full" 
                          style={{ backgroundColor: color.hex }}
                        />
                      </button>
                      <span className={`text-[9px] uppercase transition-opacity ${
                        selectedColor === color.name ? 'opacity-100 text-black font-bold' : 'opacity-0'
                      }`}>
                        {color.name}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-[9px] text-gray-400 uppercase">One Color Available</p>
                )}
              </div>

              {/* ACTION BUTTON */}
              <button 
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`w-full mt-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${
                  isAdded ? "bg-green-600 text-white" : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                {isAdded ? (
                  <>
                    <Check size={14} /> Added
                  </>
                ) : (
                  "Add to Cart"
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Product Text Info */}
      <div className="mt-4 space-y-1">
        <h3 className="text-[13px] font-medium text-[#1a1a1a] tracking-tight">{product.name}</h3>
        <p className="text-[12px] text-gray-500">${product.price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;