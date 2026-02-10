import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Send, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BackButton from "../Components/BackButton";
import { useAuth } from "../Context/AuthContext"; // Import Auth
import { supabase } from "../supabaseClient"; // Import Supabase

export default function CustomDesign() {
  const navigate = useNavigate();
  const { user } = useAuth(); // Get user session
  
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: user?.user_metadata?.display_name || "",
    email: user?.email || "",
    category: "Select Category",
    brief: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("custom_designs")
        .insert([
          {
            user_id: user?.id || null, // Link to user if logged in
            full_name: formData.fullName,
            email: formData.email,
            design_category: formData.category,
            design_description: formData.brief,
            status: "pending",
          },
        ]);

      if (error) throw error;
      setSubmitted(true);
    } catch (error) {
      alert("Error submitting inquiry: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md"
        >
          <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-8">
            <Send size={24} className="text-white" />
          </div>
          <h2 className="text-2xl font-light tracking-tight mb-4 uppercase">Inquiry Received</h2>
          <p className="text-gray-500 text-[13px] leading-relaxed mb-10 uppercase tracking-widest">
            Your vision has been shared with our lead artisan. We will contact you within 48 hours to begin the consultation.
          </p>
          <button 
            onClick={() => navigate("/")}
            className="text-[10px] font-bold uppercase tracking-[0.3em] border-b border-black pb-2 hover:opacity-50 transition-opacity"
          >
            Return to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-40 pb-24 px-6 md:px-10 max-w-[1000px] mx-auto font-sans">
      <BackButton />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* LEFT: CONTENT */}
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-light tracking-tighter mb-6 uppercase">
              Bespoke <br /> Inquiry
            </h1>
            <p className="text-gray-500 text-[13px] leading-relaxed uppercase tracking-[0.2em] mb-12">
              From unique leather textures to custom-fit silhouettes, our atelier brings your specific concepts to life. Fill out the brief below to start the conversation.
            </p>
            
            <div className="space-y-8 hidden lg:block">
              <div className="flex gap-4 items-start">
                <span className="text-[10px] font-bold text-gray-300">01</span>
                <p className="text-[11px] font-medium uppercase tracking-widest">Initial Consultation</p>
              </div>
              <div className="flex gap-4 items-start">
                <span className="text-[10px] font-bold text-gray-300">02</span>
                <p className="text-[11px] font-medium uppercase tracking-widest text-gray-400">Material Selection</p>
              </div>
              <div className="flex gap-4 items-start">
                <span className="text-[10px] font-bold text-gray-300">03</span>
                <p className="text-[11px] font-medium uppercase tracking-widest text-gray-400">Crafting & Delivery</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT: FORM */}
        <div className="lg:col-span-7">
          <motion.form 
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-1">
                <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">Full Name</label>
                <input 
                  required 
                  type="text" 
                  className="checkout-input" 
                  placeholder="REQUIRED" 
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">Email Address</label>
                <input 
                  required 
                  type="email" 
                  className="checkout-input" 
                  placeholder="REQUIRED" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">Design Category</label>
              <select 
                className="checkout-input bg-transparent cursor-pointer"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option disabled>Select Category</option>
                <option>Leather Goods & Bags</option>
                <option>Outerwear & Tailoring</option>
                <option>Footwear</option>
                <option>Home Objects</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">The Design Brief</label>
              <textarea 
                required
                className="w-full border-b border-gray-200 py-4 text-[13px] font-light focus:outline-none focus:border-black transition-colors min-h-[150px] resize-none"
                placeholder="DESCRIBE YOUR VISION, MATERIALS, AND ANY SPECIFIC REQUIREMENTS..."
                value={formData.brief}
                onChange={(e) => setFormData({...formData, brief: e.target.value})}
              />
            </div>

            <div className="p-8 border border-dashed border-gray-200 flex flex-col items-center justify-center text-center cursor-pointer hover:border-black transition-colors group">
              <Camera size={20} className="text-gray-300 group-hover:text-black mb-2" />
              <p className="text-[10px] font-bold uppercase tracking-widest">Upload Inspiration / Sketches</p>
              <p className="text-[9px] text-gray-400 mt-1">PNG, JPG OR PDF (MAX 10MB)</p>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-6 flex items-center justify-center gap-3 group transition-all hover:bg-zinc-900 shadow-xl disabled:opacity-50"
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.4em]">
                {loading ? "Sending..." : "Send Inquiry"}
              </span>
              {!loading && <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </motion.form>
        </div>

      </div>
    </div>
  );
}