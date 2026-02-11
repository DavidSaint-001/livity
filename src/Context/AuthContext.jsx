import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../supabaseClient"; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Initial Session Check
    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    initializeAuth();

    // 2. Listen for Auth State Changes (Login, Logout, Token Refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false); 
    });

    return () => subscription.unsubscribe();
  }, []);

  // --- ACTIONS ---

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(), 
      password: password,
    });
    
    if (error) throw error;
    return data;
  };

  const signup = async (email, password, name) => {
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password: password,
      options: {
        data: {
          display_name: name,
        }
      }
    });

    if (error) throw error;
    return data;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Logout error:", error.message);
    setUser(null);
  };

  // NEW: Forgot Password Logic
  const resetPassword = async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      // This is where the user will be sent after clicking the email link
      redirectTo: `${window.location.origin}/login`, 
    });

    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, resetPassword, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);