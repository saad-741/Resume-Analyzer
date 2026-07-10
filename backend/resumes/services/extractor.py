import fitz
from docx import Document


def extract_pdf_text(uploaded_file):
    uploaded_file.seek(0)

    pdf = fitz.open(
        stream=uploaded_file.read(),
        filetype="pdf",
    )

    text = ""

    for page in pdf:
        text += page.get_text()

    pdf.close()

    uploaded_file.seek(0)

    return text


def extract_docx_text(uploaded_file):
    uploaded_file.seek(0)

    doc = Document(uploaded_file)

    text = "\n".join(
        paragraph.text
        for paragraph in doc.paragraphs
    )

    uploaded_file.seek(0)

    return text


def extract_text(uploaded_file):
    filename = uploaded_file.name.lower()

    if filename.endswith(".pdf"):
        return extract_pdf_text(uploaded_file)

    if filename.endswith(".docx"):
        return extract_docx_text(uploaded_file)

    return ""