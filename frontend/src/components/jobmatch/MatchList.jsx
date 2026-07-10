import { Eye, Building2, Calendar, TrendingUp } from "lucide-react";

export default function MatchList({ matches = [], onView }) {
  if (!matches.length) {
    return (
      <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-xl shadow-black/20 p-16 text-center">
        <TrendingUp size={56} className="mx-auto text-slate-700" />

        <h2 className="mt-6 text-2xl font-bold text-white">
          No Previous Analyses
        </h2>

        <p className="mt-3 text-slate-500">
          Your previous AI job match reports will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-xl shadow-black/20 overflow-hidden">
      {/* Header */}

      <div className="border-b border-slate-800 px-8 py-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Previous Analyses</h2>

          <p className="text-slate-500 mt-1 text-sm">Recent Job Match Reports</p>
        </div>

        <div className="bg-orange-500/10 text-orange-400 px-4 py-2 rounded-full font-semibold text-sm border border-orange-500/20">
          {matches.length} Reports
        </div>
      </div>

      {/* List */}

      <div className="divide-y divide-slate-800">
        {matches.map((match) => (
          <div
            key={match.id}
            className="px-8 py-6 hover:bg-slate-800/40 transition-colors"
          >
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-6">
              {/* Left */}

              <div>
                <div className="flex items-center gap-2">
                  <Building2 size={18} className="text-orange-500" />

                  <h3 className="font-bold text-lg text-white">
                    {match.job_description?.company || "Unknown Company"}
                  </h3>
                </div>

                <p className="mt-1 text-slate-400">
                  {match.job_description?.position || "Unknown Position"}
                </p>

                <div className="flex items-center gap-2 mt-3 text-sm text-slate-500">
                  <Calendar size={15} />

                  {new Date(match.created_at).toLocaleDateString()}
                </div>
              </div>

              {/* Right */}

              <div className="flex items-center gap-6">
                <div className="text-center">
                  <h2 className="text-4xl font-black text-orange-500">
                    {match.match_percentage}%
                  </h2>

                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Match
                  </p>
                </div>

                <button
                  onClick={() => onView(match)}
                  className="
                    flex
                    items-center
                    gap-2
                    px-5
                    py-3
                    rounded-xl
                    bg-orange-500
                    hover:bg-orange-400
                    text-slate-950
                    font-semibold
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    active:translate-y-0
                  "
                >
                  <Eye size={18} />
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}