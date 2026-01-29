import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-6 bg-white">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-2">Join Livity</p>
          <h1 className="text-2xl font-light tracking-tight">Create your account</h1>
        </div>

        <form className="space-y-6">
          <input 
            type="text" placeholder="Full Name" 
            className="w-full border-b border-gray-200 py-3 text-[13px] outline-none focus:border-black transition-colors"
          />
          <input 
            type="email" placeholder="Email Address" 
            className="w-full border-b border-gray-200 py-3 text-[13px] outline-none focus:border-black transition-colors"
          />
          <input 
            type="password" placeholder="Password" 
            className="w-full border-b border-gray-200 py-3 text-[13px] outline-none focus:border-black transition-colors"
          />
          <button className="w-full bg-black text-white py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-all mt-4">
            Create Account
          </button>
        </form>

        <p className="text-center mt-8 text-[12px] text-gray-500 font-light">
          Already have an account? <Link to="/login" className="text-black underline underline-offset-4">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}