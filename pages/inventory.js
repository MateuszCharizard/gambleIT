import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft, FaWallet, FaUserFriends, FaCrown, FaPalette } from "react-icons/fa";
import { supabase } from "../lib/supabase";
import { toast, Toaster } from "react-hot-toast";

export default function InventoryPage() {
  const [inventory, setInventory] = useState([]);
  const [filter, setFilter] = useState("All");
  const [user, setUser] = useState(null);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [theme, setTheme] = useState("purple");

  useEffect(() => {
    const fetchUserAndInventory = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        const { data } = await supabase
          .from('inventory')
          .select('*')
          .eq('user_id', user.id);
        setInventory(data || []);
      }
    };
    fetchUserAndInventory();

    const subscription = supabase
      .channel('inventory-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'inventory' }, (payload) => {
        fetchUserAndInventory();
      })
      .subscribe();

    return () => subscription.unsubscribe();
  }, []);

  const handleSell = async (item) => {
    if (!user) return;
    const { error } = await supabase
      .from('inventory')
      .delete()
      .eq('id', item.id);
    
    if (!error) {
      setInventory(inventory.filter(i => i.id !== item.id));
      toast.success(`Sold ${item.item_name} for ${item.value} Tokens!`);
    } else {
      toast.error('Failed to sell item');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const glowEffects = {
    "shadow-silver": "shadow-[0_0_15px_rgba(200,200,200,0.8)]",
    "shadow-emerald": "shadow-[0_0_20px_rgba(0,255,0,0.7)]",
    "shadow-sapphire": "shadow-[0_0_25px_rgba(0,0,255,0.8)]",
    "shadow-amethyst": "shadow-[0_0_30px_rgba(147,51,234,0.9)]",
    "shadow-golden": "shadow-[0_0_35px_rgba(255,215,0,1)]",
    "shadow-diamond": "shadow-[0_0_40px_rgba(0,255,255,1)]",
  };

  const filteredInventory = filter === "All" ? inventory : inventory.filter((item) => item.rarity === filter);

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

  if (!user) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <>
      <style>{combinedStyles}</style>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-indigo-900 flex flex-col items-center p-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(75,0,130,0.2),transparent_70%)] pointer-events-none animate-pulse-slow" />
        <motion.div
          className="w-full max-w-5xl bg-gray-900/95 p-8 rounded-2xl shadow-2xl border border-theme relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-extrabold text-white bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
              Inventory
            </h1>
            <Link href="/" className="text-indigo-300 hover:text-white transition-all duration-300 flex items-center">
              <FaArrowLeft className="mr-2" /> Back to Case Opener
            </Link>
          </div>

          <div className="flex space-x-4 mb-6">
            {["All", "Common", "Uncommon", "Rare", "Epic", "Legendary", "Mythic"].map((rarity) => (
              <button
                key={rarity}
                onClick={() => setFilter(rarity)}
                className={`px-4 py-2 rounded-lg ${filter === rarity ? "bg-indigo-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"} transition-all`}
              >
                {rarity}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-h-[60vh] overflow-y-auto">
            {filteredInventory.map((item) => (
              <motion.div
                key={item.id}
                className={`bg-gray-800 p-4 rounded-xl border-2 ${glowEffects[item.glow]} flex flex-col items-center`}
                whileHover={{ scale: 1.05 }}
              >
                <Image src={item.image} alt={item.item_name} width={100} height={100} className="object-contain mb-2" />
                <p className={`text-sm font-semibold ${item.color} text-center`}>{item.item_name}</p>
                <p className="text-gray-400 text-xs">{item.value} Tokens</p>
                <motion.button
                  onClick={() => handleSell(item)}
                  className="mt-2 bg-green-600 text-white px-4 py-1 rounded-lg hover:bg-green-700 transition-all"
                  whileHover={{ scale: 1.1 }}
                >
                  Sell
                </motion.button>
              </motion.div>
            ))}
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
      <Toaster />
    </>
  );
}