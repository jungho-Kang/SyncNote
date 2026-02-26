import { Outlet } from "react-router-dom";
import RoomHeader from "@/components/header/RoomHeader";

const RoomLayout = () => {
  return (
    <div className="min-h-screen bg-[#0B1220] text-white">
      <RoomHeader />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default RoomLayout;
