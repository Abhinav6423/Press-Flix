import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { signUpUser } from "../../api-calls/register";
import { useAuth } from "../../context/Auth.context";
import { motion } from 'framer-motion';
const Signup = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    try {
      const result = await signUpUser(email, password, username);

      if (result?.success) {
        toast.success("Account created! Please verify your email before logging in.");

        setUsername("");
        setEmail("");
        setPassword("");

        navigate("/login");
      } else {
        toast.error(result?.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] flex items-center justify-center p-4 font-sans relative overflow-hidden">

      {/* --- Ambient Background Glows --- */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-emerald-900/20 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none z-0" />

      {/* --- Signup Card --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,1)] overflow-hidden relative z-10"
      >

        {/* Subtle top border glow */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-50" />

        <div className="p-8 pb-6 text-center">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 font-bold tracking-tight text-white text-xl">
              <div className="w-3.5 h-3.5 bg-emerald-500 rounded-sm shadow-[0_0_12px_rgba(16,185,129,0.6)]" /> PressFlix
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Create an account
          </h2>
          <p className="text-gray-400 text-sm mt-2 font-light">
            Start validating your ideas in seconds.
          </p>
        </div>

        <form className="px-8 pb-8 space-y-5" onSubmit={handleSubmit}>

          {/* Username Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Username</label>
            <div className="relative group">
              <User className="absolute left-4 top-3.5 h-4 w-4 text-gray-500 group-focus-within:text-emerald-400 transition-colors" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="founder_123"
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.05] focus:ring-1 focus:ring-emerald-500/50 transition-all"
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-3.5 h-4 w-4 text-gray-500 group-focus-within:text-emerald-400 transition-colors" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@startup.com"
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.05] focus:ring-1 focus:ring-emerald-500/50 transition-all"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-3.5 h-4 w-4 text-gray-500 group-focus-within:text-emerald-400 transition-colors" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.05] focus:ring-1 focus:ring-emerald-500/50 transition-all"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-white text-black hover:bg-gray-200 disabled:opacity-70 disabled:hover:bg-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] active:scale-[0.98]"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin text-gray-600" />
            ) : (
              <>
                Create Account <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

        </form>

        {/* Footer */}
        <div className="p-6 bg-[#050505] border-t border-white/5 text-center">
          <p className="text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors hover:underline underline-offset-4">
              Sign in
            </Link>
          </p>
        </div>

      </motion.div>
    </div>
  );
};

export default Signup;
