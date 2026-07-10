import { Briefcase, Building2 } from "lucide-react";

export default function JobDescriptionPanel({
  company,
  position,
  value,
  onCompanyChange,
  onPositionChange,
  onChange,
  disabled = false,
}) {
  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-xl shadow-black/20 p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Job Description</h2>

        <p className="text-slate-400 mt-2">
          Paste the complete job description below.
        </p>
      </div>

      <div className="space-y-5">
        {/* Company */}

        <div className="relative">
          <Building2
            size={18}
            className="absolute left-4 top-4 text-slate-500"
          />

          <input
            type="text"
            disabled={disabled}
            value={company}
            onChange={(e) => onCompanyChange(e.target.value)}
            placeholder="Company (Optional)"
            className="
              w-full
              pl-12
              pr-4
              py-3
              rounded-xl
              bg-slate-950
              border
              border-slate-800
              text-white
              placeholder-slate-600
              focus:border-orange-500
              focus:ring-4
              focus:ring-orange-500/10
              outline-none
              disabled:opacity-50
              transition-all
            "
          />
        </div>

        {/* Position */}

        <div className="relative">
          <Briefcase
            size={18}
            className="absolute left-4 top-4 text-slate-500"
          />

          <input
            type="text"
            disabled={disabled}
            value={position}
            onChange={(e) => onPositionChange(e.target.value)}
            placeholder="Position (Optional)"
            className="
              w-full
              pl-12
              pr-4
              py-3
              rounded-xl
              bg-slate-950
              border
              border-slate-800
              text-white
              placeholder-slate-600
              focus:border-orange-500
              focus:ring-4
              focus:ring-orange-500/10
              outline-none
              disabled:opacity-50
              transition-all
            "
          />
        </div>

        {/* Job Description */}

        <textarea
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Paste the complete Job Description...

Example:

Backend Developer

Requirements

• Django
• DRF
• PostgreSQL
• Docker
• AWS
• Git
• REST APIs

Responsibilities

Build scalable APIs...
`}
          className="
            w-full
            h[360px]
            resize-none
            rounded-2xl
            bg-slate-950
            border
            border-slate-800
            text-white
            placeholder-slate-600
            p-5
            outline-none
            focus:border-orange-500
            focus:ring-4
            focus:ring-orange-500/10
            leading-7
            disabled:opacity-50
            transition-all
          "
        />
      </div>

      <div className="mt-6 text-sm text-slate-500">
        Better job descriptions produce more accurate AI matching.
      </div>
    </div>
  );
}