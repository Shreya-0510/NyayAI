import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate(); // hook to programmatically navigate

  return (
    <div className="bg-[#F9F6F2] text-[#2D2A26]">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center h-screen px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
          Simplify Legal Documents with <span className="text-[#8B5E3C]">NyayAI</span>
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mb-8 text-gray-700">
          Upload contracts, agreements, or policies — we’ll explain them in plain English.
        </p>
        <button
          onClick={() => navigate("/upload")} // redirect to upload page
          className="px-6 py-3 bg-[#8B5E3C] text-white font-semibold rounded-xl shadow-md hover:bg-[#734B2F] transition"
        >
          Get Started
        </button>
      </section>

      {/* Problem Section */}
      <section className="px-8 py-16 md:py-24 bg-[#EFE9E4]">
        <h2 className="text-3xl font-bold mb-6 text-center">Why This Matters</h2>
        <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
          <p className="text-lg leading-relaxed">
            Legal jargon is confusing. We help you cut through the noise and uncover what really
            matters in your agreements — so you can make informed decisions without hidden surprises.
          </p>
          <div className="flex justify-center">
            <div className="p-6 bg-white shadow-lg rounded-xl w-full">
              <p className="text-sm text-gray-500 mb-2">Example</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-100 p-3 rounded-md">
                  “The lessee agrees to indemnify and hold harmless...”
                </div>
                <div className="bg-[#FDF6F0] p-3 rounded-md text-[#2D2A26]">
                  “If something goes wrong, you’ll be responsible for covering the costs.”
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-8 py-16 md:py-24 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <p className="text-4xl mb-4">📂</p>
            <h3 className="font-semibold text-lg mb-2">1. Upload</h3>
            <p>Drag and drop or select your legal document.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <p className="text-4xl mb-4">⚡</p>
            <h3 className="font-semibold text-lg mb-2">2. AI Analysis</h3>
            <p>Our AI breaks it into clear, plain-English clauses.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <p className="text-4xl mb-4">🧾</p>
            <h3 className="font-semibold text-lg mb-2">3. Get Insights</h3>
            <p>Understand risks, summaries, and fairness instantly.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-6 text-center text-gray-600 text-sm">
        © 2025 NyayAI All Rights Reserved
      </footer>
    </div>
  );
};

export default Landing;
