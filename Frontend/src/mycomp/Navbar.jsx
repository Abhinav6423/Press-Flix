import React from 'react'
import { Layers, LogOut } from "lucide-react";
const Navbar = ({ user, logoutUser }) => {
    return (

        < nav className="sticky top-0 z-50 border-b border-white/5 bg-black/40 backdrop-blur-xl" >
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 via-violet-600 to-purple-700 rounded-lg flex items-center justify-center text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]">
                        <Layers size={18} strokeWidth={2.5} />
                    </div>
                    <span className="font-semibold text-white tracking-tight">PressFlix</span>
                </div>

                <div className="flex items-center gap-6">
                    <div className="hidden md:flex flex-col items-end">
                        <p className="text-sm font-medium text-zinc-200">{user?.name}</p>
                        <p className="text-xs text-zinc-500">{user?.email}</p>
                    </div>

                    <div className="h-8 w-px bg-white/10 hidden md:block" />

                    <button
                        onClick={logoutUser}
                        className="flex items-center gap-2 text-sm text-zinc-400 hover:text-red-400 transition-colors"
                    >
                        <LogOut size={16} />
                        <span className="hidden md:block">Logout</span>
                    </button>
                </div>
            </div>
        </nav >
    )
}

export default Navbar