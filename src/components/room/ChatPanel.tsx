import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { useUserStore } from "@/stores/userStore";
import { getClient } from "@/socket/socketClient";
import { useParams } from "react-router-dom";

import type { Message } from "@/types/Message";

interface ChatPanelProps {
  handleChatClose: () => void;
  isOpen: boolean;
  messages: Message[];
}

export default function ChatPanel({
  handleChatClose,
  isOpen,
  messages,
}: ChatPanelProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const userId = useUserStore(state => state.userId);

  const { id } = useParams();
  const roomId = Number(id);

  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const client = getClient();
    if (!client) return;

    // 채팅 보내기 socket 연결
    client.publish({
      destination: "/app/chat/send",
      body: JSON.stringify({
        roomId,
        content: input,
        userId,
      }),
    });

    setInput("");
  };

  // 자동 스크롤
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className={`fixed bottom-6 right-6 w-[90vw] max-w-[360px] h-[500px] bg-[#111827] border border-[#374151] rounded-xl flex flex-col shadow-[0_0_20px_rgba(0,0,0,0.6)] z-50 transition-all duration-300 origin-bottom-right ${
        isOpen
          ? "opacity-100 scale-100"
          : "opacity-0 scale-95 pointer-events-none"
      }`}
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#1F2937]">
        <span className="text-sm text-gray-300">채팅 {messages.length}개</span>
        <button
          onClick={handleChatClose}
          className="text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>

      {/* 메시지 */}
      <div className="flex-1 overflow-y-auto px-3 py-2">
        {messages.map((msg, index) => {
          const prev = messages[index - 1];
          const next = messages[index + 1];

          // 현재 메시지가 내 메시지인지 여부
          const isMine = msg.userId === userId;

          // createdAt을 "시:분" 형태로 변환하는 함수
          const getTime = (date: string) =>
            new Date(date).toLocaleTimeString("ko-KR", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            });

          // 현재 / 이전 / 다음 메시지의 시간 (분 단위)
          const currentTime = getTime(msg.createdAt);
          const prevTime = prev ? getTime(prev.createdAt) : null;
          const nextTime = next ? getTime(next.createdAt) : null;

          // 같은 유저이고 같은 분에 보낸 메시지인지 (묶기 조건)
          const isSameGroup =
            prev && prev.userId === msg.userId && prevTime === currentTime;

          // 그룹의 마지막 메시지인지 (시간 표시용)
          const isLastInGroup =
            !next || next.userId !== msg.userId || nextTime !== currentTime;

          // 화면에 표시할 시간
          const time = currentTime;

          return (
            <div
              key={msg.id}
              className={`flex gap-2 items-end ${
                isMine ? "justify-end" : "justify-start"
              } ${isSameGroup ? "mt-1" : "mt-3"}`}
            >
              {/* 내 메시지일 때, 그룹 마지막에만 시간 표시 */}
              {isMine && isLastInGroup && (
                <span className="text-xs text-gray-400">{time}</span>
              )}

              {/* 메시지 말풍선 */}
              <div
                className={`text-sm px-3 py-2 rounded-lg max-w-[70%] ${
                  isMine ? "bg-[#6F4CDB] text-white" : "bg-[#374151] text-white"
                }`}
              >
                {/* 삭제된 메시지 처리 */}
                {msg.deleted ? "삭제된 메시지입니다." : msg.content}

                {/* 수정된 메시지 표시 */}
                {msg.edited && !msg.deleted && (
                  <span className="ml-1 text-xs text-gray-300">(수정됨)</span>
                )}
              </div>

              {/* 상대 메시지일 때, 그룹 마지막에만 시간 표시 */}
              {!isMine && isLastInGroup && (
                <span className="text-xs text-gray-400">{time}</span>
              )}
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* 입력창 */}
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
