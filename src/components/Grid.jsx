const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;

function getLetterColor(letter, index, solution, guess) {
  if (!guess) return "border-gray-500";

  if (solution[index] === letter) return "bg-green-500 text-white";
  if (solution.includes(letter)) return "bg-yellow-500 text-white";

  return "bg-gray-700 text-white";
}

export default function Grid({ guesses, currentGuess, solution }) {
  return (
    <div className="grid grid-rows-6 gap-2 mb-6">
      {guesses.map((guess, rowIndex) => {
        const isCurrentRow = rowIndex === guesses.findIndex((g) => g === "");
        const displayWord = isCurrentRow ? currentGuess : guess;

        return (
          <div key={rowIndex} className="grid grid-cols-5 gap-2">
            {Array.from({ length: WORD_LENGTH }).map((_, colIndex) => {
              const letter = displayWord[colIndex] || "";

              const color = !letter
                ? "border-2 border-gray-500"
                : !isCurrentRow
                  ? getLetterColor(letter, colIndex, solution, guess)
                  : "border-2 border-gray-500";

              return (
                <div
                  key={colIndex}
                  className={`w-14 h-14 flex items-center justify-center text-xl font-bold uppercase ${color}`}
                >
                  {letter}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
