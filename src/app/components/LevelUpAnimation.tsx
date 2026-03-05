import { motion, AnimatePresence } from "motion/react";
import { Star, Sparkles, TrendingUp } from "lucide-react";

interface LevelUpAnimationProps {
  show: boolean;
  newLevel: number;
}

export function LevelUpAnimation({ show, newLevel }: LevelUpAnimationProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
          {/* Radial burst background */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 3, opacity: [0, 0.8, 0] }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle, rgba(212,165,116,0.3) 0%, transparent 70%)",
            }}
          />

          {/* Main level up card */}
          <motion.div
            initial={{ scale: 0, rotateY: -180 }}
            animate={{ scale: 1, rotateY: 0 }}
            exit={{ scale: 0, rotateY: 180 }}
            transition={{ type: "spring", damping: 15, stiffness: 100 }}
            className="relative z-10"
          >
            <div className="bg-gradient-to-br from-[#2a2419] via-[#3a3429] to-[#2a2419] border-4 border-[#d4a574] rounded-3xl p-12 shadow-2xl">
              {/* Decorative corners with stars */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-6 -left-6"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#feca57] to-[#f7b731] border-4 border-[#8b6f47] rounded-full flex items-center justify-center shadow-xl">
                  <Star className="w-8 h-8 text-white" fill="white" />
                </div>
              </motion.div>

              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-6 -right-6"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#6b8e23] to-[#556b1d] border-4 border-[#8b6f47] rounded-full flex items-center justify-center shadow-xl">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
              </motion.div>

              {/* Content */}
              <div className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Sparkles className="w-16 h-16 text-[#feca57] mx-auto mb-4" fill="#feca57" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl font-serif text-[#d4a574] mb-2"
                >
                  NIVEAU SUPÉRIEUR !
                </motion.h2>

                {/* Level number */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", damping: 10 }}
                  className="relative inline-block"
                >
                  <div className="text-8xl font-bold text-white mb-4">
                    {newLevel}
                  </div>
                  
                  {/* Glow behind number */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-[#feca57] blur-3xl -z-10"
                  />
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-lg text-[#d4a574]"
                >
                  Vous devenez un explorateur légendaire !
                </motion.p>

                {/* Rewards preview */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="mt-6 flex items-center justify-center gap-4"
                >
                  <div className="bg-[#3a3429] border-2 border-[#d4a574] rounded-lg px-4 py-2">
                    <p className="text-sm text-[#d4a574]">Nouveau badge</p>
                    <p className="text-2xl">🏆</p>
                  </div>
                  <div className="bg-[#3a3429] border-2 border-[#d4a574] rounded-lg px-4 py-2">
                    <p className="text-sm text-[#d4a574]">Bonus XP</p>
                    <p className="text-xl text-white font-bold">+200</p>
                  </div>
                </motion.div>
              </div>

              {/* Explosion particles */}
              {[...Array(16)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    background: i % 2 === 0 ? "#feca57" : "#d4a574",
                    left: "50%",
                    top: "50%",
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: Math.cos((i * Math.PI * 2) / 16) * 150,
                    y: Math.sin((i * Math.PI * 2) / 16) * 150,
                    opacity: 0,
                    scale: [1, 2, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: 0.5,
                  }}
                />
              ))}

              {/* Spiraling stars */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`star-${i}`}
                  className="absolute"
                  style={{
                    left: "50%",
                    top: "50%",
                  }}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                  animate={{
                    x: Math.cos((i * Math.PI * 2) / 8 + Date.now() / 1000) * 100,
                    y: Math.sin((i * Math.PI * 2) / 8 + Date.now() / 1000) * 100,
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    rotate: 360,
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                >
                  <Star className="w-4 h-4 text-[#feca57]" fill="#feca57" />
                </motion.div>
              ))}
            </div>

            {/* Outer glow */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="absolute inset-0 bg-gradient-to-br from-[#d4a574] to-[#feca57] rounded-3xl blur-3xl -z-10"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
