import { motion, AnimatePresence } from "motion/react";
import { Sparkles } from "lucide-react";

interface XPNotificationProps {
  show: boolean;
  amount: number;
  message: string;
}

export function XPNotification({ show, amount, message }: XPNotificationProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -50, opacity: 0, scale: 0.5 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.5 }}
          className="absolute top-32 left-1/2 -translate-x-1/2 z-30"
        >
          <div className="bg-gradient-to-br from-[#feca57] to-[#f7b731] border-4 border-[#8b6f47] rounded-2xl px-6 py-4 shadow-2xl">
            {/* Sparkle Effects */}
            <div className="absolute -top-2 -left-2">
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-6 h-6 text-white" fill="white" />
              </motion.div>
            </div>
            <div className="absolute -bottom-2 -right-2">
              <motion.div
                animate={{ rotate: -360, scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <Sparkles className="w-6 h-6 text-white" fill="white" />
              </motion.div>
            </div>

            {/* Content */}
            <div className="text-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold text-white mb-1"
              >
                +{amount} XP
              </motion.div>
              <div className="text-sm text-[#2a2419] font-semibold">{message}</div>
            </div>

            {/* Particle Effects */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: 0, y: 0, opacity: 1 }}
                animate={{
                  x: Math.cos((i * Math.PI * 2) / 6) * 60,
                  y: Math.sin((i * Math.PI * 2) / 6) * 60,
                  opacity: 0,
                }}
                transition={{ duration: 1, delay: 0.2 }}
                className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full"
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
