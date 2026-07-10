import cloudinary.uploader

def upload_resume(file):
    result = cloudinary.uploader.upload(
        file,
        resource_type="image",
        folder="ai-resume-analyzer/resumes",
    )
    # print(result)
    # print(result["resource_type"])
    # print(result["secure_url"])
    # print(result["public_id"])
    # print(result["format"])

    return {
        "url": result["secure_url"],
        "public_id": result["public_id"],
    }