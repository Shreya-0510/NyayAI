// src/components/ClauseCarousel.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

/**
 * ClauseCarousel
 * Props:
 *   clauses = array of objects with { id, title, summary, analogy, risk, insight }
 */
export default function ClauseCarousel({ clauses: propClauses }) {
  // Default hardcoded insights (for now)
  const sampleClauses = [
    {
      id: "c1",
      title: "Payment Obligation",
      summary: "You must pay ₹10,000 rent by the 5th of each month.",
      analogy: "Like paying a subscription fee to continue accessing the service.",
      risk: "Low Risk",
      insight: "✅ Manageable if you pay on time.",
    },
    {
      id: "c2",
      title: "Penalty for Delay",
      summary: "₹500 per day penalty applies for late rent payment.",
      analogy: "Like library fines that pile up daily.",
      risk: "High Risk",
      insight: "⚠️ Risky if you frequently delay payments.",
    },
    {
      id: "c3",
      title: "Termination Clause",
      summary: "Landlord may terminate with 7 days' notice.",
      analogy: "Like canceling a subscription with very short warning.",
      risk: "Medium Risk",
      insight: "🔎 Short notice period, negotiate for more buffer.",
    },
  ];

  const clauses = propClauses?.length ? propClauses : sampleClauses;
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % clauses.length);
  const prev = () => setIndex((i) => (i - 1 + clauses.length) % clauses.length);

  const current = clauses[index];

  const riskColor = (risk) =>
    risk.toLowerCase().includes("high")
      ? "bg-red-100 text-red-600"
      : risk.toLowerCase().includes("medium")
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700";

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center space-y-6">
      {/* Card */}
      <div className="w-full relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-xl border border-[#E6DED4]"
          >
            <h3 className="text-xl font-semibold text-[#8B5E3C] mb-2">{current.title}</h3>
            <p className="text-gray-700 mb-3">{current.summary}</p>
            <p className="italic text-gray-500 mb-4">💡 {current.analogy}</p>
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-lg text-sm ${riskColor(current.risk)}`}>
                {current.risk}
              </span>
              <span className="text-xs text-gray-400">ID: {current.id}</span>
            </div>
            <div className="bg-[#F9F6F2] p-4 rounded-xl border border-[#EFE9E4] text-sm">
              <span className="font-medium text-[#6B4226]">Insight:</span> {current.insight}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Nav Buttons */}
        {clauses.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-[#F2ECE6] p-2 rounded-full shadow hover:bg-[#E6DDD1]"
            >
              <FiChevronLeft className="text-[#6B4226] w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-[#F2ECE6] p-2 rounded-full shadow hover:bg-[#E6DDD1]"
            >
              <FiChevronRight className="text-[#6B4226] w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Dots */}
      {clauses.length > 1 && (
        <div className="flex gap-2">
          {clauses.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition ${
                i === index ? "bg-[#8B5E3C]" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
