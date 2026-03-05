import { Lock, CheckCircle2, Users, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface AreaProgress {
  id: string;
  name: string;
  progress: number;
  total: number;
  locked: boolean;
}

export function Community() {
  const [activeTab, setActiveTab] = useState<"streets" | "districts" | "badges">("streets");

  const streets: AreaProgress[] = [
    { id: "1", name: "Rue du Marché", progress: 100, total: 100, locked: false },
    { id: "2", name: "Avenue des Champs", progress: 75, total: 100, locked: false },
    { id: "3", name: "Boulevard Central", progress: 45, total: 100, locked: false },
    { id: "4", name: "Rue des Arts", progress: 0, total: 100, locked: true },
    { id: "5", name: "Place de la République", progress: 0, total: 100, locked: true },
  ];

  const districts: AreaProgress[] = [
    { id: "1", name: "Centre-ville", progress: 80, total: 100, locked: false },
    { id: "2", name: "Quartier historique", progress: 60, total: 100, locked: false },
    { id: "3", name: "Zone portuaire", progress: 30, total: 100, locked: false },
    { id: "4", name: "Colline verte", progress: 0, total: 100, locked: true },
  ];

  const friends = [
    { name: "Sophie", progress: 65, avatar: "👩" },
    { name: "Marc", progress: 48, avatar: "👨" },
    { name: "Julie", progress: 82, avatar: "👱‍♀️" },
  ];

  return (
    <div className="h-full bg-[#f5e6d3] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-[#2a2419] text-white p-6 border-b-4 border-[#8b6f47]">
        <h1 className="text-2xl font-serif mb-2">Communauté</h1>
        <p className="text-sm text-[#d4a574]">Explorez ensemble</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b-2 border-[#8b6f47] bg-white">
        {[
          { id: "streets" as const, label: "Rues" },
          { id: "districts" as const, label: "Quartiers" },
          { id: "badges" as const, label: "Badges" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 text-sm transition-colors ${
              activeTab === tab.id
                ? "bg-[#d4a574] text-white border-b-4 border-[#8b6f47]"
                : "text-[#2a2419]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {(activeTab === "streets" || activeTab === "districts") && (
          <div className="p-4">
            <h2 className="text-lg text-[#2a2419] font-serif mb-4">
              Collection {activeTab === "streets" ? "des rues" : "des quartiers"}
            </h2>
            <div className="space-y-3">
              {(activeTab === "streets" ? streets : districts).map((area, index) => (
                <motion.div
                  key={area.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white border-2 rounded-lg p-4 ${
                    area.locked ? "border-gray-400 opacity-60" : "border-[#8b6f47]"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-[#2a2419] font-semibold flex-1">{area.name}</h3>
                    {area.locked ? (
                      <Lock className="w-5 h-5 text-gray-400" />
                    ) : area.progress === 100 ? (
                      <CheckCircle2 className="w-5 h-5 text-[#6b8e23]" />
                    ) : null}
                  </div>

                  {!area.locked && (
                    <>
                      <div className="h-2 bg-[#d4c4a8] rounded-full overflow-hidden mb-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${area.progress}%` }}
                          transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                          className={`h-full ${
                            area.progress === 100 ? "bg-[#6b8e23]" : "bg-[#d4a574]"
                          }`}
                        />
                      </div>
                      <p className="text-xs text-[#8b6f47]">{area.progress}% complété</p>
                    </>
                  )}

                  {area.locked && (
                    <p className="text-xs text-gray-500">Complétez d'autres zones pour débloquer</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "badges" && (
          <div className="p-4 space-y-6">
            {/* Weekly Challenge */}
            <div className="bg-gradient-to-br from-[#6b8e23] to-[#556b1d] text-white rounded-lg p-5 border-2 border-[#8b6f47]">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-6 h-6" />
                <h2 className="text-lg font-serif">Défi de la semaine</h2>
              </div>
              <p className="text-sm mb-4 opacity-90">
                Explorer 10 nouvelles rues ensemble
              </p>

              {/* Collective Progress */}
              <div className="bg-white/20 rounded-lg p-3 mb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Progression collective</span>
                  <span className="text-sm font-bold">7/10</span>
                </div>
                <div className="h-3 bg-white/30 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "70%" }}
                    transition={{ duration: 1 }}
                    className="h-full bg-white"
                  />
                </div>
              </div>

              {/* Personal Contribution */}
              <div className="flex items-center justify-between text-sm">
                <span className="opacity-90">Votre contribution</span>
                <span className="font-semibold">2 rues</span>
              </div>
            </div>

            {/* Friends Section */}
            <div>
              <h2 className="text-lg text-[#2a2419] font-serif mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Amis explorateurs
              </h2>
              <div className="space-y-3">
                {friends.map((friend, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white border-2 border-[#8b6f47] rounded-lg p-4"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-[#d4a574] border-2 border-[#8b6f47] flex items-center justify-center text-xl">
                        {friend.avatar}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-[#2a2419] font-semibold">{friend.name}</h3>
                        <p className="text-xs text-[#8b6f47]">Niveau {Math.floor(friend.progress / 10)}</p>
                      </div>
                    </div>
                    <div className="h-2 bg-[#d4c4a8] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${friend.progress}%` }}
                        transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                        className="h-full bg-[#6b8e23]"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Note */}
            <div className="bg-[#d4a574]/20 border-2 border-[#d4a574] rounded-lg p-4">
              <p className="text-sm text-[#2a2419] text-center">
                💡 Explorez ensemble sans compétition !
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
