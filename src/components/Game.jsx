import { useState } from "react";
import Grid from "./Grid";
import Keyboard from "./Keyboard";

const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;

// Temporary local word list
const WORDS = ["apple", "grape", "house", "plant", "chair"];

export default function Game() {
  const [solution] = useState(
    () => WORDS[Math.floor(Math.random() * WORDS.length)],
  );
  const [guesses, setGuesses] = useState(Array(MAX_ATTEMPTS).fill(""));
  const [currentGuess, setCurrentGuess] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [gameStatus, setGameStatus] = useState("playing");

  // keyboard handler
  const handleKey = (key) => {
    if (gameStatus !== "playing") return;

    if (key === "Enter") {
      if (currentGuess.length !== WORD_LENGTH) return;

      const newGuesses = [...guesses];
      newGuesses[attempt] = currentGuess;
      setGuesses(newGuesses);

      if (currentGuess === solution) {
        setGameStatus("won");
      } else if (attempt + 1 === MAX_ATTEMPTS) {
        setGameStatus("lost");
      }

      setAttempt(attempt + 1);
      setCurrentGuess("");
    } else if (key === "Back") {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (currentGuess.length < WORD_LENGTH) {
      setCurrentGuess(currentGuess + key.toLowerCase());
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">Lexigo</h1>

      <Grid guesses={guesses} currentGuess={currentGuess} solution={solution} />

      {gameStatus === "won" && (
        <p className="text-green-400 mt-4">You Won 🎉</p>
      )}
      {gameStatus === "lost" && (
        <p className="text-red-400 mt-4">You Lost 😢 — Word was {solution}</p>
      )}

      <Keyboard onKey={handleKey} />
    </div>
  );
}
