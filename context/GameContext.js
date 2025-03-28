import { createContext, useContext, useState } from "react";

const GameContext = createContext();

export function GameProvider({ children }) {
  const [tokens, setTokens] = useState(0);
  const [inventory, setInventory] = useState([]);
  const [userStats, setUserStats] = useState({
    casesOpened: 0,
    totalValueWon: 0,
  });

  // Function to update user stats
  const updateUserStats = (newStats) => {
    setUserStats((prevStats) => ({
      ...prevStats,
      ...newStats,
    }));
  };

  return (
    <GameContext.Provider
      value={{ tokens, setTokens, inventory, setInventory, userStats, updateUserStats }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    // Return a default value during SSR or if context is not available
    return {
      tokens: 0,
      setTokens: () => {},
      inventory: [],
      setInventory: () => {},
      userStats: { casesOpened: 0, totalValueWon: 0 },
      updateUserStats: () => {},
    };
  }
  return context;
}