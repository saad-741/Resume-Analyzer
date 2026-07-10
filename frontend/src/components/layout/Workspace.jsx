import { useState } from "react";

import ModeToggle from "./ModeToggle";

import ResumeWorkspace from "../resume/ResumeWorkspace";

import JobMatchWorkspace from "../jobmatch/JobMatchWorkspace";

export default function Workspace() {
  const [mode, setMode] = useState("resume");

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">

      <ModeToggle
        mode={mode}
        setMode={setMode}
      />

      {mode === "resume" ? (
        <ResumeWorkspace />
      ) : (
        <JobMatchWorkspace />
      )}

    </main>
  );
}