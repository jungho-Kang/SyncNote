import { useEffect, useState } from "react";

import { api } from "@/api/api";

import { LogIn, Plus } from "lucide-react";

import RoomCard from "@/components/room/RoomCard";
import JoinByCode from "@/components/room/JoinByCode";
import RoomActionCard from "@/components/room/RoomActionCard";

interface Room {
  id: string;
  name: string;
  code: string;
  createdAt: string;
  members: number;
}

const rooms: Room[] = [
  {
    id: "1",
    name: "sdffd",
    code: "ZRFMXT",
    createdAt: "02/12 17:29",
    members: 1,
  },
  {
    id: "2",
    name: "asdfd",
    code: "AXFEDE",
    createdAt: "02/13 10:29",
    members: 6,
  },
  {
    id: "3",
    name: "wwdrd",
    code: "GGERDS",
    createdAt: "02/15 08:29",
    members: 5,
  },
  {
    id: "4",
    name: "drdcs",
    code: "DDWSAZ",
    createdAt: "02/19 20:29",
    members: 3,
  },
];

const MainPage = () => {
  const [isJoinByCodeOpen, setIsJoinByCodeOpen] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await api.get("/users/profile");
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1220] to-[#0F1A2D] text-white overflow-auto scrollbar-hide">
      <main className="px-8 py-10 max-w-6xl mx-auto">
        <section className="mb-10">
          {/* TODO: 사용자 정보 가져오기 */}
          <h1 className="text-2xl font-bold mb-2">안녕하세요, 안녕님</h1>
          <p className="text-gray-400">방을 만들거나 코드로 참여하세요.</p>
        </section>

        <section className="flex gap-6 mb-12">
          <RoomActionCard
            icon={<Plus size={28} className="text-indigo-400" />}
            title="새 방 만들기"
            description="협업 워크스페이스를 생성합니다"
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

          {rooms.length === 0 ? (
            <p className="text-gray-500 text-sm">아직 생성된 방이 없습니다.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {rooms.map(room => (
                <RoomCard
                  key={room.id}
                  id={room.id}
                  name={room.name}
                  code={room.code}
                  members={room.members}
                  createdAt={room.createdAt}
                  onClick={() => console.log(room.id)}
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
          console.log("입력 코드:", code);

          // TODO: API 호출해서 방 입장 처리
          // await api.post("/rooms/join", { code });

          setIsJoinByCodeOpen(false);
        }}
      />
    </div>
  );
};

export default MainPage;
