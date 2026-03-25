import { MessageCircle } from "lucide-react";

interface ChatButtonProps {
  onClick: () => void;
}

const ChatButton = ({ onClick }: ChatButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-500 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-white transition"
    >
      <MessageCircle size={22} />
    </button>
  );
};

export default ChatButton;
