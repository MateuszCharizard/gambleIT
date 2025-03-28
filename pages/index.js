import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Howl } from "howler";
import Confetti from "react-confetti";
import { toast, Toaster } from "react-hot-toast";
import { FaGem, FaCrown, FaUserFriends, FaPalette, FaArrowLeft, FaWallet, FaChartLine } from "react-icons/fa";
import { createClient } from '@supabase/supabase-js';
import { useAuth } from "../context/AuthContext";

// Initialize Supabase client
const supabaseUrl = 'https://hawjgysofnwidxanykrr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhhd2pneXNvZm53aWR4YW55a3JyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxNTQ2MzQsImV4cCI6MjA1ODczMDYzNH0.o9Sb14acr7EJNdt7BLgw1566A5pEg5ZEfCiDuDqiAhI';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function CaseOpenerPro() {
  const [tokens, setTokens] = useState(0);
  const [inventory, setInventory] = useState([]);
  const [casesOpened, setCasesOpened] = useState(0);
  const [bestDrop, setBestDrop] = useState("None");
  const [winRate, setWinRate] = useState(0);
  const [dropHistory, setDropHistory] = useState([]);
  const [totalValueWon, setTotalValueWon] = useState(0);
  const [currentDrop, setCurrentDrop] = useState(null);
  const [isOpening, setIsOpening] = useState(false);
  const [scrollingDrops, setScrollingDrops] = useState([]);
  const [caseCost, setCaseCost] = useState(100);
  const [multiplier, setMultiplier] = useState(1);
  const [provablyFairHash, setProvablyFairHash] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [autoOpen, setAutoOpen] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [theme, setTheme] = useState("purple");
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(true);
  const [drops, setDrops] = useState([]);
  const controls = useAnimation();
  const audioRef = useRef(null);

  const { user: authUser, signIn, signUp, signOut } = useAuth();

  // Fetch user stats and case items on mount or auth change
  useEffect(() => {
    setUser(authUser);
    if (!authUser) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch inventory
        const { data: invData, error: invError } = await supabase
          .from('inventory')
          .select('*')
          .eq('user_id', authUser.id);
        if (invError) throw invError;
        setInventory(invData || []);

        // Fetch user stats
        let { data: statsData, error: statsError } = await supabase
          .from('user_stats')
          .select('*')
          .eq('user_id', authUser.id)
          .single();

        if (statsError && statsError.code === 'PGRST116') {
          const defaultStats = {
            user_id: authUser.id,
            tokens: 1000,
            cases_opened: 0,
            best_drop: "None",
            win_rate: 0,
            drop_history: [],
            total_value_won: 0,
          };
          const { error: insertError } = await supabase
            .from('user_stats')
            .insert(defaultStats);
          if (insertError) throw insertError;
          statsData = defaultStats;
        } else if (statsError) {
          throw statsError;
        }

        setTokens(statsData.tokens);
        setCasesOpened(statsData.cases_opened);
        setBestDrop(statsData.best_drop);
        setWinRate(statsData.win_rate);
        setDropHistory(statsData.drop_history || []);
        setTotalValueWon(statsData.total_value_won);

        // Fetch case items
        const { data: itemsData, error: itemsError } = await supabase
          .from('case_items')
          .select('*');
        if (itemsError) throw itemsError;
        console.log('Fetched case items:', itemsData); // Debug log
        setDrops(itemsData || []);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        toast.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authUser]);

  // Update Supabase with current stats (debounced)
  const updateStatsInDB = async () => {
    if (!user) return;
    const stats = {
      tokens,
      cases_opened: casesOpened,
      best_drop: bestDrop,
      win_rate: winRate,
      drop_history: dropHistory,
      total_value_won: totalValueWon,
    };
    try {
      const { error } = await supabase
        .from('user_stats')
        .upsert({ user_id: user.id, ...stats });
      if (error) throw error;
    } catch (error) {
      console.error('Error updating stats:', error.message);
    }
  };

  useEffect(() => {
    if (user) {
      const debounce = setTimeout(() => updateStatsInDB(), 500);
      return () => clearTimeout(debounce);
    }
  }, [tokens, casesOpened, bestDrop, winRate, dropHistory, totalValueWon, user]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isLogin) {
        const { error } = await signIn({ email, password });
        if (error) throw error;
        toast.success('Successfully logged in!');
      } else {
        const { error } = await signUp({ email, password });
        if (error) throw error;
        toast.success('Registration successful! Please check your email.');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await signOut();
      if (error) throw error;
      toast.success('Signed out successfully!');
      setUser(null);
      setInventory([]);
      setTokens(1000);
      setCasesOpened(0);
      setBestDrop("None");
      setWinRate(0);
      setDropHistory([]);
      setTotalValueWon(0);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const soundEffects = {
    roll: new Howl({ src: ["/sounds/premium-roll.mp3"], volume: 0.8 }),
    winCommon: new Howl({ src: ["/sounds/win-common-premium.mp3"], volume: 0.9 }),
    winRare: new Howl({ src: ["/sounds/win-rare-premium.mp3"], volume: 1.0 }),
    winLegendary: new Howl({ src: ["/sounds/win-legendary-premium.mp3"], volume: 1 }),
  };

  const generateProvablyFairHash = () => {
    const clientSeed = Math.random().toString(36).substring(2);
    const serverSeed = Date.now().toString();
    return `SHA256:${btoa(clientSeed + serverSeed)}`;
  };

  const getRandomDrop = (seed) => {
    if (drops.length === 0) return null;
    const rand = Math.abs(Math.sin(seed.length * 9301 + 49297) % 1);
    const totalChance = drops.reduce((sum, drop) => sum + drop.chance, 0);
    if (totalChance <= 0) return drops[0]; // Fallback if chances are invalid
    const normalizedRand = rand * totalChance;
    let cumulative = 0;
    for (const drop of drops) {
      cumulative += drop.chance;
      if (normalizedRand <= cumulative) return drop;
    }
    return drops[drops.length - 1]; // Fallback to last item if rounding errors occur
  };

  const handleOpenCase = async () => {
    if (isOpening || tokens < caseCost * multiplier || drops.length === 0) {
      toast.error(drops.length === 0 ? "No items available to unbox!" : `Need ${caseCost * multiplier} tokens to open!`);
      return;
    }

    console.log('Available drops for crate:', drops); // Debug log

    if (currentDrop) {
      const saleValue = currentDrop.value * multiplier;
      setTokens((prev) => prev + saleValue);
      setTotalValueWon((prev) => prev + saleValue);
      toast.success(`Auto-sold ${currentDrop.name} for ${saleValue} Tokens!`);
      setCurrentDrop(null);
    }

    setTokens((prev) => prev - caseCost * multiplier);
    setCasesOpened((prev) => prev + 1);
    setIsOpening(true);
    setScrollingDrops([]);
    await controls.stop();
    await controls.set({ x: 1000 });

    const fairHash = generateProvablyFairHash();
    setProvablyFairHash(fairHash);
    const finalDrop = getRandomDrop(fairHash);

    if (!finalDrop) {
      setIsOpening(false);
      return;
    }

    const totalItems = 40;
    const finalIndex = 35;
    const scrollArray = Array(totalItems)
      .fill(null)
      .map(() => drops[Math.floor(Math.random() * drops.length)]);
    scrollArray[finalIndex] = finalDrop;
    setScrollingDrops(scrollArray);

    const itemWidth = 100;
    const containerWidth = 800;
    const centerOffset = containerWidth / 2 - itemWidth / 2;
    const finalPosition = -(itemWidth * finalIndex - centerOffset);

    soundEffects.roll.play();
    await controls.start({
      x: finalPosition,
      transition: { duration: 6, ease: [0.25, 0.8, 0.35, 1] },
    });

    setCurrentDrop(finalDrop);
    const newDropHistory = [...dropHistory, { ...finalDrop, timestamp: new Date() }];
    setDropHistory(newDropHistory);
    if (finalDrop.value > (dropHistory.reduce((a, b) => a.value > b.value ? a : b, { value: 0 }).value || 0)) {
      setBestDrop(finalDrop.name);
    }
    setWinRate(casesOpened ? Math.round((totalValueWon / (casesOpened * caseCost)) * 100) : 0);
    setIsOpening(false);

    if (finalDrop.rarity === "Legendary" || finalDrop.rarity === "Mythic") {
      soundEffects.winLegendary.play();
    } else if (finalDrop.rarity === "Rare" || finalDrop.rarity === "Epic") {
      soundEffects.winRare.play();
    } else {
      soundEffects.winCommon.play();
    }
    toast.success(`Unboxed ${finalDrop.name} (${finalDrop.value} Tokens)!`);
  };

  useEffect(() => {
    let interval;
    if (autoOpen && tokens >= caseCost * multiplier && drops.length > 0) {
      interval = setInterval(handleOpenCase, 7000);
    }
    return () => clearInterval(interval);
  }, [autoOpen, tokens, caseCost, multiplier, drops]);

  const handleSaveDrop = async () => {
    if (currentDrop && user) {
      const { error } = await supabase
        .from('inventory')
        .insert({
          user_id: user.id,
          item_name: currentDrop.name,
          value: currentDrop.value,
          rarity: currentDrop.rarity,
          image: currentDrop.image_url,
          color: currentDrop.color,
          glow: currentDrop.glow
        });
      
      if (!error) {
        setInventory([...inventory, currentDrop]);
        setTotalValueWon((prev) => prev + currentDrop.value);
        setCurrentDrop(null);
        toast.success(`Saved ${currentDrop.name} to inventory!`);
      } else {
        toast.error('Failed to save item');
      }
    }
  };

  const handleSellDrop = () => {
    if (currentDrop) {
      const saleValue = currentDrop.value * multiplier;
      setTokens((prev) => prev + saleValue);
      setTotalValueWon((prev) => prev + saleValue);
      setCurrentDrop(null);
    }
  };

  const handleSecretTokenBoost = () => {
    setTokens((prev) => prev + 1000);
    toast.success("Secret boost: +1000 Tokens!", {
      duration: 2000,
      style: { background: "#1f2937", color: "#fff", border: "1px solid #9333ea" },
    });
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const dropVariants = {
    hidden: { opacity: 0, y: 30, rotate: -15 },
    visible: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const glowEffects = {
    "shadow-silver": "shadow-[0_0_10px_rgba(200,200,200,0.8)]",
    "shadow-gold": "shadow-[0_0_15px_rgba(255,215,0,1)]",
  };

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
    .secret-button { cursor: pointer; }
    .secret-button:hover { transform: scale(1.1); transition: transform 0.2s ease; }
  `;

  if (!user) {
    return (
      <>
        <style>{combinedStyles}</style>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-indigo-900 flex items-center justify-center p-4">
          <motion.div 
            className="bg-gray-800 p-8 rounded-xl shadow-xl border border-theme max-w-md w-full"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-white mb-6 text-center">
              {isLogin ? "Login" : "Register"}
            </h1>
            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <label className="text-gray-300 mb-2 block">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 bg-gray-700 rounded-md text-white border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="text-gray-300 mb-2 block">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 bg-gray-700 rounded-md text-white border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  required
                />
              </div>
              <motion.button
                type="submit"
                className="w-full bg-theme-primary text-white p-2 rounded-md hover:bg-theme-primary/80 disabled:opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={loading}
              >
                {loading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}
              </motion.button>
            </form>
            <p className="text-gray-400 text-center mt-4">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-indigo-400 hover:text-indigo-300"
              >
                {isLogin ? "Register" : "Login"}
              </button>
            </p>
          </motion.div>
        </div>
        <Toaster />
      </>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-indigo-900 flex items-center justify-center">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <style>{combinedStyles}</style>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-indigo-900 flex flex-col items-center p-4 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(75,0,130,0.2),transparent_70%)] pointer-events-none animate-pulse-slow" />
        {currentDrop?.rarity === "Mythic" && <Confetti recycle={false} numberOfPieces={200} className="z-50" />}
        <motion.div className="w-full max-w-6xl relative z-10" variants={containerVariants} initial="hidden" animate="visible">
          <div className="bg-gradient-to-r from-gray-800 to-indigo-900/90 backdrop-blur-lg p-6 rounded-t-xl shadow-xl flex justify-between items-center border border-theme">
            <h1 className="text-4xl font-extrabold text-white tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
              Case Opener Elite
            </h1>
            <div className="flex items-center space-x-8">
              <p className="text-white text-lg flex items-center">
                <FaGem
                  className="mr-2 text-yellow-400 secret-button"
                  onClick={handleSecretTokenBoost}
                  title="Click for a secret boost!"
                />
                <span className="font-bold">{tokens.toLocaleString()}</span>
              </p>
              <Link href="/inventory" className="text-indigo-300 hover:text-white transition-all duration-300 flex items-center text-lg">
                <FaWallet className="mr-1" /> Inventory ({inventory.length})
              </Link>
              <Link href="/leaderboard" className="text-indigo-300 hover:text-white transition-all duration-300 flex items-center text-lg">
                <FaChartLine className="mr-1" /> Leaderboard
              </Link>
              <Link href="/friends" className="text-indigo-300 hover:text-white transition-all duration-300 flex items-center text-lg">
                <FaUserFriends className="mr-1" /> Friends
              </Link>
              <button 
                onClick={handleSignOut}
                className="text-indigo-300 hover:text-white transition-all duration-300 flex items-center text-lg"
              >
                Sign Out
              </button>
            </div>
          </div>

          <div className="bg-gray-900/95 p-6 rounded-b-xl shadow-xl border border-theme">
            <div className="flex justify-between items-center mb-6">
              <div className="space-y-2">
                <p className="text-gray-300 text-md">
                  Case Cost: <span className="font-bold text-indigo-400">{caseCost * multiplier} Tokens</span>
                </p>
                <p className="text-gray-300 text-md flex items-center">
                  Multiplier:
                  <select
                    value={multiplier}
                    onChange={(e) => setMultiplier(parseInt(e.target.value))}
                    className="ml-2 bg-gray-800 text-white rounded-md p-1 border border-theme focus:ring-1 focus:ring-indigo-400"
                  >
                    <option value={1}>1x</option>
                    <option value={2}>2x</option>
                    <option value={5}>5x</option>
                    <option value={10}>10x</option>
                    <option value={25}>25x</option>
                  </select>
                </p>
                <label className="text-gray-300 flex items-center text-sm">
                  <input type="checkbox" checked={autoOpen} onChange={() => setAutoOpen(!autoOpen)} className="mr-2 accent-indigo-500" />
                  Auto-Open
                </label>
              </div>
              <motion.button
                onClick={handleOpenCase}
                className="bg-theme-primary text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:bg-theme-primary/80 transition-all disabled:opacity-50"
                disabled={isOpening || tokens < caseCost * multiplier || drops.length === 0}
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px var(--theme-primary)" }}
                whileTap={{ scale: 0.95 }}
              >
                Open Case
              </motion.button>
            </div>

            {isOpening && scrollingDrops.length > 0 && (
              <div className="mt-6 w-full h-40 overflow-hidden relative border-2 border-theme rounded-xl bg-gray-950">
                <motion.div className="flex space-x-2" animate={controls}>
                  {scrollingDrops.map((drop, index) => (
                    <motion.div
                      key={index}
                      className={`flex-shrink-0 w-24 h-24 bg-gray-800 rounded-md border ${drop.glow} ${
                        drop === currentDrop && !isOpening ? "border-yellow-500" : "border-gray-700"
                      } flex items-center justify-center`}
                      whileHover={{ scale: 1.1 }}
                    >
                      <Image src={drop.image_url} alt={drop.name} width={80} height={80} className="object-contain" />
                    </motion.div>
                  ))}
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-1 h-32 bg-gradient-to-b from-transparent via-indigo-400 to-transparent animate-pulse" />
                </div>
              </div>
            )}

            <AnimatePresence>
              {currentDrop && !isOpening && (
                <motion.div
                  className={`mt-8 w-full max-w-sm mx-auto bg-gray-900 p-4 rounded-xl border-2 ${glowEffects[currentDrop.glow]} shadow-xl`}
                  variants={dropVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="w-24 h-24 bg-gray-800 rounded-full mx-auto mb-3 flex items-center justify-center overflow-hidden">
                    <Image src={currentDrop.image_url} alt={currentDrop.name} width={90} height={90} className="object-contain animate-spin-slow" />
                  </div>
                  <h2 className="text-lg font-extrabold text-white text-center">You Won!</h2>
                  <p className={`text-md my-3 text-center font-semibold ${currentDrop.color}`}>
                    {currentDrop.name} ({currentDrop.value.toLocaleString()} Tokens)
                  </p>
                  <p className="text-gray-400 text-xs text-center">Rarity: <span className="font-bold">{currentDrop.rarity}</span></p>
                  <div className="flex justify-center space-x-4 mt-4">
                    <motion.button
                      onClick={handleSaveDrop}
                      className="bg-theme-primary text-white px-4 py-1 rounded-md font-semibold hover:bg-theme-primary/80 transition-all text-sm"
                      whileHover={{ scale: 1.1, boxShadow: "0 0 15px var(--theme-primary)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Save
                    </motion.button>
                    <motion.button
                      onClick={handleSellDrop}
                      className="bg-green-600 text-white px-4 py-1 rounded-md font-semibold hover:bg-green-700 transition-all text-sm"
                      whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(34, 197, 94, 0.8)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Sell for {currentDrop.value * multiplier}
                    </motion.button>
                  </div>
                  <p className="text-gray-400 text-xs mt-3 text-center">Hash: {provablyFairHash.slice(0, 10)}...</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
              <motion.div className="bg-gray-800 p-4 rounded-xl border border-theme" whileHover={{ scale: 1.02 }}>
                <p className="text-sm">Cases Opened: <span className="font-bold text-indigo-400">{casesOpened}</span></p>
                <p className="text-sm">Total Won: <span className="font-bold text-indigo-400">{totalValueWon.toLocaleString()} Tokens</span></p>
              </motion.div>
              <motion.div className="bg-gray-800 p-4 rounded-xl border border-theme" whileHover={{ scale: 1.02 }}>
                <p className="text-sm flex justify-between">
                  Drop History
                  <button onClick={() => setShowHistory(!showHistory)} className="text-indigo-400 hover:text-indigo-300 text-xs">
                    {showHistory ? "Hide" : "Show"}
                  </button>
                </p>
                {showHistory && (
                  <ul className="mt-1 max-h-32 overflow-y-auto text-xs">
                    {dropHistory.slice(-5).reverse().map((drop, idx) => (
                      <li key={idx} className={`text-xs ${drop.color}`}>
                        {drop.name} ({drop.value} Tokens) - {drop.timestamp.toLocaleTimeString()}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
              <motion.div className="bg-gray-800 p-4 rounded-xl border border-theme" whileHover={{ scale: 1.02 }}>
                <p className="text-sm">Win Rate: <span className="font-bold text-indigo-400">{winRate}%</span></p>
                <p className="text-sm">Best Drop: <span className="font-bold text-indigo-400">{bestDrop}</span></p>
              </motion.div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
                Possible Drops
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {drops.map((drop) => (
                  <motion.div
                    key={drop.id}
                    className={`bg-gray-800 p-3 rounded-lg border ${glowEffects[drop.glow]} flex items-center space-x-3`}
                    whileHover={{ scale: 1.02, boxShadow: "0 0 15px var(--theme-primary)" }}
                  >
                    <Image src={drop.image_url} alt={drop.name} width={60} height={60} className="object-contain rounded-md" />
                    <div>
                      <p className={`text-md font-semibold ${drop.color}`}>{drop.name}</p>
                      <p className="text-gray-400 text-xs">Value: <span className="font-bold">{drop.value.toLocaleString()} Tokens</span></p>
                      <p className="text-gray-400 text-xs">Chance: <span className="font-bold">{(drop.chance * 100).toFixed(1)}%</span></p>
                      <p className="text-gray-400 text-xs">Rarity: <span className="font-bold">{drop.rarity}</span></p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-20">
          <motion.button className="bg-indigo-600 p-3 rounded-full shadow-lg" whileHover={{ scale: 1.1 }} onClick={() => toast("Live chat coming soon!")}>
            <FaUserFriends className="text-white" size={32} />
          </motion.button>
          <Link href="/subscription">
            <motion.button className="bg-theme-primary p-3 rounded-full shadow-lg" whileHover={{ scale: 1.1 }}>
              <FaCrown className="text-white" size={32} />
            </motion.button>
          </Link>
          <motion.button className="bg-theme-secondary p-3 rounded-full shadow-lg" whileHover={{ scale: 1.1 }} onClick={() => setShowThemeModal(true)}>
            <FaPalette className="text-white" size={32} />
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
              <div className="bg-gray-900 p-4 rounded-xl border border-theme">
                <h2 className="text-xl font-bold text-white mb-3">Choose Theme</h2>
                <div className="grid grid-cols-3 gap-3">
                  {Object.keys(themes).map((themeName) => (
                    <motion.button
                      key={themeName}
                      className="bg-theme-primary text-white px-3 py-1 rounded-md hover:bg-theme-primary/80 transition-all"
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
                <button className="mt-3 bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-all" onClick={() => setShowThemeModal(false)}>
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