import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import BackButton from "../Components/BackButton";
import { useAuth } from "../Context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();
  const { login, resetPassword } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");
    try {
      await login(email, password);
      navigate("/profile");
    } catch (error) {
      setErrorMsg(error.message === "Invalid login credentials" ? "Incorrect email or password." : error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) return setErrorMsg("Enter your email to reset password.");
    setErrorMsg("");
    try {
      await resetPassword(email);
      setSuccessMsg("Reset link sent to your inbox.");
    } catch (error) {
      setErrorMsg(error.message);
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
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-2">Welcome Back</p>
          <h1 className="text-2xl font-light tracking-tight italic">Sign in to Livity</h1>
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

          <div className="space-y-2">
            <div className="relative">
              <input
                required
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-[9px] uppercase tracking-widest text-gray-400 hover:text-black"
              >
                Forgot Password?
              </button>
            </div>
          </div>

          <AnimatePresence>
            {errorMsg && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[11px] text-red-500 text-center">{errorMsg}</motion.p>}
            {successMsg && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[11px] text-green-600 text-center">{successMsg}</motion.p>}
          </AnimatePresence>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-black text-white py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-all ${isSubmitting ? "opacity-50" : "hover:bg-gray-900"}`}
          >
            {isSubmitting ? "Processing..." : "Sign In"}
          </button>
        </form>

        <p className="text-center mt-8 text-[12px] text-gray-500 font-light">
          New here? <Link to="/signup" className="text-black underline underline-offset-4 font-medium">Create account</Link>
        </p>
      </motion.div>
    </div>
  );
}