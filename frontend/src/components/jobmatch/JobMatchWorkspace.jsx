import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import ResumeUploadPanel from "./ResumeUploadPanel";
import JobDescriptionPanel from "./JobDescriptionPanel";
import MatchResult from "./MatchResult";
import MatchList from "./MatchList";
import LoadingOverlay from "./LoadingOverlay";

import { uploadResume } from "../../services/resumeService";
import { createJob } from "../../services/jobService";
import {
  analyzeJobMatch,
  getJobMatch,
  getJobMatchHistory,
} from "../../services/jobMatchService";

export default function JobMatchWorkspace() {
  const [resumeFile, setResumeFile] = useState(null);

  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(null);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    try {
      const data = await getJobMatchHistory();
      setMatches(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleAnalyze() {
    if (!resumeFile) {
      toast.error("Please upload a resume.");
      return;
    }

    if (!jobDescription.trim()) {
      toast.error("Please paste a job description.");
      return;
    }

    try {
      setLoading(true);

      /* STEP 1 - Upload Resume */

      const formData = new FormData();

      formData.append("title", resumeFile.name);
      formData.append("file", resumeFile);

      const uploadedResume = await uploadResume(formData);

      /* STEP 2 - Create Job */

      const job = await createJob({
        title: position || "Temporary Job",
        company: company || "Unknown Company",
        position: position || "Unknown Position",
        description: jobDescription,
      });

      /* STEP 3 - Analyze */

      const match = await analyzeJobMatch({
        resume_id: uploadedResume.id,
        job_description_id: job.id,
      });

      /* STEP 4 - Get Full Report */

      const report = await getJobMatch(match.id);

      setResult(report);

      toast.success("Job Match Completed");

      /* Refresh History */

      loadHistory();

      /* Clear Inputs */

      setResumeFile(null);
      setCompany("");
      setPosition("");
      setJobDescription("");
    } catch (error) {
      console.error(error);

      toast.error("Failed to analyze job match.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading && (
        <LoadingOverlay
          title="Analyzing Job Match"
          subtitle="Comparing your resume with the job description..."
        />
      )}

      <div className="min-h-screen bg-slate-950">
        <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
          {/* Header */}

          <div className="text-center space-y-3">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-orange-500">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              AI Job Match
            </span>

            <h1 className="text-4xl font-black text-white tracking-tight">
              See how you stack up
            </h1>

            <p className="max-w-2xl mx-auto text-slate-400">
              Upload your resume and paste a job description to receive an
              AI-powered job match report.
            </p>
          </div>

          {/* Upload Section */}

          <div className="grid lg:grid-cols-2 gap-6">
            <ResumeUploadPanel
              file={resumeFile}
              onFileSelect={setResumeFile}
              disabled={loading}
            />

            <JobDescriptionPanel
              company={company}
              position={position}
              value={jobDescription}
              onCompanyChange={setCompany}
              onPositionChange={setPosition}
              onChange={setJobDescription}
              disabled={loading}
            />
          </div>

          {/* Analyze Button */}

          <div className="flex justify-center">
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="px-10 py-4 rounded-xl bg-orange-500 hover:bg-orange-400 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 text-lg font-bold shadow-lg shadow-orange-500/20 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:translate-y-0 disabled:shadow-none"
            >
              {loading ? "Analyzing..." : "Analyze Job Match"}
            </button>
          </div>

          {/* Result */}

          <MatchResult result={result} />

          {/* History */}

          <MatchList matches={matches} onView={setResult} />
        </div>
      </div>
    </>
  );
}