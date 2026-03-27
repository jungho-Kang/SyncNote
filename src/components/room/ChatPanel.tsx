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
  const lastReadMessageIdRef = useRef<number | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const userId = useUserStore(state => state.userId);

  const { id } = useParams();
  const roomId = Number(id);

  const [input, setInput] = useState("");
  // IOS기기 전용 버그 수정 코드(IME 입력 안정화)
  const [isComposing, setIsComposing] = useState(false);

  // 채팅 보내기 함수
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

  // 마지막으로 읽은 메세지 Id값 보내기
  useEffect(() => {
    if (!isOpen) return;

    // 마지막으로 읽은 메세지 Id값
    const lastReadMessageId = messages[messages.length - 1]?.id;
    if (!lastReadMessageId) return;

    // 이미 보낸 id면 스킵
    if (lastReadMessageIdRef.current === lastReadMessageId) return;

    const client = getClient();
    if (!client) return;

    client.publish({
      destination: "/app/chat/read",
      body: JSON.stringify({
        roomId,
        lastReadMessageId,
        userId,
      }),
    });

    lastReadMessageIdRef.current = lastReadMessageId;
  }, [messages, isOpen]);

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

          const isMine = msg.userId === userId;

          const formatTime = (date: string) =>
            new Date(date).toLocaleTimeString("ko-KR", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            });

          const currentTime = formatTime(msg.createdAt);
          const prevTime = prev ? formatTime(prev.createdAt) : null;
          const nextTime = next ? formatTime(next.createdAt) : null;

          const isSameGroup =
            prev && prev.userId === msg.userId && prevTime === currentTime;

          const isLastInGroup =
            !next || next.userId !== msg.userId || nextTime !== currentTime;

          return (
            <div key={msg.id}>
              {/* 상대 메시지: 그룹 처음이면 프로필 + 닉네임 표시 */}
              {!isMine && !isSameGroup && (
                <div className="flex items-center gap-2 mt-3">
                  <div className="w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center text-white text-xs">
                    {msg.nickname[0]}
                  </div>
                  <span className="text-xs text-gray-400">{msg.nickname}</span>
                </div>
              )}

              {/* 메시지 + 시간 */}
              <div
                className={`flex items-end gap-2 ${
                  isMine ? "justify-end" : "justify-start"
                } ${isSameGroup ? "mt-1" : "mt-3"}`}
              >
                {/* 내 메시지: 그룹 마지막이면 시간 표시 */}
                {isMine && isLastInGroup && (
                  <span className="text-xs text-gray-400">{currentTime}</span>
                )}

                {/* 메시지 말풍선 */}
                <div
                  className={`text-sm px-3 py-2 rounded-lg max-w-[70%] break-words ${
                    isMine
                      ? "bg-[#6F4CDB] text-white rounded-tr-lg rounded-tl-lg rounded-bl-lg"
                      : "bg-[#374151] text-white rounded-tr-lg rounded-tl-lg rounded-br-lg"
                  }`}
                >
                  {msg.deleted ? "삭제된 메시지입니다." : msg.content}
                  {msg.edited && !msg.deleted && (
                    <span className="ml-1 text-xs text-gray-300">(수정됨)</span>
                  )}
                </div>

                {/* 상대 메시지: 그룹 마지막이면 시간 표시 */}
                {!isMine && isLastInGroup && (
                  <span className="text-xs text-gray-400">{currentTime}</span>
                )}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* 입력창 */}
      <div className="flex items-center gap-2 p-2 border-t border-[#1F2937]">
        <input
          value={input}
          // IOS기기 전용 버그 수정 코드
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={e => {
            setIsComposing(false);
            setInput(e.currentTarget.value);
          }}
          onChange={e => {
            if (!isComposing) {
              setInput(e.target.value);
            }
          }}
          onKeyDown={e => {
            if (e.key === "Enter" && !isComposing) {
              e.preventDefault();
              handleSend();
            }
          }}
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
