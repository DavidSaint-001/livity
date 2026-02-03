import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext"; // 1. Import Auth Hook

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Track password
  const navigate = useNavigate();
  const { login } = useAuth(); // 2. Get the login function from context

  const handleLogin = (e) => {
    e.preventDefault();
    
    // 3. Create the user object
    const userData = { 
      email: email, 
      name: email.split('@')[0] 
    };
    
    // 4. Use the Context Login (it handles localStorage for you automatically)
    login(userData);
    
    // 5. Redirect to profile - No reload needed!
    navigate("/profile");
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-6 bg-white font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="w-full max-w-md"
      >
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
            className="w-full border-b border-gray-200 py-3 text-[13px] outline-none focus:border-black transition-colors bg-transparent" 
          />
          <input 
            required
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-b border-gray-200 py-3 text-[13px] outline-none focus:border-black transition-colors bg-transparent" 
          />
          
          <button 
            type="submit" 
            className="w-full bg-black text-white py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-all mt-4"
          >
            Sign In
          </button>
        </form>

        <p className="text-center mt-8 text-[12px] text-gray-500 font-light">
          Don't have an account? <Link to="/signup" className="text-black underline underline-offset-4 font-medium">Register</Link>
        </p>
      </motion.div>
    </div>
  );
}