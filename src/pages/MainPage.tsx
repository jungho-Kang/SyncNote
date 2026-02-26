import { api } from "@/api/api";
import { Copy, LogIn, Plus, UsersIcon } from "lucide-react";
import { useEffect } from "react";

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
];

const MainPage = () => {
  const getUser = async () => {
    try {
      const res = await api.get("/users/profile");
      console.log(res);
    } catch (error) {}
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1220] to-[#0F1A2D] text-white overflow-auto scrollbar-hide">
      {/* Content */}
      <main className="px-8 py-10 max-w-6xl mx-auto">
        {/* Welcome */}
        <section className="mb-10">
          <h1 className="text-2xl font-bold mb-2">안녕하세요, 안녕님</h1>
          <p className="text-gray-400">방을 만들거나 코드로 참여하세요.</p>
        </section>

        {/* Action Cards */}
        <section className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Create Room */}
          <div className="border border-dashed border-[#334155] rounded-xl p-10 flex flex-col items-center justify-center hover:bg-[#1E293B]/40 transition cursor-pointer">
            <div className="w-14 h-14 bg-[#1E293B] rounded-lg flex items-center justify-center mb-4">
              <Plus size={28} />
            </div>
            <h3 className="text-lg font-semibold mb-1">새 방 만들기</h3>
            <p className="text-gray-400 text-sm text-center">
              협업 워크스페이스를 생성합니다
            </p>
          </div>

          {/* Join by Code */}
          <div className="border border-dashed border-[#334155] rounded-xl p-10 flex flex-col items-center justify-center hover:bg-[#1E293B]/40 transition cursor-pointer">
            <div className="w-14 h-14 bg-[#1E293B] rounded-lg flex items-center justify-center mb-4">
              <LogIn size={28} />
            </div>
            <h3 className="text-lg font-semibold mb-1">코드로 참여하기</h3>
            <p className="text-gray-400 text-sm text-center">
              공유받은 코드로 입장합니다
            </p>
          </div>
        </section>

        {/* Room List */}
        <section>
          <h2 className="text-lg font-semibold mb-4">내 방 목록</h2>

          {rooms.length === 0 ? (
            <p className="text-gray-500 text-sm">아직 생성된 방이 없습니다.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {rooms.map(room => (
                <div
                  key={room.id}
                  className="bg-[#111827] border border-[#1F2937] rounded-xl p-5 hover:border-blue-500 transition cursor-pointer"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">{room.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Copy size={16} />
                      {room.code}
                    </div>
                  </div>

                  <div className="text-sm text-gray-400 flex justify-between">
                    <div className="flex gap-1 items-center">
                      <UsersIcon className="size-4" />
                      <span>{room.members}명</span>
                    </div>
                    <span>{room.createdAt}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default MainPage;
