import { Clock, MapPin, Award, Lock, ChevronUp, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface Quest {
  id: string;
  title: string;
  distance: string;
  duration: string;
  points: number;
  locked?: boolean;
}

interface QuestPanelProps {
  quests: Quest[];
  onQuestClick: (quest: Quest) => void;
}

export function QuestPanel({ quests, onQuestClick }: QuestPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={false}
      animate={{ y: isExpanded ? 0 : "calc(100% - 140px)" }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      className="fixed bottom-16 left-0 right-0 z-30 bg-[#f5e6d3] border-t-4 border-[#8b6f47] rounded-t-3xl shadow-2xl max-w-md mx-auto"
      style={{ height: "calc(100vh - 64px)" }}
    >
      {/* Handle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full py-3 flex flex-col items-center relative"
      >
        {/* Shine effect */}
        <motion.div
          animate={{ x: [-100, 400] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          style={{ width: "30%" }}
        />
        
        <ChevronUp
          className={`w-6 h-6 text-[#8b6f47] transition-transform ${
            isExpanded ? "" : "rotate-180"
          }`}
        />
        <div className="flex items-center gap-2 mt-1">
          <Sparkles className="w-4 h-4 text-[#d4a574]" />
          <span className="text-sm text-[#2a2419] font-semibold">Quêtes proches</span>
          <Sparkles className="w-4 h-4 text-[#d4a574]" />
        </div>
      </button>

      {/* Content */}
      <div className="overflow-y-auto px-4 pb-4" style={{ height: "calc(100% - 60px)" }}>
        <div className="space-y-3">
          {quests.map((quest, index) => (
            <motion.button
              key={quest.id}
              onClick={() => !quest.locked && onQuestClick(quest)}
              disabled={quest.locked}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={!quest.locked ? { scale: 1.02, x: 5 } : {}}
              whileTap={!quest.locked ? { scale: 0.98 } : {}}
              className={`relative w-full bg-white border-2 border-[#8b6f47] rounded-lg p-4 text-left transition-all overflow-hidden ${
                quest.locked
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:shadow-xl hover:border-[#d4a574]"
              }`}
            >
              {/* Shine effect on hover */}
              {!quest.locked && (
                <motion.div
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "200%" }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4a574]/20 to-transparent"
                />
              )}

              <div className="flex items-start justify-between mb-2 relative z-10">
                <h4 className="text-lg text-[#2a2419] font-serif flex-1">
                  {quest.title}
                </h4>
                {quest.locked && <Lock className="w-5 h-5 text-[#8b6f47] ml-2" />}
              </div>
              
              <div className="flex items-center gap-4 text-sm relative z-10">
                <div className="flex items-center gap-1 text-[#6b8e23]">
                  <MapPin className="w-4 h-4" />
                  <span>{quest.distance}</span>
                </div>
                <div className="flex items-center gap-1 text-[#b8860b]">
                  <Clock className="w-4 h-4" />
                  <span>{quest.duration}</span>
                </div>
                <div className="flex items-center gap-1 text-[#d4a574]">
                  <Award className="w-4 h-4" />
                  <span>+{quest.points}</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
