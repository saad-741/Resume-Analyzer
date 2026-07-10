import { Trophy, TrendingUp, AlertTriangle } from "lucide-react";

export default function MatchScore({ score = 0 }) {
  const percentage = Number(score);

  let color = "text-rose-400";

  let bg = "bg-rose-500/10";

  let ring = "border-rose-500/20";

  let icon = <AlertTriangle size={26} />;

  let label = "Needs Improvement";

  if (percentage >= 90) {
    color = "text-orange-400";

    bg = "bg-orange-500/10";

    ring = "border-orange-500/20";

    icon = <Trophy size={26} />;

    label = "Excellent Match";
  } else if (percentage >= 75) {
    color = "text-amber-400";

    bg = "bg-amber-500/10";

    ring = "border-amber-500/20";

    icon = <TrendingUp size={26} />;

    label = "Strong Match";
  } else if (percentage >= 60) {
    color = "text-yellow-400";

    bg = "bg-yellow-500/10";

    ring = "border-yellow-500/20";

    icon = <TrendingUp size={26} />;

    label = "Average Match";
  }

  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-xl shadow-black/20 p-10">
      <div className="flex flex-col items-center">
        <div
          className={`
            h-28
            w-28
            rounded-full
            border
            ${bg}
            ${color}
            ${ring}
            flex
            items-center
            justify-center
          `}
        >
          {icon}
        </div>

        <h2 className="mt-6 text-6xl font-black text-white">
          {percentage}%
        </h2>

        <p className="text-slate-500 mt-2">Overall Match Score</p>

        <span
          className={`
            mt-8
            px-6
            py-3
            rounded-full
            font-semibold
            border
            ${bg}
            ${color}
            ${ring}
          `}
        >
          {label}
        </span>
      </div>

      {/* Progress */}

      <div className="mt-10">
        <div className="flex justify-between text-sm text-slate-500 mb-2">
          <span>0%</span>

          <span>100%</span>
        </div>

        <div className="h-3 rounded-full bg-slate-800 overflow-hidden">
          <div
            style={{
              width: `${percentage}%`,
            }}
            className="h-full rounded-full bg-orange-500 transition-all duration-700"
          />
        </div>
      </div>
    </div>
  );
}