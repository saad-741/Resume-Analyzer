import { Loader2, Sparkles } from "lucide-react";

export default function LoadingOverlay({
  title = "Analyzing Job Match",
  subtitle = "AI is comparing your resume with the job description...",
}) {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl shadow-black/40 w-full max-w-lg p-10">
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
            <Sparkles size={36} className="text-orange-500" />
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <Loader2 className="animate-spin text-orange-500" size={40} />
        </div>

        <h2 className="text-3xl font-bold text-center text-white mt-8">{title}</h2>

        <p className="text-center text-slate-400 mt-4 leading-7">{subtitle}</p>

        {/* Fake Progress */}

        <div className="mt-10">
          <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full w-2/3 bg-orange-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        <div className="text-center text-sm text-slate-500 mt-5">
          Usually takes 5–15 seconds
        </div>
      </div>
    </div>
  );
}