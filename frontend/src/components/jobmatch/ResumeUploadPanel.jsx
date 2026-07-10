import { useRef } from "react";
import { UploadCloud, FileText, Trash2 } from "lucide-react";

export default function ResumeUploadPanel({
  file,
  onFileSelect,
  disabled = false,
}) {
  const inputRef = useRef(null);

  function handleChange(e) {
    const selected = e.target.files[0];

    if (!selected) return;

    onFileSelect(selected);
  }

  function removeFile() {
    onFileSelect(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-xl shadow-black/20 p-8">
      <h2 className="text-2xl font-bold text-white mb-8">Resume</h2>

      {!file ? (
        <div
          onClick={() => !disabled && inputRef.current?.click()}
          className="
            h[420px]
            rounded-2xl
            border-2
            border-dashed
            border-slate-800
            bg-slate-950/50
            flex
            flex-col
            items-center
            justify-center
            cursor-pointer
            hover:border-orange-500/40
            hover:bg-slate-950
            transition-colors
            duration-300
          "
        >
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl text-orange-500">
            <UploadCloud size={48} />
          </div>

          <h3 className="mt-6 text-xl font-semibold text-white">
            Upload Resume
          </h3>

          <p className="mt-2 text-slate-500">
            Click anywhere to choose your file
          </p>

          <span className="mt-6 rounded-full bg-slate-950 border border-slate-800 px-5 py-2 text-sm font-medium text-slate-400">
            PDF • DOC • DOCX
          </span>
        </div>
      ) : (
        <div
          className="
            h[420px]
            rounded-2xl
            border
            border-orange-500/30
            bg-orange-500/5
            flex
            flex-col
            items-center
            justify-center
            text-center
            px-8
          "
        >
          <div className="p-5 bg-slate-950 border border-orange-500/20 rounded-2xl text-orange-400">
            <FileText size={44} />
          </div>

          <h3 className="mt-6 text-xl font-semibold text-white">
            Resume Uploaded
          </h3>

          <p className="mt-3 text-slate-400 break-all">{file.name}</p>

          <p className="mt-2 text-sm text-slate-500">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>

          <button
            onClick={removeFile}
            disabled={disabled}
            className="
              mt-8
              flex
              items-center
              gap-2
              rounded-lg
              bg-rose-500/10
              hover:bg-rose-500/20
              border
              border-rose-500/20
              px-5
              py-3
              text-rose-400
              font-medium
              transition-colors
              disabled:opacity-50
            "
          >
            <Trash2 size={18} />
            Remove Resume
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        hidden
        type="file"
        accept=".pdf,.doc,.docx"
        disabled={disabled}
        onChange={handleChange}
      />

      <div className="mt-6 rounded-xl bg-slate-950 border border-slate-800 p-4 text-sm text-slate-500">
        Upload the latest version of your resume for the most accurate AI
        analysis.
      </div>
    </div>
  );
}
