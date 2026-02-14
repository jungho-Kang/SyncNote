import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { SiKakaotalk } from "react-icons/si";

const Login = () => {
  return (
    <div className="space-y-3">
      <div className="space-y-2 text-white">
        <Label htmlFor="email">이메일</Label>
        <Input
          id="email"
          type="email"
          placeholder="example@email.com"
          className="border-[#262B36] bg-[#101319]"
        />
      </div>

      <div className="space-y-2 text-white">
        <Label htmlFor="password">비밀번호</Label>
        <Input
          id="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          className="border-[#262B36] bg-[#101319]"
        />
      </div>
      <div className="pt-3">
        <Button className="w-full p-3">로그인</Button>
      </div>

      <div className="relative flex items-center my-3">
        <div className="flex-grow border-t border-[#2C3440]" />
        <span className="mx-3 text-[11px] text-[#7E8690] tracking-wide">
          또는
        </span>
        <div className="flex-grow border-t border-[#2C3440]" />
      </div>

      {/* SNS 로그인 */}
      <div className="flex gap-3 pt-3">
        <Button className="flex-1 p-3 bg-[#212630] text-white border border-[#2C3440] hover:bg-[#2A313D] flex items-center justify-center gap-2 transition">
          <FcGoogle size={18} />
          Google
        </Button>
        <Button className="flex-1 p-3 bg-[#212630] text-white border border-[#2C3440] hover:bg-[#2A313D] flex items-center justify-center gap-2 transition">
          <SiKakaotalk size={18} className="text-[#FEE500]" />
          Kakao
        </Button>
      </div>

      {/* 비밀번호 찾기 */}
      <div className="flex justify-center">
        <button className="text-sm text-[#AAB2C0] underline hover:text-[#C4B6F0] transition-colors">
          비밀번호를 잊으셨나요?
        </button>
      </div>
    </div>
  );
};

export default Login;
