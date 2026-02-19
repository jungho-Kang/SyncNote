import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { SiKakaotalk } from "react-icons/si";
import { useEffect, useState } from "react";
import FindPassword from "./FindPassword";
import axios from "axios";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showFindPassword, setShowFindPassword] = useState(false);
  const [value, setValue] = useState("");
  const [test, setTest] = useState("");
  const login = useAuthStore(state => state.login);
  const navigate = useNavigate();

  // const postLogin = async () => {
  //   try {
  //     const res = await axios.post("/api/v1/test", {
  //       name: value,
  //       age: 20,
  //     });
  //     alert(res.data.message);
  //   } catch (error) {
  //     console.log("에러 발생 : ", error);
  //   }
  // };

  const getTest = async () => {
    try {
      const res = await axios.get("/api/v1/test");
      console.log(res.data);
      setTest(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // postLogin();

    // 로그인 한 상태로 변경
    login();
    navigate("/", { replace: true });
  };

  useEffect(() => {
    getTest();
  }, []);

  return (
    <div className="space-y-5">
      <form className="space-y-3" onSubmit={handleSubmit}>
        <div>{test}</div>
        {/* <div className="space-y-2 text-white">
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            type="email"
            placeholder="example@email.com"
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
            className="border-[#262B36] bg-[#101319] focus:border-[#6F4CDB] focus:ring-1 focus:ring-[#6F4CDB] transition"
            required
          />
        </div>

        <Button className="w-full p-3 bg-[#6F4CDB] hover:bg-[#5C3CCF] text-white font-semibold active:scale-[0.98] transition-all duration-150">
          로그인
        </Button> */}

        {/* 테스트용 UI */}
        <div className="space-y-2 text-white">
          <Label htmlFor="test">테스트</Label>
          <Input
            id="test"
            type="text"
            placeholder="테스트용"
            value={value}
            onChange={e => setValue(e.target.value)}
            className="border-[#262B36] bg-[#101319] focus:border-[#6F4CDB] focus:ring-1 focus:ring-[#6F4CDB] transition"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full p-3 bg-[#6F4CDB] hover:bg-[#5C3CCF] text-white font-semibold active:scale-[0.98] transition-all duration-150"
        >
          테스트 실행
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
