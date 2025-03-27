import { createContext, useContext, useState } from "react";

const GameContext = createContext();

export function GameProvider({ children }) {
  const [tokens, setTokens] = useState(0);
  const [inventory, setInventory] = useState([]);

  return (
    <GameContext.Provider value={{ tokens, setTokens, inventory, setInventory }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}