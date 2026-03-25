import { useEffect } from "react";

import Swal from "sweetalert2";

import { Outlet, useNavigate } from "react-router-dom";

import { useUserStore } from "@/stores/userStore";
import { useSessionAuth } from "@/hooks/useSessionAuth";

import MainHeader from "@/components/header/MainHeader";

const MainLayout = () => {
  const fetchUser = useUserStore(state => state.fetchUser);

  const navigate = useNavigate();
  const { logout } = useSessionAuth();

  useEffect(() => {
    // 유저 정보 GET
    fetchUser();
  }, []);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "로그아웃 하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      theme: "dark",
      width: 360,
      // 오른쪽에 생기는 회색선 삭제
      scrollbarPadding: false,
      customClass: {
        popup: "swal-compact",
      },
      confirmButtonText: "확인",
      cancelButtonText: "취소",
      confirmButtonColor: "#6F4CDB",
    });

    if (result.isConfirmed) {
      const confirm = await Swal.fire({
        title: "로그아웃 완료",
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
      if (confirm.isConfirmed) {
        logout();
        navigate("/auth", { replace: true });
      }
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1220] to-[#0F1A2D] text-white overflow-auto scrollbar-hide">
      <MainHeader handleLogout={handleLogout} />
      <main className="px-8 py-10 max-w-6xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
