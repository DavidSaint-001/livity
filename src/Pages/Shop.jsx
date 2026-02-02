import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import FilterSidebar from "../Components/FilterSidebar";
import ProductCard from "../Components/ProductCard";
// IMPORT YOUR LOCAL DATA HERE
import { products as dbProducts } from "../data/Product";

function Shop() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchParams] = useSearchParams();
  
  // UI States
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);

  // Get filter and search from URL
  const categoryFilter = searchParams.get("filter");
  const searchTerm = searchParams.get("search");

  // CLIENT-SIDE FILTERING & SEARCH
  const filteredProducts = useMemo(() => {
    let filtered = [...dbProducts];

    // 1. Filter by Search Term (now handled locally)
    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 2. Filter by Category
    if (categoryFilter) {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    // 3. Filter by Colors
    if (selectedColors.length > 0) {
      filtered = filtered.filter((p) =>
        p.colors && p.colors.some((c) => selectedColors.includes(c.name))
      );
    }

    // 4. Filter by Price Range
    if (selectedPrices.length > 0) {
      filtered = filtered.filter((p) => {
        return selectedPrices.some((range) => {
          if (range === "under $100") return p.price < 100;
          if (range === "$100 - $250") return p.price >= 100 && p.price <= 250;
          if (range === "$250 - $500") return p.price >= 250 && p.price <= 500;
          if (range === "over $500") return p.price > 500;
          return false;
        });
      });
    }

    return filtered;
  }, [categoryFilter, searchTerm, selectedColors, selectedPrices]);

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-10 font-sans mt-20">
      <header className="mb-10">
        <h1 className="text-2xl font-light tracking-tight mb-2">
          {searchTerm ? `Results for "${searchTerm}"` : (categoryFilter ? categoryFilter : "Shop All")}
        </h1>
        <p className="text-[11px] text-gray-400 uppercase tracking-widest">
          {filteredProducts.length} Products
        </p>
      </header>

      <div className="flex items-center gap-8 text-[12px] font-medium uppercase tracking-wider mb-10">
        <button className="flex items-center gap-2 hover:opacity-50 transition-opacity">
          Sort <ChevronDown size={14} />
        </button>

        <button
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center gap-2 hover:opacity-50 transition-opacity"
        >
          Filter <SlidersHorizontal size={14} />
        </button>

        {(selectedColors.length > 0 || selectedPrices.length > 0) && (
          <button
            onClick={() => {
              setSelectedColors([]);
              setSelectedPrices([]);
            }}
            className="flex items-center gap-2 hover:opacity-50 transition-opacity text-red-500"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* No more loading spinner needed for local data */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center border border-dashed border-gray-100">
            <p className="text-gray-400 uppercase tracking-widest text-[11px]">
              No products found matching your request.
            </p>
          </div>
        )}
      </div>

      <FilterSidebar 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)}
        selectedColors={selectedColors}
        onColorChange={setSelectedColors}
        selectedPrices={selectedPrices}
        onPriceChange={setSelectedPrices}
      />
    </div>
  );
}

export default Shop;