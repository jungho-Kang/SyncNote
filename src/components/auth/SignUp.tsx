import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpForm>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  // 회원가입 API
  const postSignUp = async (data: SignUpForm) => {
    const res = await axios.post("/api/v1/auth/signup", data);
    return res.data;
  };

  // 이메일 인증 요청 API
  const postVerifyEmail = async (email: string) => {
    await axios.post("/api/v1/auth/email-verification/request", {
      email,
    });
  };

  const onSubmit = async (data: SignUpForm) => {
    try {
      const res = await postSignUp(data);
      console.log("user:", res.data.user);
      await postVerifyEmail(data.email);

      navigate("/auth/email", {
        replace: true,
        state: {
          email: data.email,
        },
      });
    } catch (error: unknown) {
      const err = error as AxiosError<any>;
      console.log("에러 발생:", error);

      // 400 에러는 데이터 중복에러
      const message =
        err.response?.status === 400
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
