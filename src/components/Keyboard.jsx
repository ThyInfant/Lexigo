const keys = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Back"],
];

export default function Keyboard() {
  return (
    <div className="space-y-2">
      {keys.map((row, i) => (
        <div key={i} className="flex justify-center gap-2">
          {row.map((key) => (
            <button
              key={key}
              className="bg-gray-700 px-3 py-2 rounded hover:bg-gray-600"
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
