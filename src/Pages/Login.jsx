import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import BackButton from "../Components/BackButton";
import { useAuth } from "../Context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // SUPABASE: Added loading state to prevent double submissions
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const navigate = useNavigate();
  const { login } = useAuth();

  // SUPABASE: Changed to async to handle the cloud request
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // SUPABASE: Awaiting the real authentication check
      await login(email, password);

      // Redirect to profile
      navigate("/profile");
    } catch (error) {
      // SUPABASE: This will now show real errors (e.g., "Invalid login credentials")
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-6 bg-white font-sans">
      <BackButton/>
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
            disabled={isSubmitting} // SUPABASE: Disable button while logging in
            className={`w-full bg-black text-white py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-all mt-4 ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"}`}
          >
            {isSubmitting ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        <p className="text-center mt-8 text-[12px] text-gray-500 font-light">
          Don't have an account? <Link to="/signup" className="text-black underline underline-offset-4 font-medium">Register</Link>
        </p>
      </motion.div>
    </div>
  );
}