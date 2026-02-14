export default function Welcome({ onEnter }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-green-400">
      <h1 className="text-4xl font-bold mb-6">Welcome to Lexigo</h1>
      <button
        onClick={onEnter}
        className="bg-green-500 px-6 py-3 rounded-md text-white hover:bg-green-600 transition"
      >
        Enter Game
      </button>
    </div>
  );
}
