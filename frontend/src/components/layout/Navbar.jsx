import { NavLink } from "react-router-dom";
import { User, LogOut } from "lucide-react";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  // Reusable NavLink styling function for active/inactive states
  const linkStyles = ({ isActive }) =>
    `font-medium transition-all duration-200 text-sm ${
      isActive
        ? "text-violet-400"
        : "text-slate-300 hover:text-white"
    }`;

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800/60 rounded-full h-16 px-6 sm:px-8 flex items-center justify-between shadow-xl shadow-slate-950/20">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-linear-to-tr from-violet-500 to-fuchsia-500 animate-pulse" />
          <h1 className="text-xl font-bold tracking-tight text-white">
            AI<span className="text-violet-400">Resume</span>
          </h1>
        </div>

        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 border border-slate-800 bg-slate-950/30 text-slate-200 text-sm font-medium rounded-full px-4 py-2 transition-all duration-200 hover:bg-slate-800/50 hover:text-white focus:outline-none"
          >
            <div className="p-1 rounded-full bg-slate-800 text-slate-400">
              <User size={14} />
            </div>
            <span>{user?.username || "Account"}</span>
          </button>

          {open && (
            <>
              {/* Invisible backdrop to close the dropdown when clicking outside */}
              <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
              
              <div className="absolute right-0 mt-3 w-48 rounded-2xl bg-slate-900/95 border border-slate-800 p-1.5 shadow-2xl backdrop-blur-xl z-20">
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="flex items-center gap-3 w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10 transition-colors duration-150"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}