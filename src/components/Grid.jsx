export default function Grid() {
  // 6 rows x 5 columns
  const rows = Array.from({ length: 6 });
  const cols = Array.from({ length: 5 });

  return (
    <div className="grid grid-rows-6 gap-2 mb-6">
      {rows.map((_, i) => (
        <div key={i} className="grid grid-cols-5 gap-2">
          {cols.map((_, j) => (
            <div
              key={j}
              className="w-14 h-14 border-2 border-gray-500 flex items-center justify-center text-xl font-bold"
            >
              {/* Letter will appear here */}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
