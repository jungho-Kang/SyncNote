import { useRoomDetailStore } from "@/stores/roomStore";
import { useUserStore } from "@/stores/userStore";

const ParticipantsPanel = () => {
  const roomDetail = useRoomDetailStore(state => state.roomDetail);
  const userId = useUserStore(state => state.userId);
  console.log("요기 찍히는중??", roomDetail);

  return (
    <div className="w-[260px] flex flex-col bg-[#0F172A] border-l border-[#1E293B]">
      {/* header */}
      <div className="px-4 py-3 border-b border-[#1E293B] text-sm font-semibold">
        참여자{" "}
        <span className="text-gray-400">
          ({roomDetail.participants?.length})
        </span>
      </div>

      {/* list */}
      <div className="flex flex-col p-2">
        {roomDetail.participants?.map(user => (
          <div className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-[#111827] transition">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-semibold">
                {user.nickname.charAt(0)}
              </div>

              <span className="text-sm text-gray-200">
                {user.nickname} {""}
                {user.userId === userId && (
                  <span className="text-gray-400">(나)</span>
                )}
              </span>
            </div>
            {user.role === "OWNER" && (
              <span className="text-[11px] px-2 py-[2px] rounded bg-[#1E293B] text-green-400">
                Owner
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticipantsPanel;
