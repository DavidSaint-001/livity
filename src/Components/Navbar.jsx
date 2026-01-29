import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, Heart, ShoppingBag, User, Plus, Minus } from "lucide-react";

// Assets & Data
import image1 from "../assets/images/image 1.png";
import logo from "../assets/images/logo.png";
import { categories } from "../data/categories";
import { featured } from "../data/Featured";
import { collections } from "../data/Collections";

// Contexts
import { useWishlist } from "../Context/WishlistContext";
import { useCart } from "../Context/CartContext";

const menuFeaturedImg = image1;

function Navbar() {
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  const { wishlist } = useWishlist();
  const { cartItems } = useCart();

  // AUTH LOGIC: Check if user is logged in
  const isLoggedIn = localStorage.getItem("livity_user");

  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-white border-b border-gray-100 sticky top-0 z-50 font-sans"
        onMouseLeave={() => setIsShopOpen(false)}
      >
        {/* Top Announcement Bar */}
        <div className="w-full bg-black text-white text-[10px] py-2 text-center uppercase tracking-widest">
          Complimentary U.S. No-Rush Shipping on orders of $95 or more. Shop now
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between relative">
          
          {/* Mobile Menu Toggle */}
          <button className="md:hidden" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={22} strokeWidth={1.5} />
          </button>

          {/* Left Side: Logo & Desktop Links */}
          <div className="hidden md:flex items-center gap-12 h-full">
            <Link to="/" className="flex items-center">
              <img 
                src={logo} 
                alt="Livity Logo" 
                className="h-10 w-auto object-contain hover:opacity-70 transition-opacity" 
              />
            </Link>
            
            <nav className="flex gap-8 text-[13px] font-medium uppercase tracking-widest h-full items-center">
              <button 
                onMouseEnter={() => setIsShopOpen(true)} 
                className="hover:opacity-50 transition-opacity py-5"
              >
                SHOP
              </button>
              <Link to="/new-arrivals" className="hover:opacity-50 transition-opacity">New Arrivals</Link>
              <Link to="/sales" className="hover:opacity-50 transition-opacity">Sales</Link>
              <Link to="/story" className="hover:opacity-50 transition-opacity">OUR-STORY</Link>
            </nav>
          </div>

          {/* Center: Mobile Logo */}
          <Link to="/" className="md:hidden flex items-center absolute left-1/2 -translate-x-1/2">
            <img 
              src={logo} 
              alt="Livity Logo" 
              className="h-8 w-auto object-contain" 
            />
          </Link>

          {/* Right Side */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6">
                <button onClick={() => setIsSearchOpen(true)}>
                    <Search size={19} strokeWidth={1.5} className="cursor-pointer hover:opacity-50" />
                </button>
                <Link to="/care" className="text-[12px] font-medium hover:opacity-50 uppercase">CARE</Link>
                
                {/* Profile Toggle */}
                <button onClick={handleProfileClick} className="hover:opacity-50 transition-opacity">
                  <User size={19} strokeWidth={1.5} className={isLoggedIn ? "text-black" : "text-gray-400"} />
                </button>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="md:hidden" onClick={() => setIsSearchOpen(true)}>
                <Search size={19} strokeWidth={1.5} />
              </button>
              
              <Link to="/wishlist" className="relative hover:opacity-50">
                <Heart size={19} strokeWidth={1.5} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1.5 -right-2 text-[9px] font-bold bg-black text-white w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <Link to="/cart" className="relative hover:opacity-50">
                <ShoppingBag size={19} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 text-[9px] font-bold bg-black text-white w-4 h-4 rounded-full flex items-center justify-center animate-in fade-in zoom-in duration-300">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Search Overlay */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute inset-0 bg-white z-[60] flex items-center px-6 md:px-10"
              >
                <form onSubmit={handleSearchSubmit} className="w-full flex items-center gap-4">
                  <Search size={20} strokeWidth={1.5} className="text-gray-400" />
                  <input 
                    autoFocus
                    type="text" 
                    placeholder="Search collections..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-lg md:text-xl font-light outline-none border-none placeholder:text-gray-300"
                  />
                  <button type="button" onClick={() => setIsSearchOpen(false)} className="p-2 hover:rotate-90 transition-transform">
                    <X size={22} strokeWidth={1} />
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mega Menu */}
        <AnimatePresence>
          {isShopOpen && !isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="hidden md:block absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-10 py-12 grid grid-cols-4 gap-8">
                <MenuColumn title="Categories" items={categories} />
                <MenuColumn title="Featured" items={featured} />
                <MenuColumn title="Collections" items={collections} />
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                  <img src={menuFeaturedImg} alt="Featured" className="w-full h-full object-cover" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileDrawer 
            close={() => setIsMobileMenuOpen(false)} 
            isLoggedIn={isLoggedIn} 
            handleProfileClick={handleProfileClick}
          />
        )}
      </AnimatePresence>
    </>
  );
}

