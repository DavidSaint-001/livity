import { useAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import BackButton from "../Components/BackButton";

export default function Profile() {
  const { user, loading, logout } = useAuth();

  // 1. Handle the "Waiting" phase
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white font-sans text-[10px] uppercase tracking-[0.3em]">
        Livity is Loading...
      </div>
    );
  }

  // 2. Handle the "Logged Out" phase
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 font-sans">
        <div className="text-center space-y-6">
          <p className="text-[12px] uppercase tracking-[0.2em] text-gray-400">
            Authentication Required
          </p>
          <h2 className="text-xl font-light">Please log in to view your profile.</h2>
          <Link 
            to="/login" 
            className="inline-block bg-black text-white px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em]"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  // 3. Handle the "Logged In" phase (The actual Profile)
  return (
    <div className="min-h-screen pt-32 px-6 md:px-20 bg-white font-sans">
      <BackButton />
      <div className="max-w-4xl mx-auto mt-10">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-2">Member Account</p>
        <h1 className="text-4xl font-light mb-12 italic">
          Welcome back, {user.user_metadata?.display_name || "Livity Guest"}
        </h1>

        <div className="grid md:grid-cols-2 gap-12 border-t border-gray-100 pt-10">
          <div className="space-y-4">
            <h3 className="text-[11px] font-bold uppercase tracking-widest">Profile Details</h3>
            <p className="text-sm text-gray-600">Email: {user.email}</p>
            <button 
              onClick={logout}
              className="text-[11px] uppercase tracking-widest text-red-500 underline underline-offset-4 pt-4"
            >
              Sign Out
            </button>
          </div>
          
          <div className="space-y-4">
             <h3 className="text-[11px] font-bold uppercase tracking-widest">Order History</h3>
             <p className="text-xs text-gray-400 italic">No bespoke orders found yet.</p>
          </div>
        </div>
      </div>
    </div>
  );
}