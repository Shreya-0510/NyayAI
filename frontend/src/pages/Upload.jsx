// src/pages/Upload.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import { pdfjsLib } from "../utils/pdf-worker";
import LoadingAnimation from "../components/LoadingAnimation";
import { analyzeTextWithGemini } from "../utils/gemini";

export default function Upload() {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const auth = useAuth(); // ✅ Access Cognito user info & tokens

  const presignApi =
    "https://zyurate5j2.execute-api.us-east-1.amazonaws.com/default/GenerateUploadUrl";
  const bucketName = import.meta.env.VITE_AWS_BUCKET_NAME || "nyayai-docs";

  const handleFileChange = (e) => setFile(e.target.files[0]);

  // ✅ Check authentication before allowing upload
  const ensureAuthenticated = () => {
    if (!auth?.isAuthenticated) {
      alert("Please log in first to upload documents.");
      auth.signinRedirect(); // redirect to Cognito login
      return false;
    }
    return true;
  };

  const extractTextFromPDF = async (pdfFile) => {
    try {
      const pdfData = new Uint8Array(await pdfFile.arrayBuffer());
      const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;

      let text = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map((item) => item.str).join(" ");
        text += pageText + "\n";
      }
      return text;
    } catch (err) {
      console.error("❌ PDF extraction failed:", err);
      throw new Error("Failed to extract text from PDF.");
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Select a file first!");
    if (!ensureAuthenticated()) return; // ✅ stop if not logged in
    setLoading(true);

    try {
      // ✅ Get Cognito ID token
      const idToken = auth.user?.id_token;
      if (!idToken) throw new Error("Missing authentication token.");

      const fileKey = `${Date.now()}-${file.name}`;

      // ✅ Call presign API with Authorization header
      const presignRes = await fetch(presignApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ fileName: fileKey, fileType: file.type }),
      });

      if (!presignRes.ok) throw new Error("Failed to get upload URL");
      const { uploadUrl } = await presignRes.json();

      // ✅ Upload file to S3 using the presigned URL
      const uploadRes = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });
      if (!uploadRes.ok) throw new Error("S3 upload failed");

      console.log("✅ Uploaded to S3:", fileKey);

      // ✅ Extract text from file
      let text = "";
      if (file.type === "application/pdf") {
        text = await extractTextFromPDF(file);
      } else if (file.type.startsWith("text/")) {
        text = await file.text();
      } else {
        alert("Please upload a PDF or TXT file for now.");
        setLoading(false);
        return;
      }

      if (!text.trim()) throw new Error("No readable text found in file.");

      // ✅ Analyze text with Gemini
      const geminiClauses = await analyzeTextWithGemini(text);

      console.log("✅ Gemini analysis complete:", geminiClauses);

      // ✅ Navigate to Chat page
      navigate("/chat", { state: { clauses: geminiClauses } });
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-8 py-20 bg-[#EFE9E4] flex flex-col items-center text-center">
      <h2 className="text-3xl font-bold mb-6">Upload Your Document</h2>

      <div className="p-10 bg-white/80 backdrop-blur-md shadow-xl rounded-2xl w-full max-w-xl flex flex-col items-center space-y-4">
        <input
          type="file"
          accept=".pdf,.txt"
          className="w-full border border-dashed border-gray-400 p-4 rounded-lg cursor-pointer"
          onChange={handleFileChange}
        />
        <p className="text-sm text-gray-500">
          Supports PDF or TXT files (up to 10 MB).
        </p>

        <button
          onClick={handleUpload}
          disabled={loading}
          className={`px-6 py-2 rounded-lg text-white transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#8B5E3C] hover:bg-[#734B2F]"
          }`}
        >
          {loading ? "Processing..." : "Upload & Analyze"}
        </button>

        {loading && <LoadingAnimation />}
      </div>
    </section>
  );
}
