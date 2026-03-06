const colors = [
  "#3B82F6",
  "#22C55E",
  "#EF4444",
  "#F59E0B",
  "#8B5CF6",
  "#EC4899",
];

const WhiteBoard = () => {
  return (
    <div className="flex-1 flex flex-col bg-[#0F172A] border border-[#1E293B] rounded-xl">
      {/* toolbar */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[#1E293B]">
        <span className="text-sm font-semibold mr-2">화이트보드</span>

        {colors.map(color => (
          <button
            key={color}
            className="w-5 h-5 rounded-full"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      {/* canvas area */}
      <div className="flex-1"></div>
    </div>
  );
};

export default WhiteBoard;
