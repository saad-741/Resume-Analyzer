export default function ModeToggle({ mode, setMode }) {
  return (
    <div className="flex justify-center py-8">
      {/* Outer Pill Container */}
      <div className="relative bg-slate-900/90 border border-slate-800 p-1.5 rounded-full flex items-center shadow-xl max-w-md w-full sm:w-auto">
        
        {/* Animated Sliding Background Pill */}
        <div
          className={`absolute top-1.5 bottom-1.5 left-1.5 right-1.5 w-[calc(50%-6px)] bg-linear-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 rounded-full transition-transform duration-300 ease-out ${
            mode === "job" ? "translate-x-full" : "translate-x-0"
          }`}
        />

        {/* Resume Analysis Button */}
        <button
          onClick={() => setMode("resume")}
          className={`relative z-10 w-full sm:w-48 py-3 rounded-full text-sm font-semibold tracking-wide transition-colors duration-300 ${
            mode === "resume" 
              ? "text-violet-400" 
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          Resume Analysis
        </button>

        {/* Job Match Button */}
        <button
          onClick={() => setMode("job")}
          className={`relative z-10 w-full sm:w-48 py-3 rounded-full text-sm font-semibold tracking-wide transition-colors duration-300 ${
            mode === "job" 
              ? "text-violet-400" 
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          Job Match
        </button>

      </div>
    </div>
  );
}