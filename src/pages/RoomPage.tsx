import MemoPanel from "@/components/room/MemoPanel";
import WhiteBoard from "@/components/room/WhiteBoard";
import ParticipantsPanel from "@/components/room/ParticipantsPanel";
import { useParticipantsPanelStore } from "@/store/participantsPanelStore";
import ChatButton from "@/components/room/ChatButton";

const RoomPage = () => {
  const isOpen = useParticipantsPanelStore(state => state.isOpen);
  return (
    <div className="flex gap-3 h-full">
      <MemoPanel />
      <WhiteBoard />
      {isOpen && <ParticipantsPanel />}

      <ChatButton />
    </div>
  );
};

export default RoomPage;
