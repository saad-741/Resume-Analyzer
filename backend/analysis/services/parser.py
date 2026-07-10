import json
import re


def parse_response(text):
    text = text.strip()

    match = re.search(r"\{.*\}", text, re.DOTALL)

    if not match:
        raise ValueError(
            f"Gemini did not return valid JSON.\n\n{text}"
        )

    try:
        return json.loads(match.group())
    except json.JSONDecodeError as e:
        raise ValueError(
            f"Invalid JSON returned by Gemini:\n\n{match.group()}"
        ) from e