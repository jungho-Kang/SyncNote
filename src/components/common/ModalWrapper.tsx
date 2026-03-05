import { useEffect } from "react";

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalWrapper = ({ isOpen, onClose, children }: ModalWrapperProps) => {
  // ESC 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-[#161A22] rounded-xl p-6 space-y-4 border border-[#252A35] shadow-md"
        // 부모의 onClick 실행 안시키도록 하는 코드 stopPropagation
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
