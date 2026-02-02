import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "../Components/ProductCard";
// Import your local data
import { products as allProducts } from "../data/Product";

function NewArrivals() {
  // Use useMemo to sort and slice the products locally
  const products = useMemo(() => {
    // We sort by ID descending (highest IDs first) and take the top 8
    return [...allProducts]
      .sort((a, b) => b.id - a.id)
      .slice(0, 8);
  }, []);

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-10 font-sans mt-20">
      <header className="mb-16">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-2">
          The Latest
        </p>
        <h1 className="text-3xl font-light tracking-tight">New Arrivals</h1>
      </header>

      {/* No loading state needed - local data is instant! */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12">
        <AnimatePresence>
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {products.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-gray-400 text-[11px] uppercase tracking-widest">
            No new arrivals at this moment.
          </p>
        </div>
      )}
    </div>
  );
}

export default NewArrivals;