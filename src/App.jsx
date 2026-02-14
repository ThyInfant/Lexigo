import { useState } from "react";
import Welcome from "./components/Welcome";
import Menu from "./components/Menu";
import Game from "./components/Game";

export default function App() {
  const [screen, setScreen] = useState("welcome");

  const handleEnter = () => setScreen("menu");
  const handleMenuSelect = (option) => {
    if (option === "new" || option === "continue") setScreen("game");
    // handle login or leaderboard later
  };

  if (screen === "welcome") return <Welcome onEnter={handleEnter} />;
  if (screen === "menu") return <Menu onSelect={handleMenuSelect} />;
  if (screen === "game") return <Game />;
}
