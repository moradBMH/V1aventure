import { motion, AnimatePresence } from "motion/react";
import { MapPin, Star } from "lucide-react";

interface DiscoveryAnimationProps {
  show: boolean;
  title: string;
  type: "zone" | "street" | "landmark";
}

export function DiscoveryAnimation({ show, title, type }: DiscoveryAnimationProps) {
  const icons = {
    zone: "🗺️",
    street: "🛣️",
    landmark: "🏛️",
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
          {/* Background overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Main card */}
          <motion.div
            initial={{ y: 100, scale: 0.5, rotateX: -90 }}
            animate={{ y: 0, scale: 1, rotateX: 0 }}
            exit={{ y: -100, scale: 0.5, rotateX: 90 }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            className="relative z-10"
          >
            <div className="bg-gradient-to-br from-[#f5e6d3] to-[#e5d6c3] border-4 border-[#8b6f47] rounded-3xl p-8 shadow-2xl max-w-sm">
              {/* Stamp effect */}
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring", damping: 10 }}
                className="absolute -top-6 -right-6 bg-[#d4a574] border-4 border-[#8b6f47] rounded-full w-24 h-24 flex items-center justify-center shadow-xl"
              >
                <Star className="w-12 h-12 text-white" fill="white" />
              </motion.div>

              {/* Decorative corners */}
              <div className="absolute top-2 left-2 w-6 h-6 border-l-4 border-t-4 border-[#8b6f47]" />
              <div className="absolute top-2 right-2 w-6 h-6 border-r-4 border-t-4 border-[#8b6f47]" />
              <div className="absolute bottom-2 left-2 w-6 h-6 border-l-4 border-b-4 border-[#8b6f47]" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-r-4 border-b-4 border-[#8b6f47]" />

              {/* Content */}
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-6xl mb-4"
                >
                  {icons[type]}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h2 className="text-2xl font-serif text-[#2a2419] mb-2 border-b-2 border-[#8b6f47] pb-2">
                    Découverte !
                  </h2>
                  <p className="text-lg text-[#2a2419] font-semibold mb-4">{title}</p>
                  <div className="flex items-center justify-center gap-2 text-[#6b8e23]">
                    <MapPin className="w-5 h-5" />
                    <span className="text-sm">Ajouté à votre journal</span>
                  </div>
                </motion.div>
              </div>

              {/* Particle effects */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full bg-[#d4a574]"
                  initial={{ x: 0, y: 0, opacity: 1 }}
                  animate={{
                    x: Math.cos((i * Math.PI * 2) / 12) * 100,
                    y: Math.sin((i * Math.PI * 2) / 12) * 100,
                    opacity: 0,
                    scale: [1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: 0.5 + i * 0.05,
                  }}
                  style={{
                    left: "50%",
                    top: "50%",
                  }}
                />
              ))}
            </div>

            {/* Glow effect */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="absolute inset-0 bg-[#d4a574] rounded-3xl blur-3xl -z-10"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
