import { useState } from "react";
import { motion } from "framer-motion";
import { useGame } from "../context/GameContext";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const { tokens, setTokens, inventory, setInventory } = useGame();
  const [currentDrop, setCurrentDrop] = useState(null);
  const [isOpening, setIsOpening] = useState(false);
  const [scrollingDrops, setScrollingDrops] = useState([]);

  const drops = [
    { name: "Image 5", value: 10, chance: 0.40, image: "/image (5).png", color: "text-gray-500" },
    { name: "Screenshot 2024-11-22", value: 15, chance: 0.30, image: "/Screenshot 2024-11-22 142904.png", color: "text-gray-400" },
    { name: "Screenshot 2025-03-26 005620", value: 100, chance: 0.05, image: "/Screenshot 2025-03-26 005620.png", color: "text-gray-100" },
    { name: "Screenshot 2025-03-26 012723", value: 50, chance: 0.20, image: "/Screenshot_2025-03-26_012723-removebg-preview.png", color: "text-gray-300" },
    { name: "Shared Image", value: 150, chance: 0.05, image: "/shared image.png", color: "text-gray-100" },
  ];

  const getRandomDrop = () => {
    const rand = Math.random();
    let cumulative = 0;
    for (const drop of drops) {
      cumulative += drop.chance;
      if (rand <= cumulative) return drop;
    }
    return drops[0];
  };

  const handleOpenCase = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Pick the final drop
    const finalDrop = getRandomDrop();

    // Generate scrolling array with finalDrop at a fixed position
    const totalItems = 30;
    const finalIndex = 25; // Where the final drop will land
    const scrollArray = Array(totalItems)
      .fill(null)
      .map(() => drops[Math.floor(Math.random() * drops.length)]);
    scrollArray[finalIndex] = finalDrop; // Place final drop at the stopping point

    // Set state immediately
    setScrollingDrops(scrollArray);
    setCurrentDrop(finalDrop);

    // End animation after 5 seconds
    setTimeout(() => {
      setIsOpening(false);
    }, 5000);
  };

  const handleSaveDrop = () => {
    if (currentDrop) {
      setInventory([...inventory, currentDrop]);
      setCurrentDrop(null);
    }
  };

  const handleSellDrop = () => {
    if (currentDrop) {
      setTokens(tokens + currentDrop.value);
      setCurrentDrop(null);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const dropVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
  };

  // Calculate the exact pixel offset to center the final drop
  const itemWidth = 112; // w-28 = 28 * 4px = 112px
  const finalIndex = 25; // Final drop position
  const containerWidth = 896; // max-w-4xl ≈ 896px (adjust if needed)
  const centerOffset = containerWidth / 2 - itemWidth / 2; // 448 - 56 = 392px
  const finalPosition = -(itemWidth * finalIndex - centerOffset); // Stop with final drop centered

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center p-6">
      <motion.div
        className="w-full max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-gray-800 p-4 rounded-t-lg shadow-lg flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-100">Case Opener</h1>
          <div className="flex items-center space-x-4">
            <p className="text-gray-300">
              Tokens: <span className="font-semibold text-gray-100">{tokens}</span>
            </p>
            <Link href="/inventory" className="text-gray-400 hover:text-gray-200 transition">
              Inventory
            </Link>
          </div>
        </div>

        <div className="bg-gray-700 p-6 rounded-b-lg shadow-lg flex flex-col items-center">
          <motion.button
            onClick={handleOpenCase}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition disabled:opacity-50"
            disabled={isOpening}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Open Free Case
          </motion.button>

          {isOpening && (
            <div className="mt-8 w-full h-40 overflow-hidden relative border border-gray-500 rounded-lg">
              <motion.div
                className="flex space-x-4"
                initial={{ x: "50%" }}
                animate={{ x: finalPosition }}
                transition={{
                  duration: 5,
                  ease: [0.25, 0.1, 0.25, 1], // Slows down
                }}
              >
                {scrollingDrops.map((drop, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-28 h-28 bg-gray-600 rounded border border-gray-500 flex items-center justify-center"
                  >
                    <Image
                      src={drop.image}
                      alt={drop.name}
                      width={96}
                      height={96}
                      className="object-contain"
                    />
                  </div>
                ))}
              </motion.div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-1 h-32 bg-gray-400"></div>
              </div>
            </div>
          )}

          {currentDrop && !isOpening && (
            <motion.div
              className="mt-8 w-full max-w-md bg-gray-600 p-6 rounded-lg border border-gray-500"
              variants={dropVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.05, boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)" }}
            >
              <div className="w-32 h-32 bg-gray-800 rounded mx-auto mb-4 flex items-center justify-center">
                <Image
                  src={currentDrop.image}
                  alt={currentDrop.name}
                  width={128}
                  height={128}
                  className="object-contain"
                />
              </div>
              <h2 className="text-2xl font-semibold text-gray-100">You Got:</h2>
              <p className={`text-xl my-2 ${currentDrop.color}`}>
                {currentDrop.name} ({currentDrop.value} tokens)
              </p>
              <div className="flex justify-center space-x-4 mt-6">
                <motion.button
                  onClick={handleSaveDrop}
                  className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Save to Inventory
                </motion.button>
                <motion.button
                  onClick={handleSellDrop}
                  className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sell Drop
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}