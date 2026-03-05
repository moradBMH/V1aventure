import { motion, AnimatePresence } from "motion/react";
import { Zap } from "lucide-react";

interface ComboStreakProps {
  show: boolean;
  combo: number;
}

export function ComboStreak({ show, combo }: ComboStreakProps) {
  return (
    <AnimatePresence>
      {show && combo > 1 && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 z-40"
        >
          <div className="relative">
            {/* Main combo display */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
              }}
              className="bg-gradient-to-br from-[#ff6b35] via-[#f7931e] to-[#feca57] border-4 border-[#8b6f47] rounded-3xl px-8 py-6 shadow-2xl"
            >
              {/* Lightning bolts */}
              <div className="absolute -top-3 -left-3">
                <motion.div
                  animate={{ rotate: [0, 20, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  <Zap className="w-8 h-8 text-[#feca57]" fill="#feca57" />
                </motion.div>
              </div>
              <div className="absolute -bottom-3 -right-3">
                <motion.div
                  animate={{ rotate: [0, -20, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: 0.25 }}
                >
                  <Zap className="w-8 h-8 text-[#feca57]" fill="#feca57" />
                </motion.div>
              </div>

              {/* Combo text */}
              <div className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 0.3, repeat: Infinity }}
                  className="text-7xl font-bold text-white mb-2"
                  style={{ textShadow: "0 4px 8px rgba(0,0,0,0.3)" }}
                >
                  ×{combo}
                </motion.div>
                <div className="text-xl text-white font-bold tracking-wider">COMBO !</div>
              </div>

              {/* Sparkle particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  initial={{ x: 0, y: 0, opacity: 1 }}
                  animate={{
                    x: Math.cos((i * Math.PI * 2) / 8) * 80,
                    y: Math.sin((i * Math.PI * 2) / 8) * 80,
                    opacity: 0,
                    scale: [1, 2, 0],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                  style={{
                    left: "50%",
                    top: "50%",
                  }}
                />
              ))}
            </motion.div>

            {/* Glow effect */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
              className="absolute inset-0 bg-gradient-to-br from-[#ff6b35] to-[#feca57] rounded-3xl blur-2xl -z-10"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
