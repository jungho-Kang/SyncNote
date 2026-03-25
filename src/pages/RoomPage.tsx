import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ChatPanel from "@/components/room/ChatPanel";
import MemoPanel from "@/components/room/MemoPanel";
import WhiteBoard from "@/components/room/WhiteBoard";
import ChatButton from "@/components/room/ChatButton";
import ParticipantsPanel from "@/components/room/ParticipantsPanel";

import { useParticipantsPanelStore } from "@/stores/participantsPanelStore";
import { useRoomDetailStore } from "@/stores/roomStore";
import { connectSocket } from "@/socket/socketClient";
import { useUserStore } from "@/stores/userStore";

const RoomPage = () => {
  const { id: roomId } = useParams();
  const fetchUser = useUserStore(state => state.fetchUser);
  const setRoomDetail = useRoomDetailStore(state => state.setRoomDetail);
  const isParticipantsOpen = useParticipantsPanelStore(state => state.isOpen);

  const [isChatOpen, setIsChatOpen] = useState(false);

  // 방 정보 조회
  useEffect(() => {
    const getRoomDetail = async () => {
      try {
        const res = await axios.get(`/api/v1/rooms/${roomId}`);
        const data = res.data.data;
        setRoomDetail(data);
      } catch (error) {
        console.log(error);
      }
    };

    getRoomDetail();
  }, [roomId, setRoomDetail]);

  // 소켓 연결 + 구독
  useEffect(() => {
    let subscription: any;

    const initSocket = async () => {
      try {
        const client = await connectSocket();

        subscription = client.subscribe("/topic/room/rooms", message => {
          const data = JSON.parse(message.body);
          console.log("실시간 메시지:", data);
        });
      } catch (error) {
        console.error("소켓 연결 실패", error);
      }
    };

    if (roomId) {
      initSocket();
    }

    // cleanup 함수
    return () => {
      subscription?.unsubscribe();
    };
  }, [roomId]);

  // 로그인한 유저정보 가져오기
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex gap-3 h-full">
      <MemoPanel />
      <WhiteBoard />
      {isParticipantsOpen && <ParticipantsPanel />}
      {!isChatOpen && <ChatButton onClick={() => setIsChatOpen(true)} />}

      <ChatPanel
        handleChatClose={() => setIsChatOpen(false)}
        isOpen={isChatOpen}
      />
    </div>
  );
};

export default RoomPage;
