import { useState, useEffect } from "react";

export const useRecentlyViewed = () => {
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("livity_recent");
    if (saved) setRecentProducts(JSON.parse(saved));
  }, []);

  const addToRecent = (product) => {
    setRecentProducts((prev) => {
      // Filter out the current product if it exists to avoid duplicates
      const filtered = prev.filter((p) => p.id !== product.id);
      // Add the new product to the front and limit to 4 items
      const updated = [product, ...filtered].slice(0, 4);
      localStorage.setItem("livity_recent", JSON.stringify(updated));
      return updated;
    });
  };

  return { recentProducts, addToRecent };
};