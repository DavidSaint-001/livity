import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import BackButton from "../Components/BackButton";
import { useAuth } from "../Context/AuthContext";

export default function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setIsSubmitting(true);
    try {
      await signup(formData.email, formData.password, formData.name);
      navigate("/profile");
    } catch (error) {
      setErrorMsg(error.message.includes("already registered") ? "This email is already taken." : error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white font-sans overflow-hidden">
      <BackButton />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md px-6"
      >
        <div className="text-center mb-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-2">Join the Collective</p>
          <h1 className="text-2xl font-light tracking-tight italic">Create Account</h1>
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
          <div className="relative">
            <input
              required
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full border-b border-gray-200 py-3 text-[13px] outline-none focus:border-black transition-colors bg-transparent"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <AnimatePresence>
            {errorMsg && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[11px] text-red-500 text-center">{errorMsg}</motion.p>}
          </AnimatePresence>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-black text-white py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-all ${isSubmitting ? "opacity-50" : "hover:bg-gray-900"}`}
          >
            {isSubmitting ? "Creating..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-8 text-[12px] text-gray-500 font-light">
          Member already? <Link to="/login" className="text-black underline underline-offset-4 font-medium">Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
}