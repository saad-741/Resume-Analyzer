export default function Footer() {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 -mt-4">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-slate-500">
        <div>
          © 2026{" "}
          <span className="text-slate-400 font-medium">AI Resume Analyzer</span>
        </div>
        <div className="text-xs text-slate-600 sm:text-sm">
          Developed by <span className="text-slate-500 font-medium">Saad</span>
        </div>
      </div> 
    </footer>
  );
}