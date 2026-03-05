import { useState } from "react";
import { MapView } from "./components/MapView";
import { QuestCard } from "./components/QuestCard";
import { QuestPanel } from "./components/QuestPanel";
import { ActiveSession } from "./components/ActiveSession";
import { QuestDetail } from "./components/QuestDetail";
import { QuestsList } from "./components/QuestsList";
import { Profile } from "./components/Profile";
import { Community } from "./components/Community";
import { BottomNav } from "./components/BottomNav";

interface QuestData {
  id: string;
  title: string;
  description: string;
  distance: string;
  duration: string;
  difficulty: "Facile" | "Moyen" | "Difficile";
  points: number;
  impact: number;
  steps: string[];
  rewards: { type: string; value: string }[];
}

export default function App() {
  const [activeTab, setActiveTab] = useState<"map" | "quests" | "community" | "profile">("map");
  const [selectedQuestId, setSelectedQuestId] = useState<string | null>(null);
  const [showQuestDetail, setShowQuestDetail] = useState(false);
  const [activeQuestId, setActiveQuestId] = useState<string | null>(null);

  // Mock quest data
  const questsData: Record<string, QuestData> = {
    "1": {
      id: "1",
      title: "Explorer les ruelles",
      description: "Découvrez les ruelles cachées du centre-ville et leurs secrets. Cette quête vous emmènera à travers des passages étroits, des cours intérieures et des places secrètes que seuls les vrais explorateurs connaissent.",
      distance: "0.3 km",
      duration: "20 min",
      difficulty: "Facile",
      points: 50,
      impact: 5,
      steps: [
        "Rejoindre la place centrale",
        "Longer la rue du marché",
        "Terminer au parc",
      ],
      rewards: [
        { type: "Badge", value: "Explorateur" },
      ],
    },
    "2": {
      id: "2",
      title: "Le circuit des places",
      description: "Visitez les 5 places principales de la ville et découvrez leur histoire unique. Chaque place raconte une partie de l'histoire urbaine.",
      distance: "1.2 km",
      duration: "45 min",
      difficulty: "Moyen",
      points: 120,
      impact: 8,
      steps: [
        "Place de la République",
        "Place du Marché",
        "Place de l'Église",
        "Place des Arts",
        "Place centrale",
      ],
      rewards: [
        { type: "Badge", value: "Historien" },
      ],
    },
  };

  const questPins = [
    { id: "1", x: 35, y: 30, title: "Explorer les ruelles", rarity: "common" as const },
    { id: "2", x: 65, y: 55, title: "Le circuit des places", rarity: "rare" as const },
    { id: "3", x: 25, y: 70, title: "Quartier historique", rarity: "epic" as const },
  ];

  const nearbyQuests = [
    { id: "1", title: "Explorer les ruelles", distance: "0.3 km", duration: "20 min", points: 50 },
    { id: "2", title: "Le circuit des places", distance: "1.2 km", duration: "45 min", points: 120 },
    { id: "3", title: "Quartier historique", distance: "2.5 km", duration: "1h 30", points: 200 },
    { id: "4", title: "Safari urbain", distance: "3.8 km", duration: "2h", points: 350, locked: true },
  ];

  const handlePinClick = (pin: { id: string; title: string; x: number; y: number }) => {
    setSelectedQuestId(pin.id);
  };

  const handleQuestCardStart = () => {
    setShowQuestDetail(true);
  };

  const handleStartQuest = () => {
    setActiveQuestId(selectedQuestId);
    setShowQuestDetail(false);
    setSelectedQuestId(null);
  };

  const handleBackToMap = () => {
    setActiveQuestId(null);
    setActiveTab("map");
  };

  const handleQuestClick = (questId: string) => {
    setSelectedQuestId(questId);
    setShowQuestDetail(true);
  };

  const currentQuest = selectedQuestId ? questsData[selectedQuestId] : null;

  return (
    <div className="h-screen w-full max-w-md mx-auto bg-[#2a2419] relative overflow-hidden">
      {/* Main Content */}
      {activeQuestId ? (
        <ActiveSession
          questTitle={questsData[activeQuestId]?.title || "Quête active"}
          steps={questsData[activeQuestId]?.steps || []}
          completedSteps={1}
          onBack={handleBackToMap}
        />
      ) : showQuestDetail && currentQuest ? (
        <QuestDetail
          title={currentQuest.title}
          description={currentQuest.description}
          distance={currentQuest.distance}
          duration={currentQuest.duration}
          difficulty={currentQuest.difficulty}
          points={currentQuest.points}
          impact={currentQuest.impact}
          steps={currentQuest.steps}
          rewards={currentQuest.rewards}
          onStart={handleStartQuest}
          onBack={() => {
            setShowQuestDetail(false);
            setSelectedQuestId(null);
          }}
        />
      ) : (
        <>
          {activeTab === "map" && (
            <div className="h-full">
              <MapView questPins={questPins} onPinClick={handlePinClick} />
              <QuestPanel quests={nearbyQuests} onQuestClick={handleQuestClick} />
            </div>
          )}
          {activeTab === "quests" && <QuestsList onQuestClick={handleQuestClick} />}
          {activeTab === "community" && <Community />}
          {activeTab === "profile" && <Profile />}
        </>
      )}

      {/* Quest Card Overlay */}
      {selectedQuestId && !showQuestDetail && !activeQuestId && currentQuest && (
        <QuestCard
          title={currentQuest.title}
          distance={currentQuest.distance}
          duration={currentQuest.duration}
          points={currentQuest.points}
          onStart={handleQuestCardStart}
          onClose={() => setSelectedQuestId(null)}
        />
      )}

      {/* Bottom Navigation */}
      {!activeQuestId && !showQuestDetail && (
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      )}
    </div>
  );
}
