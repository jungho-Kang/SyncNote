import { useState } from "react";

import axios from "axios";
import Swal from "sweetalert2";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { FcGoogle } from "react-icons/fc";
import { SiKakaotalk } from "react-icons/si";

import { useSessionAuth } from "@/hooks/useSessionAuth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FindPassword from "./FindPassword";

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const [showFindPassword, setShowFindPassword] = useState(false);

  const { login } = useSessionAuth();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<LoginForm>();

  const showAlert = async (
    title: string,
    text: string,
    icon: "success" | "error",
  ) => {
    return Swal.fire({
      title,
      text,
      icon,
      theme: "dark",
      width: 360,
      scrollbarPadding: false,
      customClass: { popup: "swal-compact" },
      confirmButtonText: "확인",
      confirmButtonColor: "#6F4CDB",
    });
  };

  const postLogin = async (data: LoginForm) => {
    try {
      const res = await axios.post("/api/v1/auth/login", data);
      const result = await showAlert(
        "로그인 성공",
        "정상적으로 로그인되었습니다.",
        "success",
      );
      if (result.isConfirmed) {
        login();
        navigate("/", { replace: true });
      }
      console.log(res.data.message);
    } catch (error) {
      console.log("에러 발생 : ", error);
      await showAlert("로그인 실패", "로그인 정보를 확인해주세요.", "error");
    }
  };

  const onSubmit = (data: LoginForm) => {
    postLogin(data);
  };

  return (
    <div className="space-y-5">
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2 text-white">
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            type="email"
            placeholder="example@email.com"
            {...register("email", { required: true })}
            className="border-[#262B36] bg-[#101319] focus:border-[#6F4CDB] focus:ring-1 focus:ring-[#6F4CDB] transition"
            required
          />
        </div>

        <div className="space-y-2 text-white">
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            {...register("password", { required: true })}
            className="border-[#262B36] bg-[#101319] focus:border-[#6F4CDB] focus:ring-1 focus:ring-[#6F4CDB] transition"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full p-3 bg-[#6F4CDB] hover:bg-[#5C3CCF] text-white font-semibold active:scale-[0.98] transition-all duration-150"
        >
          로그인
        </Button>
      </form>

      <div className="relative flex items-center">
        <div className="flex-grow border-t border-[#2C3440]" />
        <span className="mx-3 text-[11px] text-[#7E8690] tracking-wide">
          또는
        </span>
        <div className="flex-grow border-t border-[#2C3440]" />
      </div>

      {/* SNS 로그인 */}
      <div className="flex gap-3">
        <Button className=" flex-1 p-3 bg-[#1B1F27] border border-[#2C3440] text-[#D6DEEB] hover:border-[#6F4CDB] hover:bg-[#222834] flex items-center justify-center gap-2 transition-all duration-200 font-medium active:scale-[0.98]">
          <FcGoogle size={18} />
          Google
        </Button>
        <Button className=" flex-1 p-3 bg-[#1B1F27] border border-[#2C3440] text-[#D6DEEB] hover:border-[#6F4CDB] hover:bg-[#222834] flex items-center justify-center gap-2 transition-all duration-200 font-medium active:scale-[0.98]">
          <SiKakaotalk size={18} className="text-[#FEE500]" />
          Kakao
        </Button>
      </div>

      {/* 비밀번호 찾기 */}
      <div className="flex justify-center">
        <button
          className="text-sm text-[#8F98A3] hover:text-[#C4B6F0] transition-colors"
          onClick={() => setShowFindPassword(true)}
        >
          비밀번호를 잊으셨나요?
        </button>
      </div>

      {showFindPassword && (
        <FindPassword onClose={() => setShowFindPassword(false)} />
      )}
    </div>
  );
};

export default Login;
