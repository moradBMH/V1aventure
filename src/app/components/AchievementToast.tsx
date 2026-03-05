import { motion, AnimatePresence } from "motion/react";
import { Award } from "lucide-react";

interface AchievementToastProps {
  show: boolean;
  title: string;
  icon?: string;
}

export function AchievementToast({ show, title, icon = "🏆" }: AchievementToastProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed top-32 right-4 z-30"
        >
          <div className="bg-gradient-to-r from-[#2a2419] to-[#3a3429] border-3 border-[#d4a574] rounded-xl p-4 shadow-2xl min-w-[200px]">
            <div className="flex items-center gap-3">
              {/* Icon */}
              <motion.div
                animate={{
                  rotate: [0, -10, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 0.5, repeat: 2 }}
                className="text-3xl"
              >
                {icon}
              </motion.div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-1 mb-1">
                  <Award className="w-4 h-4 text-[#feca57]" />
                  <span className="text-xs text-[#d4a574] uppercase tracking-wide font-semibold">
                    Succès débloqué
                  </span>
                </div>
                <p className="text-sm text-white font-semibold">{title}</p>
              </div>
            </div>

            {/* Progress bar animation */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 3 }}
              className="h-1 bg-gradient-to-r from-[#d4a574] to-[#feca57] rounded-full mt-3 origin-left"
            />

            {/* Glow effect */}
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
              className="absolute inset-0 bg-[#d4a574] rounded-xl blur-xl -z-10"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
