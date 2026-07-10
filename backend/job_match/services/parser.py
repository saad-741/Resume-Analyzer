import json


def parse_response(text):

    text = text.strip()

    text = text.replace("```json", "")
    text = text.replace("```", "")

    text = text.strip()

    start = text.find("{")
    end = text.rfind("}")

    if start == -1 or end == -1:
        raise ValueError("Gemini did not return valid JSON.")

    return json.loads(text[start:end + 1])