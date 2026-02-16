const keys = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Back"],
];

export default function Keyboard({ onKey, keyStatuses }) {
  const getKeyColor = (key) => {
    const status = keyStatuses[key.toLowerCase()];

    if (status === "correct") return "bg-green-500 text-white";
    if (status === "present") return "bg-yellow-500 text-white";
    if (status === "absent") return "bg-gray-800 text-white";

    return "bg-gray-700 text-white";
  };

  return (
    <div className="space-y-2 mt-6">
      {keys.map((row, i) => (
        <div key={i} className="flex justify-center gap-2">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => onKey(key)}
              className={`px-3 py-2 rounded font-semibold ${getKeyColor(key)}`}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
