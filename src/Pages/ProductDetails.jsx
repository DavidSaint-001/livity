import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useWishlist } from "../Context/WishlistContext";
import { useCart } from "../Context/CartContext"; // 1. Added Cart Context
import { motion } from "framer-motion";
import { ChevronDown, Check } from "lucide-react"; // Added Check icon

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("S");
  const [isAdding, setIsAdding] = useState(false); // For button feedback

  const { addToCart } = useCart(); // 2. Access addToCart function
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        if (data.colors && data.colors.length > 0) {
          setSelectedColor(data.colors[0].name);
        }
      })
      .catch((err) => {
        console.error("Error fetching product details:", err);
      });
  }, [id]);

  // 3. Handle Add to Cart Logic
  const handleAddToCart = () => {
    setIsAdding(true);
    
    addToCart({
      ...product,
      selectedColor,
      selectedSize,
    });

    // Reset button after 1.5 seconds
    setTimeout(() => {
      setIsAdding(false);
    }, 1500);
  };

  if (!product) return (
    <div className="h-screen flex items-center justify-center uppercase tracking-widest text-[11px]">
      Product Not Found
    </div>
  );

  return (
    <div className="max-w-360 mx-auto px-6 md:px-10 py-12 font-sans mt-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* LEFT: MULTI-IMAGE GALLERY */}
        <div className="lg:col-span-8 space-y-4">
          {product.gallery && product.gallery.length > 0 ? (
            product.gallery.map((img, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="aspect-3/4 bg-[#F9F9F9] overflow-hidden"
              >
                <img 
                  src={img} 
                  alt={`${product.name} view ${index + 1}`} 
                  className="w-full h-full object-cover" 
                />
              </motion.div>
            ))
          ) : (
            <div className="aspect-3/4 bg-[#F9F9F9]">
               <img src={product.mainImage} alt={product.name} className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        {/* RIGHT: STICKY INFO PANEL */}
        <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
          <div className="mb-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">
              {product.category}
            </p>
            <h1 className="text-[22px] font-medium tracking-tight text-[#1a1a1a] mb-2">
              {product.name}
            </h1>
            <p className="text-[16px] text-gray-500">${product.price}</p>
          </div>

          <div className="space-y-8">
            {/* COLOR PICKER */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-gray-400">
                  Color — {selectedColor}
                </p>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-7 h-7 rounded-full border p-0.5 transition-all ${
                        selectedColor === color.name ? "border-black" : "border-transparent"
                      }`}
                    >
                      <div className="w-full h-full rounded-full" style={{ backgroundColor: color.hex }} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* SIZE SELECTOR */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Select Size</p>
                <button className="text-[10px] uppercase tracking-widest underline underline-offset-4">Size Guide</button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {["XS", "S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 text-[12px] border transition-all ${
                      selectedSize === size ? "bg-black text-white border-black" : "border-gray-200 hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* ACTIONS */}
            <div className="space-y-3 pt-4">
              <button 
                onClick={handleAddToCart}
                disabled={isAdding}
                className="w-full bg-black text-white py-5 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#333] transition-all flex items-center justify-center gap-2"
              >
                {isAdding ? (
                  <>
                    <Check size={16} /> Added to Bag
                  </>
                ) : (
                  "Add to Bag"
                )}
              </button>
              
              <button onClick={() => toggleWishlist(product)} className="w-full border border-gray-200 py-5 text-[11px] font-bold uppercase tracking-[0.2em] hover:border-black transition-colors">
                {isInWishlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
              </button>
            </div>

            {/* ACCORDIONS */}
            <div className="pt-10 border-t border-gray-100 divide-y divide-gray-100">
              {["Product Details", "Shipping & Returns", "Fabric & Care"].map((item) => (
                <details key={item} className="group py-5">
                  <summary className="flex justify-between items-center cursor-pointer list-none text-[11px] font-bold uppercase tracking-[0.2em]">
                    {item}
                    <ChevronDown size={14} className="group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="mt-4 text-[13px] text-gray-500 leading-relaxed font-light">
                    {product.description || `Crafted from premium materials, this piece features a tailored fit designed for effortless daily wear.`}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;