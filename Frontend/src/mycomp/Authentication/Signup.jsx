import React, { useState, useEffect } from 'react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { signUpUser } from "../../api-calls/register";
import { useAuth } from "../../context/Auth.context";

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
      const result = await signUpUser(email, password , username);

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
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl overflow-hidden">

        <div className="p-8 pb-0 text-center">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Create an account
          </h2>
          <p className="text-zinc-400 text-sm mt-2">
            Start building your landing pages with Press-Flix
          </p>
        </div>

        <form className="p-8 space-y-5" onSubmit={handleSubmit}>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-zinc-500" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2.5 pl-10 pr-4 text-zinc-100"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-zinc-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2.5 pl-10 pr-4 text-zinc-100"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-zinc-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2.5 pl-10 pr-4 text-zinc-100"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white py-2.5 rounded-lg flex items-center justify-center gap-2"
          >
            {loading ? 'Creating account...' : 'Get Started'}
            <ArrowRight className="w-4 h-4" />
          </button>

        </form>

        <div className="p-4 bg-zinc-950 border-t border-zinc-800 text-center">
          <p className="text-sm text-zinc-500">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-400 hover:underline">
              Log in
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Signup;
