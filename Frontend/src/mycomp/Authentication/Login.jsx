import React, { useState, useEffect } from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { loginUser } from '../../api-calls/login';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/Auth.context';
import Loader from '../../mycomp/Loader'
const Login = () => {
    const navigate = useNavigate();
    const { userData, reloadUserData } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (userData) {
            navigate("/home");
        }
    }, [userData, navigate]);

    /* ---------------- EMAIL / PASSWORD LOGIN ---------------- */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;

        setLoading(true);
        console.log("Login submit clicked");

        try {
            const [result] = await Promise.all([
                loginUser(email, password),
                new Promise(resolve => setTimeout(resolve, 800)),
            ]);

            if (!result?.success) {
                toast.error(result?.message || "Login failed");
                setLoading(false);
                return;
            }

            console.log("Login successful:", result.message);

            await reloadUserData(); // 🔥 now backend + context sync is stable
            navigate("/home");
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
            setLoading(false);
        }
    };


    if (loading) return <Loader />;
    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl overflow-hidden">

                <div className="p-8 pb-0 text-center">
                    <h2 className="text-2xl font-bold text-white">Welcome back</h2>
                </div>

                <form className="p-8 space-y-5" onSubmit={handleSubmit}>

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

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white py-2.5 rounded-lg flex items-center justify-center gap-2"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                        <ArrowRight className="w-4 h-4" />
                    </button>

                </form>

                <div className="p-4 bg-zinc-950 border-t border-zinc-800 text-center">
                    <p className="text-sm text-zinc-500">
                        Don’t have an account?{' '}
                        <Link to="/register" className="text-indigo-400 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Login;
