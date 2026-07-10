import {
  CheckCircle2,
  CircleAlert,
  ArrowRight,
  FileText,
  BadgeCheck,
} from "lucide-react";

import ScoreCard from "./ScoreCard";

function ListCard({
  title,
  items = [],
  icon,
  color = "text-orange-400",
}) {
  if (!items || items.length === 0) return null;

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl shadow-black/20 p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className={color}>{icon}</div>

        <h3 className="text-lg font-semibold text-white">
          {title}
        </h3>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-3"
          >
            <div className={`mt-1 ${color}`}>
              {icon}
            </div>

            <p className="text-slate-400 leading-7">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ResumeAnalysisCard({
  analysis,
  loading = false,
}) {
  if (loading) {
    return (
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-16 shadow-xl shadow-black/20 text-center">
        <div className="mx-auto h-12 w-12 rounded-full border-4 border-orange-500/20 border-t-orange-500 animate-spin" />

        <h2 className="mt-6 text-2xl font-bold text-white">
          AI is analyzing your resume
        </h2>

        <p className="mt-2 text-slate-500">
          Please wait a few seconds...
        </p>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-xl shadow-black/20 p-20 text-center">
        <BadgeCheck
          size={56}
          className="mx-auto text-orange-500"
        />

        <h2 className="mt-6 text-2xl font-bold text-white">
          No Analysis Available
        </h2>

        <p className="mt-3 text-slate-500 max-w-xl mx-auto">
          Upload a resume and click{" "}
          <strong className="text-slate-300 font-semibold">Analyze Resume</strong>{" "}
          to receive an AI-powered ATS report, grammar evaluation, strengths,
          weaknesses and personalized suggestions.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>
        <h2 className="text-3xl font-bold text-white">
          Resume Analysis
        </h2>

        <p className="text-slate-400 mt-2">
          AI generated report for your latest uploaded resume.
        </p>
      </div>

      {/* Score Cards */}

      <div className="grid md:grid-cols-3 gap-6">

        <ScoreCard
          title="ATS Score"
          value={`${analysis.ats_score}%`}
          subtitle="Resume Compatibility"
        />

        <ScoreCard
          title="Grammar"
          value={`${analysis.grammar_score}%`}
          subtitle="Writing Quality"
        />

        <ScoreCard
          title="Experience"
          value={analysis.experience_level || "Good"}
          subtitle="Overall Evaluation"
        />

      </div>

      {/* Summary */}

      <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl shadow-black/20 p-6">

        <div className="flex items-center gap-3 mb-4">
          <FileText className="text-orange-500" size={20} />

          <h3 className="text-xl font-semibold text-white">
            Summary
          </h3>
        </div>

        <p className="text-slate-400 leading-8 whitespace-pre-wrap">
          {analysis.summary}
        </p>

      </div>

      {/* Strengths */}

      <ListCard
        title="Strengths"
        items={analysis.strengths}
        color="text-orange-400"
        icon={<CheckCircle2 size={20} />}
      />

      {/* Weaknesses */}

      <ListCard
        title="Weaknesses"
        items={analysis.weaknesses}
        color="text-rose-400"
        icon={<CircleAlert size={20} />}
      />

      {/* Suggestions */}

      <ListCard
        title="Suggestions"
        items={analysis.recommendations}
        color="text-amber-400"
        icon={<ArrowRight size={20} />}
      />

    </div>
  );
}