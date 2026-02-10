import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import BackButton from "../Components/BackButton";
import { useAuth } from "../Context/AuthContext";

export default function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  // SUPABASE: Added loading state
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const navigate = useNavigate();
  const { signup } = useAuth();

  // SUPABASE: Changed to async
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // SUPABASE: Await the signup process
      // This sends email, password, and name (metadata) to the cloud
      await signup(formData.email, formData.password, formData.name);

      // Redirect to profile or home
      navigate("/profile");
    } catch (error) {
      // SUPABASE: Catches things like "Password too short" or "User already exists"
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-6 bg-white font-sans">
      <BackButton />
      <motion.div
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-2">Join Livity</p>
          <h1 className="text-2xl font-light tracking-tight">Create your account</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input 
            required
            type="text" 
            placeholder="Full Name" 
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border-b border-gray-200 py-3 text-[13px] outline-none focus:border-black transition-colors bg-transparent"
          />
          <input 
            required
            type="email" 
            placeholder="Email Address" 
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full border-b border-gray-200 py-3 text-[13px] outline-none focus:border-black transition-colors bg-transparent"
          />
          <input 
            required
            type="password" 
            placeholder="Password" 
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full border-b border-gray-200 py-3 text-[13px] outline-none focus:border-black transition-colors bg-transparent"
          />
          
          <button 
            type="submit"
            disabled={isSubmitting} // SUPABASE: Prevent multiple clicks
            className={`w-full bg-black text-white py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-all mt-4 ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"}`}
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-8 text-[12px] text-gray-500 font-light">
          Already have an account? <Link to="/login" className="text-black underline underline-offset-4 font-medium">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}