def resume_prompt(resume_text):

    return f"""
        You are an ATS Resume Analyzer.

        Analyze this resume.

        Return ONLY valid JSON.

        Schema:

        {{
            "ats_score":0,
            "grammar_score":0,
            "summary":"",
            "strengths":[],
            "weaknesses":[],
            "missing_skills":[],
            "suggestions":[]
        }}

        Resume:

        {resume_text}
        """