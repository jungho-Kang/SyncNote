import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";

interface ChatPanelProps {
  handleChatClose: () => void;
  isOpen: boolean;
}

interface Message {
  id: number;
  text: string;
  system: boolean;
  time: string;
}

export default function ChatPanel({ handleChatClose, isOpen }: ChatPanelProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "test님이 방을 생성했습니다.",
      system: true,
      time: "",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: input,
      system: false,
      time: new Date().toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    };

    setMessages(prev => [...prev, newMessage]);
    setInput("");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className={`fixed bottom-6 right-6 w-[90vw] max-w-[360px] h-[500px] bg-[#111827] border border-[#374151] rounded-xl flex flex-col shadow-[0_0_20px_rgba(0,0,0,0.6)] z-50 transition-all duration-300 origin-bottom-right ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
    >
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#1F2937]">
        <span className="text-sm text-gray-300">
          채팅 {messages.length - 1}개
        </span>
        <button
          onClick={handleChatClose}
          className="text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2">
        {messages.map((msg, index) => {
          const prev = messages[index - 1];
          const next = messages[index + 1];

          const isSameGroup =
            prev && prev.time === msg.time && prev.system === msg.system;

          const isLastInGroup =
            !next || next.time !== msg.time || next.system !== msg.system;

          return (
            <div
              key={msg.id}
              className={`flex gap-2 items-end justify-end ${isSameGroup ? "mt-1" : "mt-3"}`}
            >
              {isLastInGroup && !msg.system && (
                <span className="text-xs text-gray-400">{msg.time}</span>
              )}

              <div
                className={`text-sm px-3 py-2 rounded-lg w-fit max-w-[70%] ${msg.system ? "bg-[#1F2937] text-gray-400" : "bg-[#6F4CDB] text-white"}`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <div className="flex items-center gap-2 p-2 border-t border-[#1F2937]">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSend()}
          placeholder="메시지를 입력하세요..."
          className="flex-1 bg-[#111827] text-white text-sm px-3 py-2 rounded-md outline-none border border-[#1F2937] focus:border-[#6F4CDB]"
        />

        <button
          onClick={handleSend}
          className="bg-[#6F4CDB] hover:bg-[#4825b6] p-2 rounded-md"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
