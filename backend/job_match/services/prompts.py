def job_match_prompt(resume_text, job_description):

    return f"""
        You are an ATS Job Match Expert.

        Compare the following resume with the job description.

        Return ONLY valid JSON.

        Do not include markdown.
        Do not include explanation.
        Do not wrap inside ```json.

        JSON format:

        {{
            "match_percentage": 0,
            "matching_skills": [],
            "missing_skills": [],
            "missing_keywords": [],
            "strengths": [],
            "weaknesses": [],
            "recommendations": [],
            "summary": ""
        }}

        Resume:

        {resume_text}

        Job Description:

        {job_description}
        """