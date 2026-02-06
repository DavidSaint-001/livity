import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useWishlist } from "../Context/WishlistContext";
import { useCart } from "../Context/CartContext";
import { useRecentlyViewed } from "../hooks/useRecentlyViewed";
import { useAuth } from "../Context/AuthContext"; // Added Auth Hook
import { ChevronDown, Check, Star } from "lucide-react";
import { products } from "../data/Product";
import ProductCard from "@/Components/ProductCard";
import BackButton from "../Components/BackButton";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { recentProducts, addToRecent } = useRecentlyViewed();
  const { user } = useAuth(); // Get user info

  const product = products.find(p => p.id === Number(id));
  
  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedColor, setSelectedColor] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [allReviews, setAllReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });

  useEffect(() => {
    if (product) {
      if (product.colors?.length > 0) setSelectedColor(product.colors[0].name);
      setAllReviews(product.reviews || []);
      addToRecent(product);
      window.scrollTo(0, 0);
    }
  }, [id, product]);

  const getAverageRating = () => {
    if (allReviews.length === 0) return 0;
    const sum = allReviews.reduce((acc, rev) => acc + rev.rating, 0);
    return (sum / allReviews.length).toFixed(1);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const submission = {
      id: Date.now(),
      // USES LOGGED IN USER INFO OR GUEST
      user: user ? user.email.split('@')[0] : "Guest User", 
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      ...newReview
    };
    setAllReviews([submission, ...allReviews]);
    setNewReview({ rating: 5, comment: "" });
    setShowForm(false);
  };

  if (!product) return <div className="h-screen flex items-center justify-center uppercase tracking-[0.3em] text-[11px]">Product Not Found</div>;

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-12 font-sans mt-24 md:mt-16">
      <BackButton />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* LEFT: GALLERY */}
        <div className="lg:col-span-8 space-y-4">
          {product.gallery?.map((img, index) => (
            <motion.div key={index} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="aspect-[3/4] bg-[#F9F9F9] overflow-hidden">
              <img src={img} alt={product.name} className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>

        {/* RIGHT: INFO PANEL */}
        <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
          <div className="mb-10">
            <div className="flex justify-between items-start mb-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">{product.category}</p>
              <div className="flex items-center gap-1">
                <Star size={10} className="fill-black" />
                <span className="text-[10px] font-bold tracking-widest">{getAverageRating()}</span>
              </div>
            </div>
            <h1 className="text-[24px] font-medium tracking-tight text-[#1a1a1a] mb-2">{product.name}</h1>
            <div className="flex gap-3 items-center">
               <p className="text-[18px] font-light">${product.price}</p>
               {product.onSale && <p className="text-[14px] text-gray-300 line-through">${product.originalPrice}</p>}
            </div>
          </div>

          <div className="space-y-8">
            {/* COLORS */}
            {product.colors && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-gray-400">Color — {selectedColor}</p>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button key={color.name} onClick={() => setSelectedColor(color.name)} className={`w-7 h-7 rounded-full border p-0.5 transition-all ${selectedColor === color.name ? "border-black" : "border-transparent"}`}>
                      <div className="w-full h-full rounded-full" style={{ backgroundColor: color.hex }} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* SIZES */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-gray-400">Select Size</p>
              <div className="grid grid-cols-5 gap-2">
                {["XS", "S", "M", "L", "XL"].map((size) => (
                  <button key={size} onClick={() => setSelectedSize(size)} className={`py-3 text-[11px] border transition-all ${selectedSize === size ? "bg-black text-white border-black" : "border-gray-200 hover:border-black"}`}>
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* BUTTONS */}
            <div className="space-y-3 pt-4">
              <button onClick={() => { setIsAdding(true); addToCart({...product, selectedColor, selectedSize}); setTimeout(()=>setIsAdding(false), 1500); }} disabled={isAdding} className="w-full bg-black text-white py-5 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#333] transition-all flex items-center justify-center gap-2">
                {isAdding ? <><Check size={16} /> Added to Bag</> : "Add to Bag"}
              </button>
              <button onClick={() => toggleWishlist(product)} className="w-full border border-gray-200 py-5 text-[11px] font-bold uppercase tracking-[0.2em] hover:border-black transition-colors">
                {isInWishlist(product.id) ? "Saved to Wishlist" : "Add to Wishlist"}
              </button>
            </div>

            {/* SPECS & DETAILS */}
            <div className="grid grid-cols-2 gap-y-6 pt-10 border-t border-gray-100">
                <div><p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1">Material</p><p className="text-[11px]">{product.specs?.material || "Premium Material"}</p></div>
                <div><p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1">Origin</p><p className="text-[11px]">{product.specs?.origin || "Imported"}</p></div>
            </div>
            <div className="pt-6 border-t border-gray-100">
                <details className="group py-5" open>
                  <summary className="flex justify-between items-center cursor-pointer list-none text-[11px] font-bold uppercase tracking-[0.2em]">Details <ChevronDown size={14} className="group-open:rotate-180 transition-transform" /></summary>
                  <div className="mt-4 text-[13px] text-gray-500 leading-relaxed font-light">{product.description}</div>
                </details>
            </div>
          </div>
        </div>
      </div>

      {/* REVIEWS */}
      <section className="mt-32 pt-24 border-t border-gray-100 max-w-4xl mx-auto px-4">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.4em] mb-4">Guest Reviews</h2>
          <button onClick={() => setShowForm(!showForm)} className="text-[10px] uppercase tracking-widest underline underline-offset-8 hover:text-gray-400 transition-colors">
            {showForm ? "Cancel" : "Write a Review"}
          </button>
        </div>

        {showForm && (
          <motion.form initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleReviewSubmit} className="mb-20 bg-[#F9F9F9] p-8 rounded-sm">
            <div className="mb-6">
              <p className="text-[10px] font-bold uppercase tracking-widest mb-3">Rating</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button key={num} type="button" onClick={() => setNewReview({ ...newReview, rating: num })}>
                    <Star size={14} className={num <= newReview.rating ? "fill-black" : "text-gray-300"} />
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <p className="text-[10px] font-bold uppercase tracking-widest mb-3">Your Comment</p>
              <textarea required rows="4" value={newReview.comment} onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })} className="w-full bg-white border border-gray-100 p-4 text-[13px] focus:outline-none focus:border-black transition-colors" placeholder="Share your thoughts..."/>
            </div>
            <button type="submit" className="bg-black text-white px-8 py-3 text-[10px] font-bold uppercase tracking-widest">Submit Review</button>
          </motion.form>
        )}

        <div className="space-y-12">
          {allReviews.map((rev) => (
            <div key={rev.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-12 border-b border-gray-50 last:border-0">
              <div className="col-span-1">
                <p className="text-[11px] font-bold uppercase tracking-widest">{rev.user}</p>
                <p className="text-[9px] text-gray-400 uppercase mt-1">{rev.date}</p>
              </div>
              <div className="col-span-3">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (<Star key={i} size={10} className={i < rev.rating ? "fill-black" : "text-gray-200"} />))}
                </div>
                <p className="text-[13px] leading-relaxed text-gray-600 font-light italic">"{rev.comment}"</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RECENTLY VIEWED */}
      {recentProducts.length > 1 && (
        <section className="mt-32 border-t border-gray-100 pt-24">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.4em] mb-16 text-center">Recently Viewed</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {recentProducts.filter(p => p.id !== product.id).map((item) => (<ProductCard key={item.id} product={item} />))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ProductDetails;