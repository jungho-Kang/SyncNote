import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import MemoPanel from "@/components/room/MemoPanel";
import WhiteBoard from "@/components/room/WhiteBoard";
import ChatButton from "@/components/room/ChatButton";
import ParticipantsPanel from "@/components/room/ParticipantsPanel";

import { useParticipantsPanelStore } from "@/stores/participantsPanelStore";
import { useRoomDetailStore } from "@/stores/roomStore";
import { connectSocket } from "@/socket/socketClient";

const RoomPage = () => {
  const { id: roomId } = useParams();
  const setRoomDetail = useRoomDetailStore(state => state.setRoomDetail);
  const isOpen = useParticipantsPanelStore(state => state.isOpen);

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
