import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center mt-15 justify-center p-6">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 shadow-2xl shadow-black/40 rounded-3xl p-8">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}