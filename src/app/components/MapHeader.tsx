import { Zap, Flame, Star, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

interface MapHeaderProps {
  level: number;
  currentXP: number;
  nextLevelXP: number;
  streak: number;
  todayXP: number;
}

export function MapHeader({ level, currentXP, nextLevelXP, streak, todayXP }: MapHeaderProps) {
  const xpPercentage = (currentXP / nextLevelXP) * 100;

  return (
    <div className="absolute top-0 left-0 right-0 z-20 p-4">
      {/* Main Header Card */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className="bg-gradient-to-br from-[#2a2419]/95 to-[#3a3429]/95 backdrop-blur-sm border-4 border-[#8b6f47] rounded-2xl p-4 shadow-2xl"
      >
        {/* Level and Stats Row */}
        <div className="flex items-center justify-between mb-3">
          {/* Level Badge */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-gradient-to-br from-[#d4a574] to-[#b8860b] px-4 py-2 rounded-full border-2 border-[#8b6f47] shadow-lg"
          >
            <Star className="w-5 h-5 text-white" fill="white" />
            <span className="text-white font-bold text-lg">Niv. {level}</span>
          </motion.div>

          {/* Stats Mini */}
          <div className="flex gap-2">
            {/* Streak */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center gap-1 bg-gradient-to-br from-[#ff6b35] to-[#f7931e] px-3 py-1.5 rounded-full border-2 border-[#8b6f47] shadow-md"
            >
              <Flame className="w-4 h-4 text-white" fill="white" />
              <span className="text-white font-bold text-sm">{streak}</span>
            </motion.div>

            {/* Today XP */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-1 bg-gradient-to-br from-[#6b8e23] to-[#556b1d] px-3 py-1.5 rounded-full border-2 border-[#8b6f47] shadow-md"
            >
              <TrendingUp className="w-4 h-4 text-white" />
              <span className="text-white font-bold text-sm">+{todayXP}</span>
            </motion.div>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="relative">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#d4a574] font-semibold flex items-center gap-1">
              <Zap className="w-3 h-3" />
              EXPÉRIENCE
            </span>
            <span className="text-xs text-white font-mono">
              {currentXP} / {nextLevelXP} XP
            </span>
          </div>

          {/* Progress Bar Container */}
          <div className="relative h-4 bg-[#1a1410] rounded-full border-2 border-[#8b6f47] overflow-hidden shadow-inner">
            {/* Background Pattern */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 10px,
                  rgba(255,255,255,0.1) 10px,
                  rgba(255,255,255,0.1) 20px
                )`,
              }}
            />

            {/* XP Fill */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${xpPercentage}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#d4a574] via-[#f7b731] to-[#feca57] shadow-lg"
            >
              {/* Shine Effect */}
              <motion.div
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                style={{ width: "50%" }}
              />
            </motion.div>

            {/* Glow Effect */}
            <motion.div
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent to-[#feca57]/50 blur-sm"
              style={{ width: `${xpPercentage}%` }}
            />
          </div>

          {/* Level Up Preview */}
          <div className="flex items-center justify-between mt-1">
            <span className="text-[10px] text-[#8b6f47]">
              {nextLevelXP - currentXP} XP jusqu'au niveau {level + 1}
            </span>
            {xpPercentage > 80 && (
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-[10px] text-[#feca57] font-bold"
              >
                ⚡ Proche du niveau suivant !
              </motion.span>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
