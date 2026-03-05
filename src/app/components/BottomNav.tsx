import { MapPin, Target, Users, User } from "lucide-react";

interface BottomNavProps {
  activeTab: "map" | "quests" | "community" | "profile";
  onTabChange: (tab: "map" | "quests" | "community" | "profile") => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: "map" as const, icon: MapPin, label: "Carte" },
    { id: "quests" as const, icon: Target, label: "Quêtes" },
    { id: "community" as const, icon: Users, label: "Communauté" },
    { id: "profile" as const, icon: User, label: "Profil" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#2a2419] border-t-2 border-[#8b6f47] z-50">
      <div className="max-w-md mx-auto flex justify-around items-center h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive ? "text-[#d4a574]" : "text-[#8b6f47]"
              }`}
            >
              <Icon className={`w-6 h-6 mb-1 ${isActive ? "stroke-[2.5]" : ""}`} />
              <span className="text-xs">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
