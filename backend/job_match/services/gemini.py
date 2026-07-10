from google import genai
from django.conf import settings

from .prompts import job_match_prompt
from .parser import parse_response


client = genai.Client(
    api_key=settings.GEMINI_API_KEY
)


def analyze_job_match(resume_text, job_description):

    prompt = job_match_prompt(
        resume_text,
        job_description,
    )

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )

    return parse_response(response.text)