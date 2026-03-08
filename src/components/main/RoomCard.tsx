import { Copy, Check, UsersIcon } from "lucide-react";
import { useState } from "react";

interface RoomCardProps {
  id: number;
  name: string;
  code: string;
  members?: number;
  createdAt?: string;
  onClick?: () => void;
}

const RoomCard = ({
  name,
  code,
  members,
  createdAt,
  onClick,
}: RoomCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    // 카드 클릭 방지
    e.stopPropagation();
    await navigator.clipboard.writeText(code);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div
      onClick={onClick}
      className="bg-[#111827] border border-[#1F2937] rounded-xl p-5 hover:border-blue-500 transition-all duration-200 cursor-pointer"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-white">{name}</h3>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-indigo-400 transition group"
        >
          {copied ? (
            <Check size={16} className="text-emerald-400" />
          ) : (
            <Copy
              size={16}
              className="group-hover:scale-110 transition-transform"
            />
          )}
          {code}
        </button>
      </div>

      <div className="text-sm text-gray-400 flex justify-between">
        <div className="flex gap-1 items-center">
          <UsersIcon className="size-4" />
          <span>{members}명</span>
        </div>
        <span>{createdAt}</span>
      </div>
    </div>
  );
};

export default RoomCard;
