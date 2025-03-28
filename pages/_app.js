import { GameProvider } from "../context/GameContext";
import "../styles/globals.css"; // If you have global styles

export default function MyApp({ Component, pageProps }) {
  return (
    <GameProvider>
      <Component {...pageProps} />
    </GameProvider>
  );
}