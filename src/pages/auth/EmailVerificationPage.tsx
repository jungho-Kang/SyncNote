import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { MailCheck, AlertCircle, Clock } from "lucide-react";

const EmailVerificationPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const token = params.get("token");

    if (!token) {
      setStatus("error");
      return;
    }

    const verifyEmail = async () => {
      try {
        await axios.get("/api/v1/auth/email-verification/confirm", {
          params: { token },
        });

        setStatus("success");
      } catch (err: any) {
        if (err.response?.status === 410) {
          setStatus("expired");
        } else {
          setStatus("error");
        }
      }
    };

    verifyEmail();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#101319] px-4">
      <div className="w-full max-w-md bg-[#161A22] border border-[#252A35] rounded-xl p-8 text-center space-y-6 shadow-[0_0_0_1px_#262B36]">
        {/* LOADING */}
        {status === "loading" && (
          <>
            <div className="w-16 h-16 mx-auto rounded-full bg-[#6F4CDB]/10 flex items-center justify-center">
              <Clock className="text-[#6F4CDB] animate-spin" />
            </div>

            <h1 className="text-white text-xl font-semibold">
              이메일 인증 진행 중
            </h1>

            <p className="text-[#9CA3AF] text-sm">잠시만 기다려주세요</p>
          </>
        )}

        {/* SUCCESS */}
        {status === "success" && (
          <>
            <div className="w-16 h-16 mx-auto rounded-full bg-green-500/10 flex items-center justify-center">
              <MailCheck className="text-green-400" />
            </div>

            <h1 className="text-white text-xl font-semibold">인증 완료</h1>

            <p className="text-[#9CA3AF] text-sm">
              이메일 인증이 정상적으로 완료되었습니다
            </p>

            <button
              onClick={() => navigate("/auth")}
              className="w-full bg-[#6F4CDB] hover:bg-[#5a3fc0] transition text-white py-2.5 rounded-md font-medium"
            >
              로그인 하러 가기
            </button>

            <p className="text-xs text-[#7E8690]">로그인 페이지로 이동합니다</p>
          </>
        )}

        {/* EXPIRED */}
        {status === "expired" && (
          <>
            <div className="w-16 h-16 mx-auto rounded-full bg-yellow-500/10 flex items-center justify-center">
              <Clock className="text-yellow-400" />
            </div>

            <h1 className="text-white text-xl font-semibold">인증 링크 만료</h1>

            <p className="text-[#9CA3AF] text-sm">
              인증 메일을 다시 요청해주세요
            </p>

            <button
              onClick={() => navigate("/resend-email")}
              className="w-full bg-[#6F4CDB] hover:bg-[#5a3fc0] transition text-white py-2.5 rounded-md font-medium"
            >
              인증 메일 다시 받기
            </button>
          </>
        )}

        {/* ERROR */}
        {status === "error" && (
          <>
            <div className="w-16 h-16 mx-auto rounded-full bg-red-500/10 flex items-center justify-center">
              <AlertCircle className="text-red-400" />
            </div>

            <h1 className="text-white text-xl font-semibold">잘못된 접근</h1>

            <p className="text-[#9CA3AF] text-sm">유효하지 않은 링크입니다</p>

            <button
              onClick={() => navigate("/auth")}
              className="w-full bg-gray-700 hover:bg-gray-600 transition text-white py-2.5 rounded-md font-medium"
            >
              로그인으로 이동
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailVerificationPage;
