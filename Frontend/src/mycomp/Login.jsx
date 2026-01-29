import React, { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Auth.context";

const Login = () => {
  const { user, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Already logged in → redirect
  if (!loading && user) {
    return <Navigate to="/home" replace />;
  }

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await signInWithPopup(auth, googleProvider);
      // AuthContext will handle backend sync
    } catch (err) {
      console.error("Login failed:", err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020504] text-white flex items-center justify-center p-4 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm relative z-10"
      >
        <div className="bg-[#0A0A0A]/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 mb-6">
            <div className="w-6 h-6 bg-gradient-to-tr from-emerald-400 to-emerald-600 rounded-md" />
          </div>

          <h1 className="text-2xl font-bold mb-2">Welcome to Preface</h1>
          <p className="text-gray-400 text-sm mb-8">
            Sign in to curate your library and publish your stories.
          </p>

          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full h-12 bg-white text-black font-bold rounded-xl flex items-center justify-center gap-3 hover:bg-gray-100 disabled:opacity-70"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                <span>Continue with Google</span>
              </>
            )}
          </button>

          <div className="mt-8 flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest">
            <Sparkles size={12} className="text-emerald-500" />
            Secure Authentication
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
