import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import BackButton from "../Components/BackButton";

export default function Profile() {
  const navigate = useNavigate();
  
  // Get user data from storage
  const user = JSON.parse(localStorage.getItem("livity_user"));

  const handleLogout = () => {
    localStorage.removeItem("livity_user");
    navigate("/login");
    window.location.reload();
  };

  if (!user) {
    return (
      <div className="pt-40 text-center">
        <p className="mb-4">Please log in to view your profile.</p>
        <button onClick={() => navigate("/login")} className="underline">Go to Login</button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 md:px-10 max-w-5xl mx-auto font-sans">
      <BackButton />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-1 space-y-6">
          <h1 className="text-xl font-medium tracking-tight">Hello, {user.name}</h1>
          <nav className="flex flex-col space-y-4 text-[13px] text-gray-500 uppercase tracking-widest">
            <button className="text-black font-bold text-left">Order History</button>
            <button className="hover:text-black text-left">Settings</button>
            <button onClick={handleLogout} className="hover:text-black text-left text-red-500">Log Out</button>
          </nav>
        </div>

        <div className="lg:col-span-3">
          <div className="border border-gray-100 p-10 text-center bg-[#F9F9F9]">
            <p className="text-[13px] text-gray-400 mb-6 font-light italic text-pretty">
                Welcome to your Livity account. Here you can track your shipments and manage your addresses.
            </p>
            <button onClick={() => navigate("/shop")} className="bg-black text-white px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em]">
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}