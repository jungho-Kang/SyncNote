import axios from "axios";
import Swal from "sweetalert2";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useSessionAuth } from "@/hooks/useSessionAuth";
import { useNavigate } from "react-router-dom";

interface SignUpForm {
  nickname: string;
  email: string;
  password: string;
}

const schema = yup.object({
  nickname: yup
    .string()
    .min(2, "닉네임은 2자 이상 입력해주세요.")
    .max(10, "닉네임은 10자 이하로 입력해주세요.")
    .matches(
      /^[가-힣a-zA-Z0-9_]+$/,
      "한글, 영문, 숫자, 언더바(_)만 사용할 수 있습니다.",
    )
    .required("닉네임을 입력해주세요."),

  email: yup
    .string()
    .email("올바른 이메일 형식이 아닙니다.")
    .required("이메일을 입력해주세요."),

  password: yup
    .string()
    .min(8, "비밀번호는 8자 이상 20자 이하로 입력해주세요.")
    .max(20, "비밀번호는 20자 이하로 입력해주세요.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).+$/,
      "영문, 숫자, 특수문자(!@#$%^&*)를 모두 포함해야 합니다.",
    )
    .matches(/^\S+$/, "비밀번호에 공백은 사용할 수 없습니다.")
    .required("비밀번호를 입력해주세요."),
});

const SignUp = () => {
  const navigate = useNavigate();
  const { login } = useSessionAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpForm>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  // 회원가입 post
  const postSignUp = async (data: SignUpForm) => {
    try {
      const res = await axios.post("/api/v1/auth/signup", data);

      // 로그아웃 시 모든 정보 쿠키에서 삭제하기
      // user 정보 쿠키에 저장하기
      console.log("post한 user 정보", res.data.data.user);

      // 자동으로 쿠키에 저장해줌 => getCookie사용해서 accessToken 사용만 하기
      console.log("post한 토큰 정보", res.data.data.tokens.accessToken);

      const result = await Swal.fire({
        title: "회원가입 완료",
        text: "가입이 정상적으로 완료되었습니다.",
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
      if (result.isConfirmed) {
        login();
        navigate("/", { replace: true });
      }
    } catch (error: any) {
      console.log("에러 발생 : ", error);

      // 409 에러는 데이터 중복에러
      const message =
        error.response?.status === 409
          ? "이미 사용 중인 이메일입니다."
          : "입력하신 정보가 올바르지 않습니다.<br/>다시 확인해주세요.";

      Swal.fire({
        title: "회원가입 실패",
        html: message,
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
    }
  };

  const onSubmit = (data: SignUpForm) => {
    postSignUp(data);
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2 text-white">
        <Label htmlFor="nickname">닉네임</Label>
        <Input
          id="nickname"
          type="text"
          placeholder="사용할 닉네임"
          {...register("nickname")}
          className="border-[#262B36] bg-[#101319] focus:border-[#6F4CDB] focus:ring-1 focus:ring-[#6F4CDB] transition"
        />
        {errors.nickname && (
          <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
            {errors.nickname.message}
          </p>
        )}
      </div>

      <div className="space-y-2 text-white">
        <Label htmlFor="email">이메일</Label>
        <Input
          id="email"
          type="email"
          placeholder="사용 중인 이메일을 입력하세요"
          {...register("email")}
          className="border-[#262B36] bg-[#101319] focus:border-[#6F4CDB] focus:ring-1 focus:ring-[#6F4CDB] transition"
        />
        {errors.email && (
          <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2 text-white">
        <Label htmlFor="password">비밀번호</Label>
        <Input
          id="password"
          type="password"
          {...register("password")}
          placeholder="8자 이상 입력하세요"
          className="border-[#262B36] bg-[#101319] focus:border-[#6F4CDB] focus:ring-1 focus:ring-[#6F4CDB] transition"
        />
        {errors.password && (
          <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
            {errors.password.message}
          </p>
        )}
      </div>
      <div className="pt-3">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full p-3 bg-[#6F4CDB] hover:bg-[#5C3CCF] text-white font-semibold active:scale-[0.98] transition-all duration-150"
        >
          {isSubmitting ? "가입 중..." : "회원가입"}
        </Button>
        <p className="text-xs text-gray-400 mt-2 text-center">
          가입 후 이메일로 인증 링크가 발송됩니다.
        </p>
      </div>
    </form>
  );
};

export default SignUp;
