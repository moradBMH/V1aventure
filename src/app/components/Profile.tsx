import { Award, TrendingUp, MapPin, Target, Trophy } from "lucide-react";
import { motion } from "motion/react";

interface Badge {
  id: string;
  name: string;
  icon: string;
  earned: boolean;
}

export function Profile() {
  const badges: Badge[] = [
    { id: "1", name: "Explorateur", icon: "🗺️", earned: true },
    { id: "2", name: "Marcheur", icon: "🚶", earned: true },
    { id: "3", name: "Aventurier", icon: "⛰️", earned: true },
    { id: "4", name: "Découvreur", icon: "🧭", earned: true },
    { id: "5", name: "Pionnier", icon: "🏕️", earned: false },
    { id: "6", name: "Cartographe", icon: "📍", earned: false },
  ];

  const stats = [
    { label: "Quêtes complétées", value: "12", icon: Target },
    { label: "Distance parcourue", value: "45.2 km", icon: MapPin },
    { label: "Temps actif", value: "8h 20min", icon: TrendingUp },
    { label: "Zones explorées", value: "7/15", icon: Award },
  ];

  return (
    <div className="h-full bg-[#f5e6d3] overflow-y-auto pb-20">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#2a2419] to-[#3a3429] text-white p-6 border-b-4 border-[#8b6f47]">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 rounded-full bg-[#d4a574] border-4 border-[#8b6f47] flex items-center justify-center text-3xl">
            🧭
          </div>
          <div>
            <h1 className="text-2xl font-serif">Explorateur</h1>
            <p className="text-[#d4a574]">Niveau 8</p>
          </div>
        </div>

        {/* Points Display */}
        <div className="bg-[#2a2419] rounded-lg p-4 border-2 border-[#8b6f47]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[#d4a574]">Points totaux</span>
            <Trophy className="w-5 h-5 text-[#d4a574]" />
          </div>
          <div className="text-4xl font-bold">1,240</div>
          <div className="mt-2 h-2 bg-[#8b6f47] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "65%" }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-full bg-[#d4a574]"
            />
          </div>
          <p className="text-xs text-[#d4a574] mt-1">260 points jusqu'au niveau 9</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="p-6 border-b-4 border-[#8b6f47]">
        <h2 className="text-xl text-[#2a2419] font-serif mb-4">Statistiques</h2>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border-2 border-[#8b6f47] rounded-lg p-4 text-center"
              >
                <Icon className="w-6 h-6 text-[#6b8e23] mx-auto mb-2" />
                <div className="text-2xl text-[#2a2419] font-bold">{stat.value}</div>
                <div className="text-xs text-[#8b6f47] mt-1">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Badges */}
      <div className="p-6">
        <h2 className="text-xl text-[#2a2419] font-serif mb-4">Badges obtenus</h2>
        <div className="grid grid-cols-3 gap-4">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={`aspect-square rounded-lg border-2 flex flex-col items-center justify-center p-3 ${
                badge.earned
                  ? "bg-gradient-to-br from-[#d4a574] to-[#b8860b] border-[#8b6f47]"
                  : "bg-gray-200 border-gray-400 opacity-50"
              }`}
            >
              <div className="text-3xl mb-1">{badge.icon}</div>
              <div className={`text-xs text-center ${badge.earned ? "text-white" : "text-gray-500"}`}>
                {badge.name}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Motivation Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 bg-[#6b8e23]/20 border-2 border-[#6b8e23] rounded-lg p-4"
        >
          <p className="text-[#2a2419] text-center">
            🌟 Continue d'explorer pour débloquer de nouveaux badges !
          </p>
        </motion.div>
      </div>
    </div>
  );
}
