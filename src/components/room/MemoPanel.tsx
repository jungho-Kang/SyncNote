const MemoPanel = () => {
  return (
    <div className="flex-1 flex flex-col bg-[#0F172A] border border-[#1E293B] rounded-xl">
      <div className="flex justify-between items-center px-4 py-3 border-b border-[#1E293B]">
        <span className="font-semibold text-sm">공유 메모</span>
        <span className="text-xs text-gray-400">0자</span>
      </div>

      <textarea
        placeholder="여기에 메모를 작성하세요..."
        className="flex-1 bg-transparent text-sm text-gray-300 placeholder:text-gray-500 outline-none resize-none p-4"
      />

      <div className="px-4 py-3 border-t border-[#1E293B] text-xs text-gray-400">
        파일 첨부
      </div>
    </div>
  );
};

export default MemoPanel;
