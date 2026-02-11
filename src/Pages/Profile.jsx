import { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import BackButton from "../Components/BackButton";
import { motion } from "framer-motion";

export default function Profile() {
  const { user, loading, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [fetchingOrders, setFetchingOrders] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setOrders(data || []);
      } catch (err) {
        console.error("Error fetching orders:", err.message);
      } finally {
        setFetchingOrders(false);
      }
    }

    fetchOrders();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white font-sans text-[10px] uppercase tracking-[0.3em]">
        Livity is Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 font-sans">
        <div className="text-center space-y-6">
          <p className="text-[12px] uppercase tracking-[0.2em] text-gray-400">Authentication Required</p>
          <h2 className="text-xl font-light tracking-tight">Please log in to view your profile.</h2>
          <Link to="/login" className="inline-block bg-black text-white px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-transform hover:scale-[1.02]">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 md:px-20 bg-white font-sans">
      <BackButton />
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto mt-10"
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-2">Member Account</p>
        <h1 className="text-4xl font-light mb-12 italic tracking-tight">
          Welcome back, {user.user_metadata?.display_name || "Livity Guest"}
        </h1>

        <div className="grid md:grid-cols-2 gap-12 border-t border-gray-100 pt-10">
          {/* Account Settings Section */}
          <div className="space-y-6">
            <h3 className="text-[11px] font-bold uppercase tracking-widest">Profile Details</h3>
            <div className="space-y-1">
              <p className="text-[10px] uppercase text-gray-400">Email Address</p>
              <p className="text-sm font-light">{user.email}</p>
            </div>
            <button 
              onClick={logout}
              className="text-[11px] uppercase tracking-widest text-red-500 underline underline-offset-8 pt-4 hover:text-red-700 transition-colors"
            >
              Sign Out
            </button>
          </div>
          
          {/* Order History Section */}
          <div className="space-y-8">
            <h3 className="text-[11px] font-bold uppercase tracking-widest">Order History</h3>
            
            {fetchingOrders ? (
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 animate-pulse">Fetching history...</p>
            ) : orders.length > 0 ? (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="group border-b border-gray-50 pb-6 last:border-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-tighter text-gray-400">
                          {new Date(order.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                        <p className="text-[11px] uppercase tracking-widest font-medium">Order #{order.id.slice(0, 8)}</p>
                      </div>
                      <p className="text-sm font-medium tracking-tight">₦{order.total_amount?.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${order.status === 'delivered' ? 'bg-green-400' : 'bg-orange-300'}`}></span>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest">{order.status || 'Processing'}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-10 border border-dashed border-gray-100 flex items-center justify-center">
                <p className="text-[11px] text-gray-400 italic font-light tracking-wide">No bespoke orders found yet.</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}