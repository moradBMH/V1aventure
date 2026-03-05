import { Clock, MapPin, Award, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

interface QuestCardProps {
  title: string;
  distance: string;
  duration: string;
  points: number;
  onStart: () => void;
  onClose: () => void;
}

export function QuestCard({ title, distance, duration, points, onStart, onClose }: QuestCardProps) {
  return (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/40 z-40"
      />
      
      {/* Card */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed bottom-20 left-4 right-4 z-50 max-w-md mx-auto"
      >
        <div className="bg-[#f5e6d3] border-4 border-[#8b6f47] rounded-lg p-5 shadow-2xl">
          {/* Title */}
          <h3 className="text-2xl text-[#2a2419] mb-4 font-serif border-b-2 border-[#8b6f47] pb-2">
            {title}
          </h3>
          
          {/* Info Grid */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="flex flex-col items-center">
              <MapPin className="w-5 h-5 text-[#6b8e23] mb-1" />
              <span className="text-sm text-[#2a2419]">{distance}</span>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="w-5 h-5 text-[#b8860b] mb-1" />
              <span className="text-sm text-[#2a2419]">{duration}</span>
            </div>
            <div className="flex flex-col items-center">
              <Award className="w-5 h-5 text-[#d4a574] mb-1" />
              <span className="text-sm text-[#2a2419]">+{points} pts</span>
            </div>
          </div>
          
          {/* Button */}
          <button
            onClick={onStart}
            className="w-full bg-[#6b8e23] hover:bg-[#556b1d] text-white py-3 px-4 rounded-md flex items-center justify-center gap-2 transition-colors shadow-md"
          >
            <span className="font-semibold">Démarrer</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </>
  );
}
