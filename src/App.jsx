import { useState } from "react";
import { useAuth } from "./context/AuthContext";

import Welcome from "./components/Welcome";
import Menu from "./components/Menu";
import Game from "./components/Game";
import Auth from "./components/Auth";

export default function App() {
  const { user } = useAuth();
  const [screen, setScreen] = useState("welcome");

  if (screen === "welcome")
    return <Welcome onEnter={() => setScreen("menu")} />;

  if (screen === "menu")
    return (
      <Menu
        user={user}
        onSelect={(option) => {
          if (option === "new" || option === "continue") setScreen("game");

          if (option === "auth") setScreen("auth");

          if (option === "leaderboard") setScreen("leaderboard");
        }}
      />
    );

  if (screen === "auth") return <Auth onBack={() => setScreen("menu")} />;

  if (screen === "game")
    return <Game user={user} onExit={() => setScreen("menu")} />;

  return null;
}
