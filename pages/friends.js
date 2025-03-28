import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useGame } from "../context/GameContext";
import Link from "next/link";
import Image from "next/image";
import { Howl } from "howler";
import Confetti from "react-confetti";
import { toast, Toaster } from "react-hot-toast";
import { FaGem, FaCrown, FaUserFriends, FaPalette, FaArrowLeft , FaWallet , FaChartLine , FaUserPlus   } from "react-icons/fa";

export default function FriendsPage() {
  const { inventory } = useGame();
  const [friends, setFriends] = useState([
    { id: 1, name: "PlayerOne", status: "Online", avatar: "/avatars/player1.png" },
    { id: 2, name: "GambleKing", status: "Offline", avatar: "/avatars/player2.png" },
  ]);
  const [tradeItem, setTradeItem] = useState(null);

  const handleTrade = (item) => {
    setTradeItem(item);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const [showThemeModal, setShowThemeModal] = useState(false);
  const [theme, setTheme] = useState("purple");
  const themes = {
    green: { primary: "#16a34a", secondary: "#22c55e" },
    blue: { primary: "#2563eb", secondary: "#3b82f6" },
    pink: { primary: "#ec4899", secondary: "#f472b6" },
    purple: { primary: "#9333ea", secondary: "#a855f7" },
    red: { primary: "#dc2626", secondary: "#ef4444" },
    orange: { primary: "#ea580c", secondary: "#f97316" },
  };

  const combinedStyles = `
    @import "tailwindcss";
    :root {
      --background: #ffffff;
      --foreground: #171717;
      --theme-primary: ${themes[theme].primary};
      --theme-secondary: ${themes[theme].secondary};
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --background: #0a0a0a;
        --foreground: #ededed;
      }
    }
    body {
      background: var(--background);
      color: var(--foreground);
      font-family: Arial, Helvetica, sans-serif;
    }
    @keyframes pulse-slow {
      0%, 100% { opacity: 0.6; }
      50% { opacity: 1; }
    }
    .animate-pulse-slow {
      animation: pulse-slow 4s infinite;
    }
    @keyframes spin-slow {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .animate-spin-slow {
      animation: spin-slow 10s linear infinite;
    }
    .border-theme { border-color: var(--theme-primary); }
    .bg-theme-primary { background-color: var(--theme-primary); }
    .bg-theme-secondary { background-color: var(--theme-secondary); }
    .hover\\:bg-theme-primary\\/80:hover { background-color: rgba(${parseInt(themes[theme].primary.slice(1), 16) >> 16}, ${parseInt(themes[theme].primary.slice(3, 5), 16)}, ${parseInt(themes[theme].primary.slice(5, 7), 16)}, 0.8); }
  `;

  return (
    <>
      <style>{combinedStyles}</style>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-indigo-900 flex flex-col items-center p-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(75,0,130,0.2),transparent_70%)] pointer-events-none animate-pulse-slow" />
        <motion.div
          className="w-full max-w-4xl bg-gray-900/95 p-8 rounded-2xl shadow-2xl border border-indigo-500/30 relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-extrabold text-white bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
              Friends
            </h1>
            <Link href="/" className="text-indigo-300 hover:text-white transition-all duration-300 flex items-center">
              <FaArrowLeft className="mr-2" /> Back to Case Opener
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {friends.map((friend) => (
              <motion.div
                key={friend.id}
                className="bg-gray-800 p-4 rounded-xl border border-indigo-600/50 flex items-center justify-between"
                whileHover={{ scale: 1.03 }}
              >
                <div className="flex items-center">
                  <img src={friend.avatar} alt={friend.name} className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <p className="text-white font-semibold">{friend.name}</p>
                    <p className={`text-sm ${friend.status === "Online" ? "text-green-400" : "text-gray-500"}`}>
                      {friend.status}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleTrade(friend)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all"
                >
                  Trade
                </button>
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {tradeItem && (
              <motion.div
                className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="bg-gray-900 p-6 rounded-xl border border-indigo-500/50">
                  <h2 className="text-2xl font-bold text-white mb-4">Trade with {tradeItem.name}</h2>
                  <p className="text-gray-300 mb-4">Select an item from your inventory:</p>
                  <div className="grid grid-cols-3 gap-4 max-h-64 overflow-y-auto">
                    {inventory.map((item, idx) => (
                      <motion.div
                        key={idx}
                        className="bg-gray-800 p-2 rounded-lg cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                        onClick={() => {
                          toast.success(`Trade request sent to ${tradeItem.name}!`); // Updated to react-hot-toast
                          setTradeItem(null);
                        }}
                      >
                        <img src={item.image} alt={item.name} className="w-16 h-16 mx-auto" />
                        <p className="text-white text-center text-sm">{item.name}</p>
                      </motion.div>
                    ))}
                  </div>
                  <button
                    onClick={() => setTradeItem(null)}
                    className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8">
            <motion.button
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <FaUserPlus className="mr-2 inline" /> Add Friend
            </motion.button>
          </div>
        </motion.div>
        <div className="fixed bottom-8 right-8 flex flex-col space-y-4 z-20">
        <motion.button className="bg-indigo-600 p-4 rounded-full shadow-lg" whileHover={{ scale: 1.1 }} onClick={() => toast("Live chat coming soon!")}>
          <FaUserFriends className="text-white" size={24} />
        </motion.button>
        <Link href="/subscription">
          <motion.button className="bg-theme-primary p-4 rounded-full shadow-lg" whileHover={{ scale: 1.1 }}>
            <FaCrown className="text-white" size={24} />
          </motion.button>
        </Link>
        <motion.button className="bg-theme-secondary p-4 rounded-full shadow-lg" whileHover={{ scale: 1.1 }} onClick={() => setShowThemeModal(true)}>
          <FaPalette className="text-white" size={24} />
        </motion.button>
      </div>

      {/* Theme Modal */}
      <AnimatePresence>
        {showThemeModal && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-gray-900 p-6 rounded-xl border border-theme">
              <h2 className="text-2xl font-bold text-white mb-4">Choose Theme</h2>
              <div className="grid grid-cols-3 gap-4">
                {Object.keys(themes).map((themeName) => (
                  <motion.button
                    key={themeName}
                    className="bg-theme-primary text-white px-4 py-2 rounded-lg hover:bg-theme-primary/80 transition-all"
                    style={{ backgroundColor: themes[themeName].primary }}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => {
                      setTheme(themeName);
                      setShowThemeModal(false);
                    }}
                  >
                    {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
                  </motion.button>
                ))}
              </div>
              <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all" onClick={() => setShowThemeModal(false)}>
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>   
      </div>
      <Toaster /> {/* Added Toaster for react-hot-toast */}
    </>
  );
}