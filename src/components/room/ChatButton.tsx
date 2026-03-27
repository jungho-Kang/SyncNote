import { MessageCircle } from "lucide-react";

interface ChatButtonProps {
  onClick: () => void;
  unreadMessageCount: number;
}

const ChatButton = ({ onClick, unreadMessageCount }: ChatButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-16 h-16 bg-[#6F4CDB] hover:bg-[#4825b6] rounded-full shadow-md flex items-center justify-center transition-colors"
    >
      {/* 메시지 아이콘 */}
      <MessageCircle size={26} className="text-white" />

      {/* unread 배지 */}
      {unreadMessageCount > 0 && (
        <span className="absolute top-1 right-1 transform translate-x-1/4 -translate-y-1/4 bg-red-500 text-white text-xs font-semibold rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center">
          {unreadMessageCount > 99 ? "99+" : unreadMessageCount}
        </span>
      )}
    </button>
  );
};

export default ChatButton;
