import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, Tag } from "lucide-react";
import ProductCard from "../Components/ProductCard";

function Sales() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSales = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:3000/products");
        const data = await res.json();
        // Filters items that have onSale: true
        const saleItems = data.filter(p => p.onSale === true);
        setProducts(saleItems);
      } catch (err) {
        console.error("Failed to fetch sales", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSales();
  }, []);

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-10 font-sans mt-20">
      <header className="mb-16 flex items-end justify-between border-b border-gray-100 pb-8">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-500 mb-2">Special Offers</p>
          <h1 className="text-3xl font-light tracking-tight">Archive Sale</h1>
        </div>
        <div className="flex items-center gap-2 text-gray-400 text-[11px] uppercase tracking-widest">
          <Tag size={14} />
          <span>Limited Time Only</span>
        </div>
      </header>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-gray-200" size={32} /></div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-40 text-center">
          <p className="text-gray-400 text-[11px] uppercase tracking-widest">No active sales at this moment.</p>
          <p className="text-[10px] text-gray-300 mt-2 italic">Check back soon for seasonal updates.</p>
        </div>
      )}
    </div>
  );
}

export default Sales;