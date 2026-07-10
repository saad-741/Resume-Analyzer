import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { UploadCloud, FileText, CheckCircle2, AlertCircle } from "lucide-react";

import { uploadResume } from "../../services/resumeService";

export default function ResumeUploader({ onUploaded }) {
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Enter resume title.");
      return;
    }

    if (!file) {
      toast.error("Choose a resume.");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("title", title);
      formData.append("file", file);

      await uploadResume(formData);

      toast.success("Resume uploaded successfully.");

      setTitle("");
      setFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      onUploaded?.();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.detail || "Failed to upload resume.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="w-full bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl shadow-black/40 overflow-hidden transition-all duration-300">
      {/* Header Banner Section */}
      <div className="relative px-8 py-8 border-b border-slate-800 bg-slate-900">
        <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
        <div className="relative flex items-start gap-4">
          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-orange-500">
            <FileText size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Upload Resume</h2>
            <p className="text-sm text-slate-400 mt-1 leading-relaxed">
              Upload your latest professional profile to receive an instant, AI-powered ATS analysis.
            </p>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        {/* Title Input */}
        <div className="space-y-2">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Resume Title
          </label>
          <input
            type="text"
            placeholder="e.g., Senior Software Engineer - Core Tech"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all duration-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
          />
        </div>

        {/* Dropzone Wrapper */}
        <div className="space-y-2">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
            File Attachment
          </label>

          <label className="block cursor-pointer group">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <div className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 text-center
              ${file
                ? "border-orange-500/60 bg-orange-500/5"
                : "border-slate-800 bg-slate-950/50 hover:border-orange-500/40 hover:bg-slate-950"
              }`}
            >
              <div className="flex flex-col items-center">
                {file ? (
                  <div className="p-4 bg-orange-500/10 text-orange-400 rounded-2xl">
                    <CheckCircle2 size={30} strokeWidth={2.5} />
                  </div>
                ) : (
                  <div className="p-4 bg-slate-900 text-slate-500 rounded-2xl group-hover:text-orange-500 transition-colors duration-300">
                    <UploadCloud size={30} />
                  </div>
                )}

                <h3 className="mt-4 font-semibold text-white text-base">
                  {file ? "File selected successfully" : "Drag & drop your resume"}
                </h3>

                <p className="text-xs text-slate-500 mt-1">
                  {file ? "Click anywhere inside to replace file" : "or click to browse local files"}
                </p>

                {/* Selected File Display or Constraints badge */}
                <div className="mt-6 w-full max-w-xs mx-auto">
                  {file ? (
                    <div className="flex items-center justify-between gap-3 bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-4 py-2.5 text-sm">
                      <div className="flex items-center gap-2 truncate">
                        <FileText size={16} className="text-orange-400 shrink-0" />
                        <span className="truncate font-medium">{file.name}</span>
                      </div>
                      <span className="text-[10px] bg-slate-800 text-slate-400 font-bold px-2 py-0.5 rounded uppercase shrink-0">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 bg-slate-900 text-slate-400 rounded-full px-3 py-1 text-xs font-medium border border-slate-800">
                      <AlertCircle size={12} className="text-slate-500" />
                      <span>Supports PDF, DOC, DOCX up to 10MB</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </label>
        </div>

        {/* Submit Button */}
        <button
          disabled={uploading}
          className="w-full relative overflow-hidden bg-orange-500 hover:bg-orange-400 text-slate-950 py-3.5 px-4 rounded-xl font-bold text-sm shadow-lg shadow-orange-500/20 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:bg-slate-800 disabled:text-slate-500 disabled:translate-y-0 disabled:shadow-none disabled:cursor-not-allowed"
        >
          {uploading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Analyzing & Uploading...
            </span>
          ) : (
            "Analyze with AI Engine"
          )}
        </button>
      </form>
    </div>
  );
}