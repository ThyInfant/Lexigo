export default function Menu({ onSelect }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white space-y-4">
      <h1 className="text-3xl font-bold mb-6">Menu</h1>
      <button
        onClick={() => onSelect("new")}
        className="bg-green-500 px-6 py-2 rounded hover:bg-green-600 w-60"
      >
        New Game
      </button>
      <button
        onClick={() => onSelect("continue")}
        className="bg-blue-500 px-6 py-2 rounded hover:bg-blue-600 w-60"
      >
        Continue Game
      </button>
      <button
        onClick={() => onSelect("login")}
        className="bg-purple-500 px-6 py-2 rounded hover:bg-purple-600 w-60"
      >
        Create Account / Login
      </button>
      <button
        onClick={() => onSelect("leaderboard")}
        className="bg-yellow-500 px-6 py-2 rounded hover:bg-yellow-600 w-60"
      >
        Leaderboard
      </button>
    </div>
  );
}
