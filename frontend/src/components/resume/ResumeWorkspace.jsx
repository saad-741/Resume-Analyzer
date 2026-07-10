import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import ResumeUploader from "./ResumeUploader";
import ResumeAnalysisCard from "./ResumeAnalysisCard";
import ResumeHistory from "./ResumeHistory";
import LoadingOverlay from "../jobmatch/LoadingOverlay";

import { getMyResumes, deleteResume } from "../../services/resumeService";

import { analyzeResume, getAnalysis } from "../../services/analysisService";

export default function ResumeWorkspace() {
  const [loading, setLoading] = useState(true);

  const [analyzing, setAnalyzing] = useState(false);

  const [resumes, setResumes] = useState([]);

  const [activeResume, setActiveResume] = useState(null);

  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    initializeWorkspace();
  }, []);

  async function initializeWorkspace() {
    try {
      setLoading(true);

      const resumeData = await getMyResumes();

      setResumes(resumeData);

      if (resumeData.length === 0) {
        setActiveResume(null);
        setAnalysis(null);
        return;
      }

      const latestResume = resumeData[0];

      setActiveResume(latestResume);

      try {
        const analysisData = await getAnalysis(latestResume.id);

        setAnalysis(analysisData);
      } catch {
        setAnalysis(null);
      }
    } catch (error) {
      console.error(error);

      toast.error("Unable to load resumes.");
    } finally {
      setLoading(false);
    }
  }

  async function handleUpload() {
    await initializeWorkspace();

    toast.success("Resume uploaded successfully.");
  }

  async function handleDelete(id) {
    try {
      await deleteResume(id);

      toast.success("Resume deleted.");

      const updated = resumes.filter((resume) => resume.id !== id);

      setResumes(updated);

      if (activeResume?.id === id) {
        if (updated.length > 0) {
          setActiveResume(updated[0]);

          try {
            const analysisData = await getAnalysis(updated[0].id);

            setAnalysis(analysisData);
          } catch {
            setAnalysis(null);
          }
        } else {
          setActiveResume(null);
          setAnalysis(null);
        }
      }
    } catch (error) {
      console.error(error);

      toast.error("Failed to delete resume.");
    }
  }

  async function handleSelectResume(resume) {
    setActiveResume(resume);

    try {
      const analysisData = await getAnalysis(resume.id);

      setAnalysis(analysisData);
    } catch {
      setAnalysis(null);
    }
  }

  async function handleAnalyze() {
    if (!activeResume) {
      toast.error("Upload a resume first.");
      return;
    }

    try {
      setAnalyzing(true);

      await analyzeResume(activeResume.id);

      const analysisData = await getAnalysis(activeResume.id);

      setAnalysis(analysisData);

      toast.success("Resume analyzed successfully.");
    } catch (error) {
      console.error(error);

      toast.error("Analysis failed.");
    } finally {
      setAnalyzing(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-40 bg-slate-950 min-h-screen">
        <div className="h-10 w-10 rounded-full border-4 border-orange-500/20 border-t-orange-500 animate-spin" />
      </div>
    );
  }

  return (
    <>
      {analyzing && (
        <LoadingOverlay
          title="Analyzing Resume"
          subtitle="Our AI is reviewing your resume and generating ATS insights..."
        />
      )}

      <div className="min-h-screen -mt-1 bg-slate-950">
        <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
          {/* Page heading */}
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-orange-500">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              Resume Workspace
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Sharpen your resume
            </h1>
            <p className="text-slate-400 text-sm">
              Upload a resume and let the AI engine score, review, and coach it into shape.
            </p>
          </div>

          {/* Top Workspace Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch w-full">
            {/* Left: Upload Section */}
            <div className="flex">
              <ResumeUploader onUploaded={handleUpload} />
            </div>

            {/* Right: Active Resume State */}
            <div className="flex">
              {activeResume ? (
                <div className="w-full relative bg-slate-900 rounded-3xl border border-slate-800 p-8 flex flex-col justify-between overflow-hidden shadow-2xl shadow-black/40 transition-all duration-300">
                  {/* Subtle decorative glow */}
                  <div className="absolute top-0 right-0 w-56 h-56 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/5 pointer-events-none" />

                  <div className="space-y-2 relative">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-[11px] font-bold tracking-wider uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                      Active Target Document
                    </span>

                    <h2 className="text-2xl font-bold text-white tracking-tight leading-snug pt-2 truncate">
                      {activeResume.title}
                    </h2>

                    <p className="text-sm text-slate-400">
                      Registered on{" "}
                      {new Date(activeResume.created_at).toLocaleDateString(
                        undefined,
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-800 mt-6 relative">
                    <button
                      onClick={handleAnalyze}
                      disabled={analyzing}
                      className="w-full relative bg-orange-500 hover:bg-orange-400 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 py-3.5 px-6 rounded-xl font-bold text-sm shadow-lg shadow-orange-500/20 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:translate-y-0 disabled:shadow-none"
                    >
                      {analyzing ? (
                        <span className="flex items-center justify-center gap-2 text-slate-300">
                          <svg
                            className="animate-spin h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Processing scan...
                        </span>
                      ) : (
                        "Analyze with AI Engine"
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                /* Fallback state when no file is active yet */
                <div className="w-full border-2 border-dashed border-slate-800 bg-slate-900/40 rounded-3xl p-8 flex flex-col items-center justify-center text-center">
                  <p className="text-sm font-medium text-slate-500 max-w-xs">
                    No document selected. Upload a resume or pick one from your
                    history to get started.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Analysis */}
          <ResumeAnalysisCard analysis={analysis} loading={analyzing} />

          {/* Resume History */}
          <ResumeHistory
            resumes={resumes}
            activeResume={activeResume}
            onSelect={handleSelectResume}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </>
  );
}