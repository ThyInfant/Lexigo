import { useState, useEffect, useCallback } from "react";
import Grid from "./Grid";
import Keyboard from "./Keyboard";
import Modal from "./Modal";

const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;

// Keyboard color priority
const statusPriority = {
  correct: 3,
  present: 2,
  absent: 1,
};

export default function Game() {
  const [solution, setSolution] = useState("");
  const [validWords, setValidWords] = useState(new Set());
  const [guesses, setGuesses] = useState(Array(MAX_ATTEMPTS).fill(""));
  const [currentGuess, setCurrentGuess] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [gameStatus, setGameStatus] = useState("playing");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [keyStatuses, setKeyStatuses] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // Load Wordle word list ONCE
  useEffect(() => {
    const loadWords = async () => {
      try {
        const res = await fetch(
          "https://raw.githubusercontent.com/tabatkins/wordle-list/main/words",
        );
        const text = await res.text();
        const words = text
          .split("\n")
          .map((w) => w.trim())
          .filter((w) => w.length === 5);

        setValidWords(new Set(words));

        // Pick first solution instantly
        const randomWord = words[Math.floor(Math.random() * words.length)];
        setSolution(randomWord);
      } catch (err) {
        console.error("Failed to load word list");
      }
      setLoading(false);
    };

    loadWords();
  }, []);

  // Evaluate guess & update keyboard colors
  const evaluateGuess = useCallback(
    (guess) => {
      const newStatuses = { ...keyStatuses };

      guess.split("").forEach((letter, index) => {
        let status;

        if (solution[index] === letter) {
          status = "correct";
        } else if (solution.includes(letter)) {
          status = "present";
        } else {
          status = "absent";
        }

        if (
          !newStatuses[letter] ||
          statusPriority[status] > statusPriority[newStatuses[letter]]
        ) {
          newStatuses[letter] = status;
        }
      });

      setKeyStatuses(newStatuses);
    },
    [solution, keyStatuses],
  );

  // Main keyboard handler
  const handleKey = useCallback(
    (key) => {
      if (gameStatus !== "playing" || loading) return;

      key = key.toLowerCase();

      if (key === "enter") {
        if (currentGuess.length !== WORD_LENGTH) return;

        if (!validWords.has(currentGuess)) {
          setErrorMessage("Word does not exist");
          return;
        }

        setErrorMessage("");

        const newGuesses = [...guesses];
        newGuesses[attempt] = currentGuess;
        setGuesses(newGuesses);

        evaluateGuess(currentGuess);

        if (currentGuess === solution) {
          setGameStatus("won");
          setIsModalOpen(true);
        } else if (attempt + 1 === MAX_ATTEMPTS) {
          setGameStatus("lost");
          setIsModalOpen(true);
        }

        setAttempt((prev) => prev + 1);
        setCurrentGuess("");
      } else if (key === "backspace") {
        setCurrentGuess((prev) => prev.slice(0, -1));
      } else if (/^[a-z]$/.test(key) && currentGuess.length < WORD_LENGTH) {
        setCurrentGuess((prev) => prev + key);
      }
    },
    [
      gameStatus,
      loading,
      currentGuess,
      attempt,
      guesses,
      solution,
      validWords,
      evaluateGuess,
    ],
  );

  // Physical keyboard support
  useEffect(() => {
    const handleKeyDown = (e) => handleKey(e.key);
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKey]);

  // Instant reset (NO loading delay)
  const handlePlayAgain = () => {
    const wordsArray = Array.from(validWords);
    const randomWord =
      wordsArray[Math.floor(Math.random() * wordsArray.length)];

    setSolution(randomWord);
    setGuesses(Array(MAX_ATTEMPTS).fill(""));
    setCurrentGuess("");
    setAttempt(0);
    setGameStatus("playing");
    setKeyStatuses({});
    setErrorMessage("");
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading game…
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-2">Lexigo</h1>

      {errorMessage && (
        <p className="mb-2 text-red-400 font-semibold">{errorMessage}</p>
      )}

      <Grid guesses={guesses} currentGuess={currentGuess} solution={solution} />

      <Keyboard onKey={handleKey} keyStatuses={keyStatuses} />

      <Modal
        isOpen={isModalOpen}
        title={gameStatus === "won" ? "You Won!" : "You Lost!"}
        onClose={handlePlayAgain}
      >
        <p className="mb-4">
          {gameStatus === "won"
            ? "Congratulations 🎉"
            : `The word was "${solution}"`}
        </p>

        <button
          className="px-4 py-2 bg-green-500 rounded hover:bg-green-400"
          onClick={handlePlayAgain}
        >
          Play Again
        </button>
      </Modal>
    </div>
  );
}
