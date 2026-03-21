import { useParticipantsPanelStore } from "@/stores/participantsPanelStore";
import { useRoomDetailStore } from "@/stores/roomStore";
import {
  ArrowLeft,
  Check,
  Copy,
  PanelLeftClose,
  PanelRightClose,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RoomHeader = () => {
  const navigate = useNavigate();
  const roomDetail = useRoomDetailStore(state => state.roomDetail);
  const { isOpen, toggle } = useParticipantsPanelStore();

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    // await navigator.clipboard.writeText(code);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <header className="h-12 flex items-center justify-between px-6 border-b border-[#1E293B] bg-[#0B1220]">
      <div className="flex items-center gap-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
        >
          <ArrowLeft size={16} />
          나가기
        </button>

        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-white tracking-tight">
            {roomDetail.title}
          </span>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#111827] border border-[#1E293B] text-xs text-gray-300 hover:bg-[#1E293B] hover:text-white transition"
          >
            {copied ? (
              <Check size={16} className="text-emerald-400" />
            ) : (
              <Copy
                size={16}
                className="group-hover:scale-110 transition-transform"
              />
            )}
            {roomDetail.inviteCode}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* TODO: 사용자 정보 넣기 */}
        <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-xs font-semibold">
          T
        </div>

        <button
          onClick={toggle}
          className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-[#1E293B] transition"
        >
          {isOpen ? (
            <PanelLeftClose size={18} />
          ) : (
            <PanelRightClose size={18} />
          )}
        </button>
      </div>
    </header>
  );
};

export default RoomHeader;
