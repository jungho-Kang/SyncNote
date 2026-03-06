import { useState, useEffect } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ModalWrapper from "@/components/common/ModalWrapper";

interface JoinByCodeProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (code: string) => void;
}

const JoinByCode = ({ isOpen, onClose, onSubmit }: JoinByCodeProps) => {
  const [code, setCode] = useState("");

  useEffect(() => {
    if (!isOpen) setCode("");
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(code.trim());
    onClose();
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold text-white text-center">
        코드로 참여하기
      </h2>

      <p className="text-sm text-[#8F98A3] text-center">
        공유받은 6자리 코드를 입력해주세요.
      </p>

      <form className="space-y-3" onSubmit={handleSubmit}>
        <div className="space-y-2 text-white">
          <Label htmlFor="join-code">참여 코드</Label>
          <Input
            id="join-code"
            maxLength={6}
            placeholder="ABC123"
            value={code}
            onChange={e => setCode(e.target.value.toUpperCase())}
            className="border-[#262B36] bg-[#101319] focus:border-[#6F4CDB] focus:ring-1 focus:ring-[#6F4CDB] transition"
            required
          />
        </div>

        <Button className="w-full p-3 bg-[#6F4CDB] hover:bg-[#5C3CCF] text-white font-semibold active:scale-[0.98] transition-all duration-150">
          참여하기
        </Button>
      </form>

      <button
        onClick={onClose}
        className="w-full text-center text-sm text-[#8F98A3] hover:text-[#C4B6F0] transition-colors mt-2"
      >
        취소
      </button>
    </ModalWrapper>
  );
};

export default JoinByCode;
