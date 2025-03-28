import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaArrowLeft, FaCrown, FaGem, FaUserFriends, FaPalette } from "react-icons/fa";
import { supabase } from "../lib/supabase";
import { toast, Toaster } from "react-hot-toast";

export default function ProSubscriptionPage() {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [theme, setTheme] = useState("purple");

  useEffect(() => {
    const fetchUserAndSubscription = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        const { data } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .eq('active', true)
          .single();
        setSubscription(data);
      }
    };
    fetchUserAndSubscription();
  }, []);

  const handleSubscribe = async (cost, type) => {
    if (!user) return;
    if (subscription) {
      toast.error("You already have an active subscription!");
      return;
    }

    const { error } = await supabase
      .from('subscriptions')
      .insert({ user_id: user.id, type, active: true });

    if (!error) {
      toast.success("Subscribed to Pro! Enjoy your benefits!");
    } else {
      toast.error("Subscription failed");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
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
          className="w-full max-w-3xl bg-gray-900/95 p-8 rounded-2xl shadow-2xl border border-indigo-500/30 relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-extrabold text-white bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
              Go Pro
            </h1>
            <Link href="/" className="text-indigo-300 hover:text-white transition-all duration-300 flex items-center">
              <FaArrowLeft className="mr-2" /> Back to Case Opener
            </Link>
          </div>

          <div className="text-center mb-8">
            <FaCrown className="text-yellow-400 text-6xl mx-auto mb-4" />
            <p className="text-gray-300 text-lg">
              Unlock exclusive benefits with <span className="font-bold text-indigo-400">Pro Subscription</span>!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              className="bg-gray-800 p-6 rounded-xl border border-indigo-600/50"
              whileHover={{ scale: 1.05 }}
            >
              <h2 className="text-2xl font-bold text-white mb-4">Monthly Pro</h2>
              <p className="text-gray-300 mb-4">500 Tokens / Month</p>
              <ul className="text-gray-400 text-left mb-6 space-y-2">
                <li>🎁 Exclusive Monthly Drops</li>
                <li>💎 10% Bonus Tokens on Wins</li>
                <li>👑 Pro Badge</li>
              </ul>
              <motion.button
                onClick={() => handleSubscribe(500, 'monthly')}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all w-full"
                whileHover={{ scale: 1.1 }}
              >
                Subscribe Now
              </motion.button>
            </motion.div>

            <motion.div
              className="bg-gray-800 p-6 rounded-xl border border-indigo-600/50"
              whileHover={{ scale: 1.05 }}
            >
              <h2 className="text-2xl font-bold text-white mb-4">Yearly Pro</h2>
              <p className="text-gray-300 mb-4">5000 Tokens / Year (Save 17%)</p>
              <ul className="text-gray-400 text-left mb-6 space-y-2">
                <li>🎁 Exclusive Monthly Drops</li>
                <li>💎 15% Bonus Tokens on Wins</li>
                <li>👑 Pro Badge + Golden Frame</li>
                <li>⭐ Early Access to New Features</li>
              </ul>
              <motion.button
                onClick={() => handleSubscribe(5000, 'yearly')}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all w-full"
                whileHover={{ scale: 1.1 }}
              >
                Subscribe Now
              </motion.button>
            </motion.div>
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