const MenuColumn = ({ title, items }) => (
  <div>
    <h3 className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">{title}</h3>
    <ul className="space-y-4 text-[13px] font-medium">
      {items.map(item => (
        <li key={item}>
          <Link to={item === "Shop All" ? "/shop" : `/shop?filter=${item.toLowerCase()}`} className="hover:text-gray-400 transition-colors">
            {item}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const MobileDrawer = ({ close, isLoggedIn, handleProfileClick }) => {
  const [openSection, setOpenSection] = useState("Shop");
  const [activeSub, setActiveSub] = useState("");

  const mobileLinks = [
    { name: "New Arrivals", path: "/new-arrivals" },
    { name: "Sales", path: "/sales" },
    { name: "Care", path: "/care" },
    { name: "Our-Story", path: "/story" }
  ];

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close} className="fixed inset-0 bg-black/40 z-[99]" />
      <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "tween", duration: 0.3 }} className="fixed inset-y-0 left-0 w-[85%] max-w-[400px] bg-white z-[100] flex flex-col shadow-2xl">
        <div className="p-6 border-b border-gray-100 flex justify-start items-center gap-4">
          <button onClick={close}><X size={24} strokeWidth={1} /></button>
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Menu</span>
        </div>
        <div className="flex flex-col px-8 py-4 overflow-y-auto">
          
          {/* Shop Accordion */}
          <div className="border-b border-gray-100">
            <button onClick={() => setOpenSection(openSection === "Shop" ? "" : "Shop")} className="w-full py-5 flex justify-between items-center text-[13px] font-semibold uppercase tracking-[0.15em]">
              SHOP {openSection === "Shop" ? <Minus size={16} /> : <Plus size={16} />}
            </button>
            <AnimatePresence>
              {openSection === "Shop" && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pl-4 pb-4">
                  <MobileSubSection title="Categories" items={categories} isOpen={activeSub === "Categories"} toggle={() => setActiveSub(activeSub === "Categories" ? "" : "Categories")} close={close} />
                  <MobileSubSection title="Featured" items={featured} isOpen={activeSub === "Featured"} toggle={() => setActiveSub(activeSub === "Featured" ? "" : "Featured")} close={close} />
                  <MobileSubSection title="Collections" items={collections} isOpen={activeSub === "Collections"} toggle={() => setActiveSub(activeSub === "Collections" ? "" : "Collections")} close={close} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Main Mobile Links */}
          {mobileLinks.map((link) => (
            <div key={link.name} className="border-b border-gray-100">
              <Link 
                to={link.path} 
                onClick={close} 
                className="w-full py-5 flex justify-between items-center text-[13px] font-semibold uppercase tracking-[0.15em]"
              >
                {link.name} <Plus size={16} />
              </Link>
            </div>
          ))}

          {/* Profile Mobile Link */}
          <div className="border-b border-gray-100">
            <button 
              onClick={() => { handleProfileClick(); close(); }} 
              className="w-full py-5 flex justify-between items-center text-[13px] font-semibold uppercase tracking-[0.15em]"
            >
              {isLoggedIn ? "ACCOUNT" : "LOG IN"} <User size={16} />
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

const MobileSubSection = ({ title, items, isOpen, toggle, close }) => (
  <>
    <button onClick={toggle} className="w-full py-3 flex justify-between items-center text-[12px] text-gray-400 font-bold uppercase tracking-widest">
      {title} {isOpen ? <Minus size={14} /> : <Plus size={14} />}
    </button>
    {isOpen && (
      <div className="pl-6 flex flex-col gap-5 py-4 border-l border-gray-100 ml-1">
        {items.map(item => (
          <Link 
            key={item} 
            to={item === "Shop All" ? "/shop" : `/shop?filter=${item.toLowerCase()}`} 
            onClick={close}
            className="text-[13px] text-gray-600 font-medium"
          >
            {item}
          </Link>
        ))}
      </div>
    )}
  </>
);

export default Navbar;