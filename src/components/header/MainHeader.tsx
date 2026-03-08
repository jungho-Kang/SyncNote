import Logo from "@/assets/images/logo.svg";
import { useUserStore } from "@/store/userStore";

import { LogOut } from "lucide-react";
import { useEffect } from "react";

interface MainHeaderProps {
  handleLogout: () => void;
}

const MainHeader = ({ handleLogout }: MainHeaderProps) => {
  const nickname = useUserStore(state => state.nickname);

  useEffect(() => {
    console.log(nickname);
  }, []);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#161A22]/80 border-b border-white/5">
      <div className="max-w-6xl mx-auto px-8 py-5 flex justify-between items-center">
        {/* 로고 영역 */}
        <div className="flex items-center gap-3 cursor-pointer">
          <img src={Logo} alt="로고 이미지" className="h-7 w-auto" />
          <div className="text-white text-xl font-semibold font-logo">
            <span>Sync</span>
            <span className="text-[#C4B6F0] font-medium">Note</span>
          </div>
        </div>

        {/* 우측 영역 */}
        <div className="flex items-center gap-5 text-sm">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#6F4CDB] text-white font-semibold">
              {nickname?.[0] || "?"}
            </div>
            <span className="text-gray-300">{nickname}</span>
          </div>

          <button
            className="group flex items-center gap-1.5 text-gray-400 hover:text-white transition"
            onClick={handleLogout}
          >
            <LogOut className="size-3.5 opacity-50 group-hover:opacity-100 transition duration-200" />
            로그아웃
          </button>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
