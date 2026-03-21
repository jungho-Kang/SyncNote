import { useEffect, useState } from "react";

import axios from "axios";
import Swal from "sweetalert2";
import { LogIn, Plus } from "lucide-react";

import { useUserStore } from "@/stores/userStore";

import CreateRoom from "@/components/main/CreateRoom";
import JoinByCode from "@/components/main/JoinByCode";
import RoomActionCard from "@/components/main/RoomActionCard";
import RoomCard from "@/components/main/RoomCard";
import { useNavigate } from "react-router-dom";

interface Room {
  id: number;
  title: string;
  description: string;
  visibility: "PRIVATE" | "PUBLIC" | "INVITE_ONLY";
  inviteCode: string;
  ownerId: number;
}

interface CreateRoom {
  title: string;
  visibility: "PRIVATE" | "PUBLIC" | "INVITE_ONLY";
}

const MainPage = () => {
  const nickname = useUserStore(state => state.nickname);
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Room[] | null>(null);
  const [isJoinByCodeOpen, setIsJoinByCodeOpen] = useState(false);
  const [isCreateRoomOpen, setIsCreateRoomOpen] = useState(false);

  const postCreateRoom = async (data: CreateRoom) => {
    try {
      const res = await axios.post("/api/v1/rooms", data);

      // roomId
      const roomId = res.data.data.id;
      console.log(res.data.data.id);
      const result = await Swal.fire({
        title: "방 생성 완료",
        text: "방 생성에 성공하셨습니다.",
        icon: "success",
        theme: "dark",
        width: 360,
        scrollbarPadding: false,
        customClass: {
          popup: "swal-compact",
        },
        confirmButtonText: "확인",
        confirmButtonColor: "#6F4CDB",
      });
      if (result.isConfirmed) {
        navigate(`/room/${roomId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postJoinCode = async (code: string) => {
    try {
      const res = await axios.post("/api/v1/rooms/join", { inviteCode: code });
      const roomId = res.data.data.roomId;
      console.log("잘 보내 졌니??????", roomId);
      navigate(`/room/${roomId}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getRoom = async () => {
      try {
        const res = await axios.get("/api/v1/rooms");
        console.log("모야호~~~~~~~~~~~~~~~~~~~", res.data.data);
        setRooms(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getRoom();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1220] to-[#0F1A2D] text-white overflow-auto scrollbar-hide">
      <main className="px-8 py-10 max-w-6xl mx-auto">
        <section className="mb-10">
          <h1 className="text-2xl font-bold mb-2">안녕하세요, {nickname}님</h1>
          <p className="text-gray-400">방을 만들거나 코드로 참여하세요.</p>
        </section>

        <section className="flex gap-6 mb-12">
          <RoomActionCard
            icon={<Plus size={28} className="text-indigo-400" />}
            title="새 방 만들기"
            description="협업 워크스페이스를 생성합니다"
            onClick={() => setIsCreateRoomOpen(true)}
          />

          <RoomActionCard
            icon={<LogIn size={28} className="text-emerald-400" />}
            title="코드로 참여하기"
            description="공유받은 코드로 입장합니다"
            onClick={() => setIsJoinByCodeOpen(true)}
          />
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4">내 방 목록</h2>

          {!rooms ? (
            <p className="text-gray-500 text-sm">아직 생성된 방이 없습니다.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {rooms.map(room => (
                <RoomCard
                  key={room.id}
                  id={room.id}
                  name={room.title}
                  code={room.inviteCode}
                  // members={room.members}
                  // createdAt={room.createdAt}
                  onClick={() => navigate(`/room/${room.id}`)}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <JoinByCode
        isOpen={isJoinByCodeOpen}
        onClose={() => setIsJoinByCodeOpen(false)}
        onSubmit={code => {
          postJoinCode(code);
          setIsJoinByCodeOpen(false);
        }}
      />

      <CreateRoom
        isOpen={isCreateRoomOpen}
        onClose={() => setIsCreateRoomOpen(false)}
        onSubmit={title => {
          const createRoomData: CreateRoom = {
            title,
            visibility: "INVITE_ONLY",
          };
          postCreateRoom(createRoomData);
          setIsCreateRoomOpen(false);
        }}
      />
    </div>
  );
};

export default MainPage;
