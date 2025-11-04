import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function analyzeTextWithGemini(text) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
You are a legal AI assistant.
Analyze the following document text and return a structured JSON array of clauses.
Each clause should have these fields:

[
  {
    "id": "c1",
    "title": "Short Title",
    "summary": "Simple summary in plain English.",
    "analogy": "Everyday analogy to help understanding.",
    "risk": "Low / Medium / High Risk",
    "insight": "Actionable tip or interpretation."
  }
]

Document text:
${text.slice(0, 6000)}
  `;

  const result = await model.generateContent(prompt);
  const output = result.response.text();

  try {
    const jsonMatch = output.match(/\[([\s\S]*?)\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    } else {
      console.warn("Unexpected Gemini output:", output);
      return [];
    }
  } catch (err) {
    console.error("Failed to parse Gemini output:", err);
    return [];
  }
}
