import axios from "axios";
import Swal from "sweetalert2";

import { useState } from "react";

import { Link, useLocation } from "react-router-dom";

import { MdEmail } from "react-icons/md";
import { AiFillUnlock } from "react-icons/ai";

const CheckEmailPage = () => {
  const location = useLocation();
  const email = location.state?.email || "example@email.com";

  const [loading, setLoading] = useState(false);

  const handleResend = async () => {
    try {
      setLoading(true);

      await axios.post("/api/v1/auth/email-verification/request", {
        email,
      });

      await Swal.fire({
        title: "재전송 완료",
        text: "이메일을 다시 발송했습니다.",
        icon: "success",
        theme: "dark",
        width: 360,
        scrollbarPadding: false,
        customClass: {
          popup: "swal-compact",
        },
        confirmButtonText: "확인",
        confirmButtonColor: "#6F4CDB",
      });
    } catch (error: any) {
      await Swal.fire({
        title: "재전송 실패",
        text: "이메일 재전송에 실패했습니다. 다시 시도해주세요.",
        icon: "error",
        theme: "dark",
        width: 360,
        scrollbarPadding: false,
        customClass: {
          popup: "swal-compact",
        },
        confirmButtonText: "확인",
        confirmButtonColor: "#6F4CDB",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#101319] px-4 space-y-6">
      {/* 카드 */}
      <div className="w-full max-w-md bg-[#161A22] rounded-xl shadow-[0_0_0_1px_#262B36] p-6 border border-[#252A35] space-y-6 text-center">
        {/* 아이콘 */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-[#6F4CDB]/10 flex items-center justify-center">
            <MdEmail className="text-[#6F4CDB]" size={32} />
          </div>
        </div>

        {/* 제목 */}
        <h1 className="text-xl font-semibold text-white">
          인증 메일이 발송되었습니다
        </h1>

        {/* 설명 */}
        <div className="space-y-2 text-sm text-[#9CA3AF]">
          <p>
            <span className="text-[#C4B6F0] font-medium">{email}</span> 로 인증
            메일을 보냈습니다.
          </p>
          <p>메일의 링크를 클릭하면 인증이 완료됩니다.</p>
        </div>

        {/* 안내 */}
        <div className="bg-[#101319] border border-[#252A35] rounded-md p-4 text-left text-xs text-[#7E8690] space-y-1">
          <p>• 인증메일은 24시간 동안만 유효합니다.</p>
          <p>• 메일이 보이지 않으면 스팸함을 확인해주세요.</p>
        </div>

        {/* 재전송 버튼 */}
        <button
          onClick={handleResend}
          disabled={loading}
          className={`w-full py-2.5 rounded-md text-white text-sm font-medium transition
            ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-[#6F4CDB] hover:bg-[#5a3fc0]"
            }`}
        >
          {loading ? "재전송 중..." : "이메일 다시 보내기"}
        </button>

        {/* 로그인 이동 */}
        <Link
          to="/auth"
          className="flex items-center justify-center gap-2 text-sm text-[#C4B6F0] hover:underline"
        >
          <AiFillUnlock size={16} />
          로그인 하러가기
        </Link>
      </div>
    </div>
  );
};

export default CheckEmailPage;
