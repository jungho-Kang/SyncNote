import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface FindPasswordProps {
  onClose: () => void;
}

const FindPassword = ({ onClose }: FindPasswordProps) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 서버 API 호출해서 임시 비밀번호 발송
    alert(`입력하신 ${email}로 임시 비밀번호를 발송했습니다.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-4">
      <div className="w-full max-w-sm bg-[#161A22] rounded-xl p-6 space-y-4 border border-[#252A35] shadow-md">
        <h2 className="text-xl font-bold text-white text-center">
          비밀번호 찾기
        </h2>

        {/* 짧은 안내 멘트 */}
        <p className="text-sm text-[#8F98A3] text-center">
          등록된 이메일을 입력해주세요.
        </p>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <div className="space-y-2 text-white">
            <Label htmlFor="fp-email">이메일</Label>
            <Input
              id="fp-email"
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="border-[#262B36] bg-[#101319] focus:border-[#6F4CDB] focus:ring-1 focus:ring-[#6F4CDB] transition"
              required
            />
          </div>

          <Button className="w-full p-3 bg-[#6F4CDB] hover:bg-[#5C3CCF] text-white font-semibold active:scale-[0.98] transition-all duration-150">
            임시 비밀번호 발송
          </Button>
        </form>

        <button
          onClick={onClose}
          className="w-full text-center text-sm text-[#8F98A3] hover:text-[#C4B6F0] transition-colors mt-2"
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default FindPassword;
