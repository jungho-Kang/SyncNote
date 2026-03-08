import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ModalWrapper from "@/components/common/ModalWrapper";

interface CreateRoomProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (roomName: string) => void;
}

const CreateRoom = ({ isOpen, onClose, onSubmit }: CreateRoomProps) => {
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    // 모달 닫히면 초기화
    if (!isOpen) setRoomName("");
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (roomName.trim()) {
      onSubmit(roomName.trim());
      onClose();
    }
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold text-white text-center mb-2">
        새 방 만들기
      </h2>

      <p className="text-sm text-[#8F98A3] text-center mb-4">
        새로 만들 방의 이름을 입력해주세요.
      </p>

      <form className="space-y-3" onSubmit={handleSubmit}>
        <div className="space-y-2 text-white">
          <Label htmlFor="room-name">방 이름</Label>
          <Input
            id="room-name"
            placeholder="예: 디자인 회의실"
            value={roomName}
            onChange={e => setRoomName(e.target.value)}
            className="border-[#262B36] bg-[#101319] focus:border-[#6F4CDB] focus:ring-1 focus:ring-[#6F4CDB] transition"
            required
          />
        </div>

        <Button className="w-full p-3 bg-[#6F4CDB] hover:bg-[#5C3CCF] text-white font-semibold active:scale-[0.98] transition-all duration-150">
          생성하기
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

export default CreateRoom;
