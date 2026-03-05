import { Clock, MapPin, Award, TrendingUp, ChevronRight, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

interface QuestDetailProps {
  title: string;
  description: string;
  distance: string;
  duration: string;
  difficulty: "Facile" | "Moyen" | "Difficile";
  points: number;
  impact: number;
  steps: string[];
  rewards: { type: string; value: string }[];
  onStart: () => void;
  onBack: () => void;
}

export function QuestDetail({
  title,
  description,
  distance,
  duration,
  difficulty,
  points,
  impact,
  steps,
  rewards,
  onStart,
  onBack,
}: QuestDetailProps) {
  const difficultyColor = {
    Facile: "#6b8e23",
    Moyen: "#b8860b",
    Difficile: "#cd5c5c",
  };

  return (
    <div className="h-full bg-[#f5e6d3] flex flex-col overflow-y-auto pb-20">
      {/* Hero Section */}
      <div className="relative bg-[#2a2419] text-white p-6 border-b-4 border-[#8b6f47]">
        <button onClick={onBack} className="text-[#d4a574] mb-4">
          ← Retour
        </button>
        
        <h1 className="text-3xl font-serif mb-4">{title}</h1>
        
        {/* Quick Stats */}
        <div className="flex gap-4 flex-wrap">
          <div className="flex items-center gap-2 bg-[#3a3429] px-3 py-2 rounded-md">
            <MapPin className="w-4 h-4 text-[#6b8e23]" />
            <span className="text-sm">{distance}</span>
          </div>
          <div className="flex items-center gap-2 bg-[#3a3429] px-3 py-2 rounded-md">
            <Clock className="w-4 h-4 text-[#b8860b]" />
            <span className="text-sm">{duration}</span>
          </div>
          <div className="flex items-center gap-2 bg-[#3a3429] px-3 py-2 rounded-md">
            <TrendingUp className="w-4 h-4" style={{ color: difficultyColor[difficulty] }} />
            <span className="text-sm">{difficulty}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="p-6 border-b-2 border-[#8b6f47]">
        <h2 className="text-xl text-[#2a2419] font-serif mb-3">Description</h2>
        <p className="text-[#2a2419]/80 leading-relaxed">{description}</p>
      </div>

      {/* Steps */}
      <div className="p-6 border-b-2 border-[#8b6f47]">
        <h2 className="text-xl text-[#2a2419] font-serif mb-4">Étapes</h2>
        <div className="space-y-3">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 bg-white border-2 border-[#8b6f47] rounded-lg p-3"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#d4a574] text-white flex items-center justify-center font-semibold">
                {index + 1}
              </div>
              <p className="text-[#2a2419] flex-1 pt-1">{step}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Rewards */}
      <div className="p-6">
        <h2 className="text-xl text-[#2a2419] font-serif mb-4">Récompenses</h2>
        <div className="grid grid-cols-2 gap-4">
          {rewards.map((reward, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-gradient-to-br from-[#d4a574] to-[#b8860b] text-white rounded-lg p-4 text-center border-2 border-[#8b6f47]"
            >
              <Award className="w-8 h-8 mx-auto mb-2" />
              <p className="font-semibold">{reward.value}</p>
              <p className="text-xs opacity-90">{reward.type}</p>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-[#6b8e23] to-[#556b1d] text-white rounded-lg p-4 text-center border-2 border-[#8b6f47]"
          >
            <CheckCircle2 className="w-8 h-8 mx-auto mb-2" />
            <p className="font-semibold">+{points} points</p>
            <p className="text-xs opacity-90">Points</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-[#4a7c59] to-[#3a5c44] text-white rounded-lg p-4 text-center border-2 border-[#8b6f47]"
          >
            <TrendingUp className="w-8 h-8 mx-auto mb-2" />
            <p className="font-semibold">+{impact} impact</p>
            <p className="text-xs opacity-90">Impact</p>
          </motion.div>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-16 left-0 right-0 p-4 bg-gradient-to-t from-[#f5e6d3] via-[#f5e6d3] to-transparent max-w-md mx-auto">
        <button
          onClick={onStart}
          className="w-full bg-[#6b8e23] hover:bg-[#556b1d] text-white py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-xl border-2 border-[#8b6f47]"
        >
          <span className="text-lg font-semibold">Démarrer la quête</span>
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
