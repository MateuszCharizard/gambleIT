import { motion } from "framer-motion";
import { useGame } from "../context/GameContext";
import Link from "next/link";
import Image from "next/image";

export default function Inventory() {
  const { tokens, setTokens, inventory, setInventory } = useGame();

  const handleSellFromInventory = (index) => {
    const item = inventory[index];
    setTokens(tokens + item.value);
    setInventory(inventory.filter((_, i) => i !== index));
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.1, duration: 0.3, ease: "easeOut" },
    }),
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center p-6">
      <motion.div
        className="w-full max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-gray-800 p-4 rounded-t-lg shadow-lg flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-100">Inventory</h1>
          <div className="flex items-center space-x-4">
            <p className="text-gray-300">
              Tokens: <span className="font-semibold text-gray-100">{tokens}</span>
            </p>
            <Link href="/" className="text-gray-400 hover:text-gray-200 transition">
              Back to Cases
            </Link>
          </div>
        </div>

        <div className="bg-gray-700 p-6 rounded-b-lg shadow-lg">
          {inventory.length === 0 ? (
            <p className="text-gray-400 text-center py-10">Your inventory is empty!</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {inventory.map((item, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.05, boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)" }}
                  className="bg-gray-600 rounded-lg p-4 flex flex-col items-center justify-between border border-gray-500 hover:border-gray-400 transition"
                >
                  <div className="w-16 h-16 bg-gray-800 rounded mb-2 flex items-center justify-center">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                  <span className={`${item.color} font-semibold text-center`}>
                    {item.name}
                  </span>
                  <span className="text-gray-400 text-sm">{item.value} tokens</span>
                  <button
                    onClick={() => handleSellFromInventory(index)}
                    className="mt-2 bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition"
                  >
                    Sell
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}