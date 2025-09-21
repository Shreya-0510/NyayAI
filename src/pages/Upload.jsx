import { useState } from "react";
import LoadingAnimation from "../components/LoadingAnimation";

export default function Upload() {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  // Your API Gateway endpoint for the Lambda
  const apiUrl = "https://zyurate5j2.execute-api.us-east-1.amazonaws.com/default/GenerateUploadUrl";

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Select a file first");
    setLoading(true);

    try {
      // Step 1: ask Lambda for a presigned URL
      const fileKey = `${Date.now()}-${file.name}`;
      const presignRes = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: fileKey, fileType: file.type }),
      });

      if (!presignRes.ok) throw new Error("Failed to get upload URL");
      const { uploadUrl } = await presignRes.json();

      // Step 2: upload file directly to S3
      const uploadRes = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (uploadRes.ok) {
        alert(`${file.name} uploaded successfully!`);
      } else {
        alert("Upload failed at S3 stage");
      }
    } catch (err) {
      console.error(err);
      alert("Upload error: " + err.message);
    }

    setLoading(false);
  };

  return (
    <section className="px-8 py-20 bg-[#EFE9E4] flex flex-col items-center text-center">
      <h2 className="text-3xl font-bold mb-6">Upload Your Document</h2>
      <div className="p-10 bg-white/80 backdrop-blur-md shadow-xl rounded-2xl w-full max-w-xl flex flex-col items-center space-y-4">
        <input
          type="file"
          className="w-full border border-dashed border-gray-400 p-4 rounded-lg cursor-pointer"
          onChange={handleFileChange}
        />
        <p className="text-sm text-gray-500">Supports PDF & DOCX, up to 10 MB.</p>
        <button
          onClick={handleUpload}
          className="px-6 py-2 bg-[#8B5E3C] text-white rounded-lg hover:bg-[#734B2F] transition"
        >
          Upload
        </button>
        {loading && <LoadingAnimation />}
      </div>
    </section>
  );
}
