import time

from django.conf import settings
from google import genai
from google.genai.errors import ServerError

from .parser import parse_response
from .prompts import resume_prompt


client = genai.Client(api_key=settings.GEMINI_API_KEY)


def analyze_resume(text):

    prompt = resume_prompt(text)

    response = None

    for attempt in range(3):
        try:
            response = client.models.generate_content(
                model="gemini-2.0-flash",
                contents=prompt,
            )
            break

        except ServerError:
            if attempt == 2:
                raise

            time.sleep(3)

    print("\n================ GEMINI RESPONSE ================\n")
    print(response.text)
    print("\n=================================================\n")

    return parse_response(response.text)