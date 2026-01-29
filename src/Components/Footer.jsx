import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Animation Variants
const footerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const footerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};

function Footer() {
  // Helper to ensure user starts at the top of the page on link click
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.footer 
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={footerContainer}
      className="w-full bg-[#F9F9F9] border-t border-gray-100 pt-16 pb-8 px-6 md:px-10 font-sans"
    >
      <div className="max-w-[1440px] mx-auto">
        
        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* CONTACT US */}
          <motion.div variants={footerItem}>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6 text-gray-400">Contact Us</h4>
            <ul className="space-y-4 text-[13px] font-medium text-[#1a1a1a]">
              <li>
                <a href="tel:+2349027086472" className="hover:opacity-60 transition-opacity tracking-widest">
                  +234 902 708 6472
                </a>
              </li>
              <li>
                <a href="mailto:support@livity.com" className="hover:opacity-60 transition-opacity">
                  Email Us
                </a>
              </li>
              <li className="text-gray-500 font-normal">Mon–Fri 9am–3pm PT</li>
            </ul>
          </motion.div>

          {/* CUSTOMERS */}
          <motion.div variants={footerItem}>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6 text-gray-400">Customers</h4>
            <ul className="space-y-4 text-[13px] font-medium text-[#1a1a1a]">
              {[
                { name: "Start a Return", path: "/returns" },
                { name: "Return Policy", path: "/returns" },
                { name: "FAQ", path: "/faq" },
                { name: "Track Order", path: "/track-order" }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    onClick={scrollToTop} 
                    className="hover:opacity-60 transition-opacity"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* COMPANY */}
          <motion.div variants={footerItem}>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6 text-gray-400">Company</h4>
            <ul className="space-y-4 text-[13px] font-medium text-[#1a1a1a]">
              {[
                { name: "About Us", path: "/story" },
                { name: "Sustainability", path: "/care" },
                { name: "Careers", path: "/careers" },
                { name: "Privacy Policy", path: "/privacy" },
                { name: "Terms", path: "/terms" }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    onClick={scrollToTop} 
                    className="hover:opacity-60 transition-opacity"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* NEWSLETTER */}
          <motion.div variants={footerItem} className="flex flex-col">
            <h4 className="text-[13px] font-bold text-[#1a1a1a] mb-6 uppercase tracking-wider">Join our newsletter</h4>
            <div className="relative mb-4">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full bg-white border border-gray-200 px-4 py-3 text-[13px] outline-none focus:border-black transition-colors"
              />
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed mb-6">
              By signing up, you agree to our <Link to="/privacy" className="underline underline-offset-2 text-black">Privacy Policy</Link> and <Link to="/terms" className="underline underline-offset-2 text-black">Terms of Service</Link>.
            </p>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-black text-white text-[11px] font-bold uppercase tracking-[0.2em] py-4 px-8 self-start transition-colors hover:bg-[#333]"
            >
              Subscribe
            </motion.button>
          </motion.div>

        </div>

        {/* COPYRIGHT */}
        <motion.div 
          variants={footerItem}
          className="pt-8 border-t border-gray-200/50 flex justify-between items-center"
        >
          <span className="text-[10px] font-medium tracking-widest text-gray-400 uppercase">
            © {new Date().getFullYear()} Livity. Handcrafted for longevity.
          </span>
        </motion.div>
      </div>
    </motion.footer>
  );
}

export default Footer;