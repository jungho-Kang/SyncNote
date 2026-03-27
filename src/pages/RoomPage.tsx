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

import type { Message } from "@/types/Message";

const RoomPage = () => {
  const { id: roomId } = useParams();
  const fetchUser = useUserStore(state => state.fetchUser);
  const setRoomDetail = useRoomDetailStore(state => state.setRoomDetail);
  const isParticipantsOpen = useParticipantsPanelStore(state => state.isOpen);

  const [messages, setMessages] = useState<Message[]>([]);
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

  // 초기 메세지 조회
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`/api/v1/rooms/${roomId}/messages`);
        const data = res.data.data;
        console.log(data);

        setMessages(data.messages);
      } catch (error) {
        console.log(error);
      }
    };

    if (roomId) getMessages();
  }, [roomId]);

  // 소켓 연결 + 구독
  useEffect(() => {
    let subscriptions: any[] = [];

    const initSocket = async () => {
      try {
        const client = await connectSocket();

        // 메시지 구독
        const messageSub = client.subscribe(
          `/topic/rooms/${roomId}/messages`,
          message => {
            const data = JSON.parse(message.body);
            console.log("실시간 메시지", data);

            setMessages(prev => {
              if (prev.some(msg => msg.id === data.id)) return prev;

              const updated = [...prev, data];

              return updated.sort(
                (a, b) =>
                  new Date(a.createdAt).getTime() -
                  new Date(b.createdAt).getTime(),
              );
            });
          },
        );

        // 메세지 읽음처리 구독
        const readSub = client.subscribe(
          `/topic/rooms/${roomId}/read`,
          message => {
            const data = JSON.parse(message.body);
            console.log("읽음 처리:", data);
          },
        );

        // 참여자 구독
        const participantsSub = client.subscribe(
          `/topic/rooms/${roomId}/participants`,
          message => {
            const data = JSON.parse(message.body);
            console.log("참가자 변경:", data);
          },
        );

        subscriptions = [messageSub, readSub, participantsSub];
      } catch (error) {
        console.error("소켓 연결 실패", error);
      }
    };

    if (roomId) {
      initSocket();
    }

    // cleanup 함수
    return () => {
      subscriptions.forEach(sub => sub.unsubscribe());
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
        messages={messages}
      />
    </div>
  );
};

export default RoomPage;
