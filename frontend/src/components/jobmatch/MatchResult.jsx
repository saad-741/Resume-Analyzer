import {
  CheckCircle2,
  XCircle,
  KeyRound,
  ThumbsUp,
  AlertTriangle,
  Lightbulb,
  FileText,
} from "lucide-react";

import MatchScore from "./MatchScore";

function Section({ title, items, icon, color = "text-orange-400" }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-xl shadow-black/20 p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className={color}>{icon}</div>

        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>

      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className={`w-1.5 h-1.5 mt-2.5 rounded-full shrink-0 ${color.replace("text-", "bg-")}`}></span>

            <span className="text-slate-400 leading-7">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function MatchResult({ result }) {
  if (!result) {
    return (
      <div className="bg-slate-900/50 rounded-3xl border-2 border-dashed border-slate-800 p-20 text-center">
        <FileText size={64} className="mx-auto text-slate-700" />

        <h2 className="mt-8 text-3xl font-bold text-white">
          No Analysis Yet
        </h2>

        <p className="mt-4 text-slate-500 max-w-xl mx-auto leading-7">
          Upload your resume, paste a job description, then click{" "}
          <strong className="text-slate-300 font-semibold">Analyze Job Match</strong>.
          Your AI report will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Score */}

      <MatchScore score={result.match_percentage} />

      {/* Grid */}

      <div className="grid lg:grid-cols-2 gap-6">
        <Section
          title="Matching Skills"
          items={result.matching_skills}
          icon={<CheckCircle2 size={22} />}
          color="text-orange-400"
        />

        <Section
          title="Missing Skills"
          items={result.missing_skills}
          icon={<XCircle size={22} />}
          color="text-rose-400"
        />

        <Section
          title="Missing Keywords"
          items={result.missing_keywords}
          icon={<KeyRound size={22} />}
          color="text-amber-400"
        />

        <Section
          title="Strengths"
          items={result.strengths}
          icon={<ThumbsUp size={22} />}
          color="text-orange-400"
        />

        <Section
          title="Weaknesses"
          items={result.weaknesses}
          icon={<AlertTriangle size={22} />}
          color="text-rose-400"
        />

        <Section
          title="Recommendations"
          items={result.recommendations}
          icon={<Lightbulb size={22} />}
          color="text-amber-400"
        />
      </div>

      {/* Summary */}

      <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-xl shadow-black/20 p-8">
        <div className="flex items-center gap-3 mb-5">
          <FileText className="text-orange-500" size={22} />

          <h2 className="text-2xl font-bold text-white">AI Summary</h2>
        </div>

        <p className="text-slate-400 leading-8 whitespace-pre-wrap">
          {result.summary}
        </p>
      </div>
    </div>
  );
}