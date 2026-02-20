import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Auth({ onBack }) {
  const { login, register } = useAuth();
  const [mode, setMode] = useState("login");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mode === "login") {
      await login(username, password);
    } else {
      await register(username, password);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold">
        {mode === "login" ? "Login" : "Create Account"}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          {mode === "login" ? "Login" : "Create Account"}
        </button>
      </form>

      <button
        onClick={() => setMode(mode === "login" ? "register" : "login")}
        className="text-blue-500 underline"
      >
        {mode === "login"
          ? "Don't have an account? Create one"
          : "Already have an account? Login"}
      </button>

      <button onClick={onBack}>Back</button>
    </div>
  );
}
