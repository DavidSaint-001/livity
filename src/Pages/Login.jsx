import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // 1. Create a dummy user object
    const user = { email: email, name: email.split('@')[0] };
    
    // 2. Save to localStorage
    localStorage.setItem("livity_user", JSON.stringify(user));
    
    // 3. Redirect to profile and refresh to update Navbar
    navigate("/profile");
    window.location.reload(); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-6 bg-white font-sans">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-2">Welcome Back</p>
          <h1 className="text-2xl font-light tracking-tight">Sign in to your account</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <input 
            required
            type="email" 
            placeholder="Email Address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-b border-gray-200 py-3 text-[13px] outline-none focus:border-black transition-colors" 
          />
          <input 
            required
            type="password" 
            placeholder="Password" 
            className="w-full border-b border-gray-200 py-3 text-[13px] outline-none focus:border-black transition-colors" 
          />
          <button type="submit" className="w-full bg-black text-white py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-all">
            Sign In
          </button>
        </form>

        <p className="text-center mt-8 text-[12px] text-gray-500 font-light">
          Don't have an account? <Link to="/signup" className="text-black underline underline-offset-4">Register</Link>
        </p>
      </motion.div>
    </div>
  );
}