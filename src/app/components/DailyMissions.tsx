import { CheckCircle2, Circle, Gift } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface Mission {
  id: string;
  title: string;
  progress: number;
  total: number;
  xp: number;
}

export function DailyMissions() {
  const [isExpanded, setIsExpanded] = useState(false);

  const missions: Mission[] = [
    { id: "1", title: "Parcourir 2 km", progress: 1.2, total: 2, xp: 30 },
    { id: "2", title: "Compléter 1 quête", progress: 0, total: 1, xp: 50 },
    { id: "3", title: "Découvrir 3 zones", progress: 2, total: 3, xp: 40 },
  ];

  const completedCount = missions.filter((m) => m.progress >= m.total).length;

  return (
    <div className="absolute top-[180px] right-4 z-20">
      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="relative"
      >
        {/* Main Badge */}
        <div className="bg-gradient-to-br from-[#6b8e23] to-[#556b1d] border-4 border-[#8b6f47] rounded-2xl p-3 shadow-2xl">
          <Gift className="w-6 h-6 text-white" />
          
          {/* Counter Badge */}
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-2 -right-2 bg-[#ff6b35] border-2 border-[#8b6f47] rounded-full w-7 h-7 flex items-center justify-center"
          >
            <span className="text-white text-xs font-bold">
              {completedCount}/{missions.length}
            </span>
          </motion.div>
        </div>

        {/* Glow Effect */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-[#6b8e23] rounded-2xl blur-xl -z-10"
        />
      </motion.button>

      {/* Expanded Panel */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, x: 20, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 20, scale: 0.9 }}
          className="absolute top-0 right-full mr-4 w-64"
        >
          <div className="bg-[#f5e6d3] border-4 border-[#8b6f47] rounded-2xl p-4 shadow-2xl">
            <h3 className="text-lg font-serif text-[#2a2419] mb-3 border-b-2 border-[#8b6f47] pb-2">
              Missions du jour
            </h3>
            <div className="space-y-2">
              {missions.map((mission) => {
                const isCompleted = mission.progress >= mission.total;
                const percentage = (mission.progress / mission.total) * 100;

                return (
                  <div key={mission.id} className="bg-white border-2 border-[#8b6f47] rounded-lg p-3">
                    <div className="flex items-start gap-2 mb-2">
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-[#6b8e23] flex-shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="w-5 h-5 text-[#8b6f47] flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className={`text-sm text-[#2a2419] ${isCompleted ? "line-through" : ""}`}>
                          {mission.title}
                        </p>
                        <p className="text-xs text-[#d4a574] font-semibold">+{mission.xp} XP</p>
                      </div>
                    </div>
                    <div className="h-1.5 bg-[#d4c4a8] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(percentage, 100)}%` }}
                        className={`h-full ${
                          isCompleted ? "bg-[#6b8e23]" : "bg-[#d4a574]"
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
