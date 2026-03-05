import { CheckCircle2, Circle, Timer, Activity, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

interface ActiveSessionProps {
  questTitle: string;
  steps: string[];
  completedSteps: number;
  onBack: () => void;
}

export function ActiveSession({ questTitle, steps, completedSteps, onBack }: ActiveSessionProps) {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="h-full bg-[#f5e6d3] flex flex-col">
      {/* Header */}
      <div className="bg-[#2a2419] text-white p-4 border-b-4 border-[#8b6f47]">
        <button onClick={onBack} className="text-[#d4a574] mb-2">
          ← Retour
        </button>
        <h2 className="text-xl font-serif">{questTitle}</h2>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm text-[#d4a574]">
            {completedSteps} / {steps.length} étapes
          </span>
        </div>
      </div>

      {/* Main Stats */}
      <div className="bg-gradient-to-b from-[#2a2419] to-[#3a3429] p-6 border-b-4 border-[#8b6f47]">
        <div className="text-center mb-6">
          <Timer className="w-8 h-8 text-[#d4a574] mx-auto mb-2" />
          <div className="text-5xl text-white font-mono">{formatTime(timer)}</div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <Activity className="w-6 h-6 text-[#6b8e23] mx-auto mb-1" />
            <div className="text-2xl text-white">{(timer * 0.08).toFixed(2)}</div>
            <div className="text-xs text-[#d4a574]">km</div>
          </div>
          <div className="text-center">
            <Timer className="w-6 h-6 text-[#b8860b] mx-auto mb-1" />
            <div className="text-2xl text-white">{Math.floor(timer / 60)}</div>
            <div className="text-xs text-[#d4a574]">min</div>
          </div>
          <div className="text-center">
            <TrendingUp className="w-6 h-6 text-[#d4a574] mx-auto mb-1" />
            <div className="text-2xl text-white">4.8</div>
            <div className="text-xs text-[#d4a574]">km/h</div>
          </div>
        </div>
      </div>

      {/* Mini Map */}
      <div className="p-4 border-b-4 border-[#8b6f47]">
        <div className="bg-[#d4c4a8] rounded-lg p-4 border-2 border-[#8b6f47] h-32 relative overflow-hidden">
          <svg className="w-full h-full">
            <motion.path
              d="M 10 60 Q 50 40, 100 50 T 200 60 T 280 55"
              stroke="#4a7c59"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: completedSteps / steps.length }}
              transition={{ duration: 1 }}
            />
            <circle cx="280" cy="55" r="6" fill="#4a7c59" />
          </svg>
          <p className="text-xs text-[#2a2419] mt-2">Trace du parcours</p>
        </div>
      </div>

      {/* Quest Progress */}
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="text-lg text-[#2a2419] font-serif mb-4 border-b-2 border-[#8b6f47] pb-2">
          Progression de la quête
        </h3>

        <div className="space-y-3">
          {steps.map((step, index) => {
            const isCompleted = index < completedSteps;
            const isCurrent = index === completedSteps;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-start gap-3 p-3 rounded-lg border-2 ${
                  isCompleted
                    ? "bg-[#6b8e23]/20 border-[#6b8e23]"
                    : isCurrent
                    ? "bg-[#d4a574]/20 border-[#d4a574]"
                    : "bg-white border-[#8b6f47]"
                }`}
              >
                <div className="flex-shrink-0 pt-0.5">
                  {isCompleted ? (
                    <CheckCircle2 className="w-6 h-6 text-[#6b8e23]" />
                  ) : (
                    <Circle className={`w-6 h-6 ${isCurrent ? "text-[#d4a574]" : "text-[#8b6f47]"}`} />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-[#8b6f47]">Étape {index + 1}</span>
                  </div>
                  <p className={`text-[#2a2419] ${isCompleted ? "line-through opacity-60" : ""}`}>
                    {step}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
