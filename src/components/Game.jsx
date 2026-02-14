import Grid from "./Grid";
import Keyboard from "./Keyboard";

export default function Game() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-6">Lexigo</h1>
      <Grid />
      <Keyboard />
    </div>
  );
}
