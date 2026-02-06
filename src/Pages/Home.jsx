/* eslint-disable no-irregular-whitespace */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import ProductCard from "@/Components/ProductCard";

// ASSETS
import heroImage from "../assets/images/hero bg.png";
import hero2 from "../assets/images/ai image.png";
import hero3 from "../assets/images/brown.png";
import hero4 from "../assets/images/hero 3.png";

import img1 from "../assets/images/img 3.png"; 
import img2 from "../assets/images/img 2.png";
import img3 from "../assets/images/img 1.png";
import tote from "../assets/images/product 4.png";
import phonebag from "../assets/images/product 3.png";
import coat from "../assets/images/product 1.png";
import wool from "../assets/images/product 2.png";
import cap from "../assets/images/beanie.png";
import banner1 from "../assets/images/banner 1.png";
import banner2 from "../assets/images/banner 2.png";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

function Home() {
  const heroImages = [heroImage, hero4, hero2, hero3];
  const [currentHero, setCurrentHero] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const products = [
    { id: "1", name: "Classic Tote Bag", price: 240, mainImage: tote, colors: [{name: "Black", hex: "#000"}] },
    { id: "2", name: "Convertible Phone Bag", price: 180, mainImage: phonebag, colors: [{name: "Tan", hex: "#D2B48C"}] },
    { id: "3", name: "Wool Cashmere Coat", price: 890, mainImage: wool, colors: [{name: "Camel", hex: "#C19A6B"}] },
    { id: "4", name: "Beanie", price: 45, mainImage: cap, colors: [{name: "Grey", hex: "#808080"}] },
    { id: "5", name: "Cropped Cardigan", price: 245, mainImage: coat, colors: [{name: "Cream", hex: "#FFFDD0"}] },
  ];

  return (
    <div className="w-full bg-white font-sans text-[#1a1a1a] overflow-x-hidden">
      
      {/* HERO SECTION - TABLET OPTIMIZED */}
      <section className="relative w-full h-[100svh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentHero}
            src={heroImages[currentHero]}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            // 'object-top' ensures heads aren't cut off on tall tablet screens
            className="absolute inset-0 w-full h-full object-cover object-top sm:object-center"
          />
        </AnimatePresence>
        
        <div className="absolute inset-0 bg-black/15 z-[1]" />
        
        <div className="relative z-10 max-w-7xl mx-auto h-full px-6 md:px-12 flex flex-col justify-center md:justify-end pb-12 md:pb-32">
          <motion.div variants={container} initial="hidden" animate="show" className="max-w-xl">
            <motion.div variants={item} className="mb-8">
              <h1 className="text-white text-4xl md:text-6xl font-normal leading-tight tracking-tight mb-2">
                Elevate Your Style
              </h1>
              <p className="text-white text-lg md:text-2xl font-light opacity-90 leading-snug">
                Timeless Fashion, <br className="md:hidden" /> Sustainable Choices
              </p>
            </motion.div>
            <motion.div variants={item}>
              <Link 
                to="/shop" 
                className="inline-block bg-white text-black px-10 py-4 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-all duration-300 shadow-xl"
              >
                Shop Now
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-6 md:left-12 z-20 flex gap-2">
          {heroImages.map((_, i) => (
            <div 
              key={i} 
              className={`h-[1px] w-8 transition-all duration-500 ${i === currentHero ? "bg-white" : "bg-white/30"}`} 
            />
          ))}
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 text-left">
        <p className="text-[15px] md:text-lg leading-relaxed max-w-xl text-gray-800 font-medium">
          Elevate your lifestyle with a more intelligent, superior wardrobe. <br className="hidden md:block"/>
          Our range is crafted sustainably with longevity in mind.
        </p>
      </section>

      {/* CATEGORY GRID - RESPONSIVE FOR TABLET */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {[
          { label: "New Arrivals", img: img1 },
          { label: "The Casual Edit", img: img2 },
          { label: "Best-Sellers", img: img3 }
        ].map((cat, i) => (
          <Link to="/shop" key={i} className="relative aspect-[3/4] overflow-hidden group cursor-pointer">
            <img 
              src={cat.img} 
              alt={cat.label} 
              className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors" />
            <div className="absolute bottom-6 left-6">
              <span className="text-white text-[10px] font-bold border-b border-white pb-1 tracking-[0.15em] uppercase">
                {cat.label}
              </span>
            </div>
          </Link>
        ))}
      </section>

      {/* PRODUCT GRID - IMPROVED TABLET WIDTHS */}
      <section className="max-w-7xl mx-auto mb-24 overflow-hidden">
        <h2 className="px-6 md:px-12 text-[10px] md:text-xs uppercase tracking-[0.3em] mb-12 text-gray-400 font-bold">
          What to Wear Now
        </h2>
        
        <div className="flex flex-nowrap overflow-x-auto gap-x-5 px-6 md:px-12 md:grid md:grid-cols-5 md:overflow-x-visible no-scrollbar">
          {products.map((prod) => (
            <div key={prod.id} className="shrink-0 w-[75%] sm:w-[45%] md:w-full">
              <ProductCard product={prod} />
            </div>
          ))}
          <div className="shrink-0 w-4 md:hidden"></div>
        </div>
      </section>

      {/* FEATURE DUO */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 gap-6 pb-24">
        <div className="relative aspect-[4/5] overflow-hidden group">
          <img src={banner1} className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105" alt="The Smart Chic" />
          <div className="absolute bottom-8 left-8">
            <span className="text-white text-[10px] font-bold border-b border-white pb-1 uppercase tracking-[0.2em]">The Smart Chic</span>
          </div>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden group">
          <img src={banner2} className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105" alt="Paris To Go" />
          <div className="absolute bottom-8 left-8">
            <span className="text-white text-[10px] font-bold border-b border-white pb-1 uppercase tracking-[0.2em]">Paris To Go</span>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;