import { motion } from "framer-motion";

export default function LoadingAnimation() {
  const dots = [0, 1, 2];

  return (
    <div className="flex flex-col items-center mt-4">
      {/* Playful status text */}
      <p className="text-gray-700 text-sm mb-2">
        Analyzing your legal doc… ⚡
      </p>

      {/* Bouncing dots */}
      <div className="flex space-x-2">
        {dots.map((dot) => (
          <motion.div
            key={dot}
            className="w-3 h-3 bg-[#8B5E3C] rounded-full"
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 0.6, delay: dot * 0.2 }}
          />
        ))}
      </div>
    </div>
  );
}
