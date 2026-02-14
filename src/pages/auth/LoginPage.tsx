import { useState } from "react";

import { cn } from "@/lib/utils";

import Login from "@/components/auth/Login";
import SignUp from "@/components/auth/SignUp";

import { Button } from "@/components/ui/button";

import Logo from "@/assets/images/logo.svg";
import { MessagesSquare, Notebook, PencilLine } from "lucide-react";

const LoginPage = () => {
  const [mode, setMode] = useState<"login" | "signup">("login"); // 모드 상태

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#101319] space-y-6">
      <div>
        <div className="flex items-center gap-3 justify-center">
          <img src={Logo} alt="로고 이미지" />
          <div className="text-[#fff] font-semibold text-[28px] font-logo tracking-tight leading-none">
            <span>Sync</span>
            <span className="text-[#C4B6F0] font-medium">Note</span>
          </div>
        </div>

        <div className="flex flex-col items-center text-center space-y-1 max-w-xs mt-5">
          <p className="text-lg font-semibold text-white tracking-tight">
            같이 모여 생각을 적어보세요
          </p>
          <p className="text-sm text-[#9CA3AF] leading-relaxed">
            작은 기록들이 모여 하나의 이야기가 됩니다
          </p>
        </div>

        <div className="flex items-center justify-center gap-8 mt-6 text-sm text-[#9CA3AF]">
          <div className="flex flex-col items-center gap-1 opacity-80">
            <Notebook size={18} className="text-[#C4B6F0]" strokeWidth={1.5} />
            <span>메모</span>
          </div>
          <div className="flex flex-col items-center gap-1 opacity-80">
            <PencilLine
              size={18}
              className="text-[#C4B6F0]"
              strokeWidth={1.5}
            />
            <span>화이트보드</span>
          </div>
          <div className="flex flex-col items-center gap-1 opacity-80">
            <MessagesSquare
              size={18}
              className="text-[#C4B6F0]"
              strokeWidth={1.5}
            />
            <span>채팅</span>
          </div>
        </div>
      </div>

      {/* 로그인 박스 */}
      <div className="w-full max-w-sm bg-[#161A22] text-[#7E8690] rounded-xl shadow-md p-6 space-y-3 border border-[#252A35]">
        <h1 className="text-2xl font-bold text-center text-white">시작하기</h1>
        <div className="text-center text-sm">
          로그인하거나 새 계정을 만들어보세요
        </div>

        {/* 토글 버튼 */}
        <div className="flex justify-center gap-2 bg-[#212630] rounded-md p-1 mt-2">
          <Button
            variant={"toggle"}
            onClick={() => setMode("login")}
            className={cn(mode === "login" && "bg-[#101319]")}
          >
            로그인
          </Button>
          <Button
            variant={"toggle"}
            onClick={() => setMode("signup")}
            className={cn(mode === "signup" && "bg-[#101319]")}
          >
            회원가입
          </Button>
        </div>

        {/* 입력 컴포넌트 */}
        {mode === "login" ? <Login /> : <SignUp />}
      </div>
    </div>
  );
};

export default LoginPage;
