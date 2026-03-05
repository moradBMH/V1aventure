import { Clock, MapPin, Award, Lock, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

interface Quest {
  id: string;
  title: string;
  distance: string;
  duration: string;
  points: number;
  difficulty: "Facile" | "Moyen" | "Difficile";
  locked?: boolean;
  category: string;
}

interface QuestsListProps {
  onQuestClick: (questId: string) => void;
}

export function QuestsList({ onQuestClick }: QuestsListProps) {
  const quests: Quest[] = [
    {
      id: "1",
      title: "Explorer les ruelles",
      distance: "0.3 km",
      duration: "20 min",
      points: 50,
      difficulty: "Facile",
      category: "Découverte",
    },
    {
      id: "2",
      title: "Le circuit des places",
      distance: "1.2 km",
      duration: "45 min",
      points: 120,
      difficulty: "Moyen",
      category: "Exploration",
    },
    {
      id: "3",
      title: "Quartier historique",
      distance: "2.5 km",
      duration: "1h 30min",
      points: 200,
      difficulty: "Moyen",
      category: "Histoire",
    },
    {
      id: "4",
      title: "Safari urbain",
      distance: "3.8 km",
      duration: "2h",
      points: 350,
      difficulty: "Difficile",
      category: "Aventure",
      locked: true,
    },
    {
      id: "5",
      title: "Les jardins cachés",
      distance: "1.8 km",
      duration: "1h",
      points: 150,
      difficulty: "Facile",
      category: "Nature",
    },
  ];

  const difficultyColor = {
    Facile: "#6b8e23",
    Moyen: "#b8860b",
    Difficile: "#cd5c5c",
  };

  return (
    <div className="h-full bg-[#f5e6d3] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-[#2a2419] text-white p-6 border-b-4 border-[#8b6f47]">
        <h1 className="text-2xl font-serif mb-2">Quêtes disponibles</h1>
        <p className="text-sm text-[#d4a574]">Choisissez votre prochaine aventure</p>
      </div>

      {/* Quest List */}
      <div className="flex-1 overflow-y-auto p-4 pb-20">
        <div className="space-y-4">
          {quests.map((quest, index) => (
            <motion.button
              key={quest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => !quest.locked && onQuestClick(quest.id)}
              disabled={quest.locked}
              className={`w-full bg-white border-2 rounded-lg p-4 text-left transition-all ${
                quest.locked
                  ? "border-gray-400 opacity-60 cursor-not-allowed"
                  : "border-[#8b6f47] hover:shadow-lg hover:scale-[1.02]"
              }`}
            >
              {/* Category Tag */}
              <div className="flex items-center justify-between mb-2">
                <span
                  className="text-xs px-2 py-1 rounded-full text-white"
                  style={{ backgroundColor: difficultyColor[quest.difficulty] }}
                >
                  {quest.category}
                </span>
                {quest.locked && <Lock className="w-5 h-5 text-gray-400" />}
                {!quest.locked && <ChevronRight className="w-5 h-5 text-[#8b6f47]" />}
              </div>

              {/* Title */}
              <h3 className="text-xl text-[#2a2419] font-serif mb-3">{quest.title}</h3>

              {/* Stats */}
              <div className="flex items-center gap-4 mb-3 text-sm">
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

              {/* Difficulty Badge */}
              <div className="flex items-center gap-2">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: difficultyColor[quest.difficulty] }}
                />
                <span className="text-xs text-[#8b6f47]">{quest.difficulty}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
