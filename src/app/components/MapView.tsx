import { Compass, Navigation } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { MapHeader } from "./MapHeader";
import { DailyMissions } from "./DailyMissions";
import { XPNotification } from "./XPNotification";
import { ComboStreak } from "./ComboStreak";
import { DiscoveryAnimation } from "./DiscoveryAnimation";
import { AmbientParticles } from "./AmbientParticles";
import { LevelUpAnimation } from "./LevelUpAnimation";
import { AchievementToast } from "./AchievementToast";

interface QuestPin {
  id: string;
  x: number;
  y: number;
  title: string;
  rarity?: "common" | "rare" | "epic";
}

interface MapViewProps {
  questPins: QuestPin[];
  onPinClick: (pin: QuestPin) => void;
}

export function MapView({ questPins, onPinClick }: MapViewProps) {
  const [showXPNotif, setShowXPNotif] = useState(false);
  const [showCombo, setShowCombo] = useState(false);
  const [showDiscovery, setShowDiscovery] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showAchievement, setShowAchievement] = useState(false);

  // Simulate animations on mount (for demo)
  useState(() => {
    // XP notification
    setTimeout(() => {
      setShowXPNotif(true);
      setTimeout(() => setShowXPNotif(false), 2000);
    }, 1000);

    // Combo animation
    setTimeout(() => {
      setShowCombo(true);
      setTimeout(() => setShowCombo(false), 2500);
    }, 3500);

    // Discovery animation
    setTimeout(() => {
      setShowDiscovery(true);
      setTimeout(() => setShowDiscovery(false), 3000);
    }, 6500);

    // Achievement toast
    setTimeout(() => {
      setShowAchievement(true);
      setTimeout(() => setShowAchievement(false), 4000);
    }, 10000);

    // Level up animation (optional - uncomment to see)
    // setTimeout(() => {
    //   setShowLevelUp(true);
    //   setTimeout(() => setShowLevelUp(false), 4000);
    // }, 10000);
  });

  const rarityColors = {
    common: "#d4a574",
    rare: "#4a9eff",
    epic: "#9b59b6",
  };

  return (
    <div className="relative w-full h-full bg-[#d4c4a8] overflow-hidden">
      {/* Ambient Particles */}
      <AmbientParticles />

      {/* Map Header with XP Bar */}
      <MapHeader
        level={8}
        currentXP={840}
        nextLevelXP={1500}
        streak={7}
        todayXP={120}
      />

      {/* Daily Missions */}
      <DailyMissions />

      {/* XP Notification */}
      <XPNotification show={showXPNotif} amount={50} message="Zone découverte !" />

      {/* Combo Streak */}
      <ComboStreak show={showCombo} combo={3} />

      {/* Discovery Animation */}
      <DiscoveryAnimation show={showDiscovery} title="Rue des Arts" type="street" />

      {/* Level Up Animation */}
      <LevelUpAnimation show={showLevelUp} newLevel={9} />

      {/* Achievement Toast */}
      <AchievementToast show={showAchievement} title="Premier kilomètre !" icon="🎖️" />

      {/* Map Background with vintage texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 111, 71, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 111, 71, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Decorative compass rose - Enhanced */}
      <div className="absolute top-6 left-4 z-10">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="relative"
        >
          {/* Compass Circle */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-[#f5e6d3] to-[#e5d6c3] border-4 border-[#8b6f47] flex items-center justify-center shadow-2xl"
          >
            <Compass className="w-9 h-9 text-[#6b8e23]" />
          </motion.div>

          {/* Directional markers */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 text-xs font-bold text-[#2a2419]">N</div>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-xs font-bold text-[#8b6f47]">S</div>
          <div className="absolute top-1/2 -left-2 -translate-y-1/2 text-xs font-bold text-[#8b6f47]">O</div>
          <div className="absolute top-1/2 -right-2 -translate-y-1/2 text-xs font-bold text-[#8b6f47]">E</div>

          {/* Glow effect */}
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 bg-[#6b8e23] rounded-full blur-xl -z-10"
          />
        </motion.div>
      </div>

      {/* Streets - enhanced */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.3 }}>
        <defs>
          <filter id="roadGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <path
          d="M 0 200 Q 150 180 300 200 T 600 200"
          stroke="#8b6f47"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          filter="url(#roadGlow)"
        />
        <path
          d="M 150 0 Q 170 150 150 300 T 150 600"
          stroke="#8b6f47"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          filter="url(#roadGlow)"
        />
        <path
          d="M 0 400 Q 200 380 400 400"
          stroke="#8b6f47"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 300 0 L 300 600"
          stroke="#8b6f47"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      {/* Exploration zones - Enhanced with fog of war effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute top-[20%] left-[30%] w-40 h-40"
      >
        <div className="relative w-full h-full">
          <motion.div
            animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-[#6b8e23] blur-2xl"
          />
          <div className="absolute inset-0 rounded-full bg-[#6b8e23]/10 border-2 border-[#6b8e23]/30 border-dashed" />
          {/* Zone label */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#f5e6d3] border-2 border-[#6b8e23] rounded-lg px-2 py-1 text-xs text-[#2a2419] font-semibold whitespace-nowrap">
            Zone A
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="absolute top-[50%] left-[60%] w-32 h-32"
      >
        <div className="relative w-full h-full">
          <motion.div
            animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            className="absolute inset-0 rounded-full bg-[#b8860b] blur-2xl"
          />
          <div className="absolute inset-0 rounded-full bg-[#b8860b]/10 border-2 border-[#b8860b]/30 border-dashed" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="absolute top-[65%] left-[20%] w-36 h-36"
      >
        <div className="relative w-full h-full">
          <motion.div
            animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, delay: 2 }}
            className="absolute inset-0 rounded-full bg-[#6b8e23] blur-2xl"
          />
          <div className="absolute inset-0 rounded-full bg-[#6b8e23]/10 border-2 border-[#6b8e23]/30 border-dashed" />
        </div>
      </motion.div>

      {/* Quest Pins - ENHANCED */}
      {questPins.map((pin, index) => {
        const rarity = pin.rarity || "common";
        const pinColor = rarityColors[rarity];

        return (
          <motion.button
            key={pin.id}
            initial={{ scale: 0, y: -50 }}
            animate={{ scale: 1, y: 0 }}
            transition={{
              type: "spring",
              damping: 15,
              stiffness: 200,
              delay: index * 0.15,
            }}
            whileHover={{ scale: 1.3, zIndex: 100 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onPinClick(pin)}
            className="absolute"
            style={{
              left: `${pin.x}%`,
              top: `${pin.y}%`,
              transform: "translate(-50%, -100%)",
            }}
          >
            <div className="relative">
              {/* Flag pin - Enhanced */}
              <motion.svg
                width="50"
                height="60"
                viewBox="0 0 50 60"
                className="drop-shadow-2xl"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
              >
                {/* Pole */}
                <line
                  x1="12"
                  y1="8"
                  x2="12"
                  y2="55"
                  stroke="#8b6f47"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                {/* Flag */}
                <motion.path
                  d="M 12 8 L 42 13 L 42 28 L 12 33 Z"
                  fill={pinColor}
                  stroke="#8b6f47"
                  strokeWidth="3"
                  animate={{ scaleX: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ transformOrigin: "12px center" }}
                />
                {/* Icon on flag */}
                <text
                  x="27"
                  y="24"
                  fontSize="14"
                  textAnchor="middle"
                  fill="white"
                >
                  ⚔
                </text>
                {/* Base */}
                <circle cx="12" cy="55" r="5" fill="#8b6f47" />
              </motion.svg>

              {/* Multiple pulse rings */}
              <motion.div
                className="absolute top-8 left-1/2 w-12 h-12 rounded-full border-2 -translate-x-1/2 -translate-y-1/2"
                style={{ borderColor: pinColor }}
                animate={{
                  scale: [1, 2],
                  opacity: [0.8, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
              <motion.div
                className="absolute top-8 left-1/2 w-12 h-12 rounded-full border-2 -translate-x-1/2 -translate-y-1/2"
                style={{ borderColor: pinColor }}
                animate={{
                  scale: [1, 2],
                  opacity: [0.8, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 1,
                }}
              />

              {/* Glow */}
              <motion.div
                className="absolute top-8 left-1/2 w-16 h-16 rounded-full -translate-x-1/2 -translate-y-1/2 blur-xl -z-10"
                style={{ backgroundColor: pinColor }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Floating particles */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-white"
                  style={{
                    left: "50%",
                    top: "20px",
                  }}
                  animate={{
                    y: [-20, -40],
                    x: [0, (i - 1) * 10],
                    opacity: [1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
              ))}
            </div>
          </motion.button>
        );
      })}

      {/* Player position (center) - ENHANCED */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        {/* Outer pulse rings */}
        <motion.div
          className="absolute inset-0 w-24 h-24 rounded-full border-4 border-[#4a7c59] -translate-x-1/2 -translate-y-1/2"
          style={{ left: "50%", top: "50%" }}
          animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-0 w-24 h-24 rounded-full border-4 border-[#4a7c59] -translate-x-1/2 -translate-y-1/2"
          style={{ left: "50%", top: "50%" }}
          animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />

        {/* Player marker */}
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#4a7c59] to-[#3a5c44] border-4 border-white shadow-2xl flex items-center justify-center"
        >
          <Navigation className="w-7 h-7 text-white" fill="white" />
          
          {/* Glow */}
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-[#4a7c59] rounded-full blur-lg -z-10"
          />
        </motion.div>

        {/* Direction indicator */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[12px] border-b-[#4a7c59]" />
        </motion.div>
      </div>
    </div>
  );
}
