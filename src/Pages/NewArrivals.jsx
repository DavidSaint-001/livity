import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import ProductCard from "../Components/ProductCard";

function NewArrivals() {
  const [products, setProducts] = useState([]); // Fixed: matching variable names
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNew = async () => {
      setLoading(true);
      try {
        // FIXED: URL changed to http and port 3000
        const res = await fetch("http://localhost:3000/products");
        const data = await res.json();
        
        // Sorting by ID descending
        const sorted = data.sort((a, b) => parseInt(b.id) - parseInt(a.id)).slice(0, 8);
        setProducts(sorted);
      } catch (err) {
        console.error("Failed to fetch new arrivals", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNew();
  }, []);

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-10 font-sans mt-20">
      <header className="mb-16">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-2">The Latest</p>
        <h1 className="text-3xl font-light tracking-tight">New Arrivals</h1>
      </header>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-gray-200" size={32} />
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12">
          <AnimatePresence>
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }} // FIXED: spelling of opacity
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* FIXED: passed product directly, not double-braced */}
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export default NewArrivals;