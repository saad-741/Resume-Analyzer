import Navbar from "../components/layout/Navbar";
import Workspace from "../components/layout/Workspace";
import Footer from "../components/layout/Footer";

export default function WorkspacePage() {
  return (
    <div className="min-h-screen bg-slate-400 flex flex-col">
      <Navbar />

      <main className="flex-1 mt-10">
        <Workspace />
      </main>

      <Footer />
    </div>
  );
}