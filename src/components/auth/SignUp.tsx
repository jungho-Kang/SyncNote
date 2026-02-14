import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SignUp = () => {
  return (
    <div className="space-y-3">
      <div className="space-y-2 text-white">
        <Label htmlFor="nickname">닉네임</Label>
        <Input
          id="nickname"
          type="text"
          placeholder="사용할 닉네임"
          className="border-[#262B36] bg-[#101319]"
        />
      </div>

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
          placeholder="4자 이상 입력하세요"
          className="border-[#262B36] bg-[#101319]"
        />
      </div>
      <div className="pt-3">
        <Button className="w-full p-3">회원가입</Button>
      </div>
    </div>
  );
};

export default SignUp;
