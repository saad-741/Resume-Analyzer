import { Trash2, Eye, CheckCircle2, Calendar, FileStack } from "lucide-react";

export default function ResumeHistory({
  resumes,
  activeResume,
  onSelect,
  onDelete,
}) {
  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-xl shadow-black/20 overflow-hidden">
      <div className="flex items-center justify-between px-8 py-6 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white">Recent Resumes</h2>

          <p className="text-slate-500 mt-1 text-sm">Manage your uploaded resumes.</p>
        </div>

        <span className="bg-slate-950 border border-slate-800 px-4 py-2 rounded-full text-sm font-medium text-slate-300">
          {resumes.length} Resume{resumes.length !== 1 && "s"}
        </span>
      </div>

      {resumes.length === 0 ? (
        <div className="py-20 text-center">
          <FileStack size={40} className="mx-auto text-slate-700 mb-4" />
          <h3 className="text-xl font-semibold text-white">No resumes uploaded</h3>

          <p className="text-slate-500 mt-3">
            Upload your first resume to begin.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-slate-800">
          {resumes.map((resume) => {
            const active = activeResume?.id === resume.id;

            return (
              <div
                key={resume.id}
                className={`flex flex-col lg:flex-row lg:items-center lg:justify-between px-8 py-6 transition-colors ${
                  active ? "bg-orange-500/5" : "hover:bg-slate-800/40"
                }`}
              >
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-lg text-white">{resume.title}</h3>

                    {active && (
                      <span className="flex items-center gap-1 text-orange-400 text-xs font-semibold uppercase tracking-wide">
                        <CheckCircle2 size={14} />
                        Active
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-500 mt-2">
                    <Calendar size={15} />

                    {new Date(resume.created_at).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex gap-3 mt-5 lg:mt-0">
                  <button
                    onClick={() => onSelect(resume)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-800 text-slate-300 hover:border-orange-500/40 hover:text-orange-400 transition-colors text-sm font-medium"
                  >
                    <Eye size={16} />
                    View
                  </button>

                  <a
                    href={resume.file}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center px-4 py-2 rounded-lg border border-slate-800 text-slate-300 hover:border-orange-500/40 hover:text-orange-400 transition-colors text-sm font-medium"
                  >
                    PDF
                  </a>

                  <button
                    onClick={() => onDelete(resume.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-colors text-sm font-medium"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}