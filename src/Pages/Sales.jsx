import { useMemo } from "react";
import { motion } from "framer-motion";
import { Tag } from "lucide-react";
import BackButton from "../Components/BackButton";
import ProductCard from "@/Components/ProductCard";
// Import from your local data file
import { products as allProducts } from "../data/Product";

function Sales() {
  // Use useMemo to filter the products locally
  const saleProducts = useMemo(() => {
    return allProducts.filter(p => p.onSale === true);
  }, []);

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-10 font-sans mt-20">
      <BackButton />
      <header className="mb-16 flex items-end justify-between border-b border-gray-100 pb-8">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-500 mb-2">
            Special Offers
          </p>
          <h1 className="text-3xl font-light tracking-tight">Archive Sale</h1>
        </div>
        <div className="flex items-center gap-2 text-gray-400 text-[11px] uppercase tracking-widest">
          <Tag size={14} />
          <span>Limited Time Only</span>
        </div>
      </header>

      {/* No more loading spinner needed! */}
      {saleProducts.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12">
          {saleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-40 text-center">
          <p className="text-gray-400 text-[11px] uppercase tracking-widest">
            No active sales at this moment.
          </p>
          <p className="text-[10px] text-gray-300 mt-2 italic">
            Check back soon for seasonal updates.
          </p>
        </div>
      )}
    </div>
  );
}

export default Sales;