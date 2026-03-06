import { Outlet } from "react-router-dom";
import RoomHeader from "@/components/header/RoomHeader";

const RoomLayout = () => {
  return (
    <div className="h-screen bg-[#0B1220] text-white flex flex-col">
      <RoomHeader />

      <main className="flex-1 px-4 py-4 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default RoomLayout;
