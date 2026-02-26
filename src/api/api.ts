import axios from "axios";

export const api = axios.create({
  baseURL: "/api/v1",
  withCredentials: true, // 쿠키 포함
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 리프레시 토큰으로 새 액세스 토큰 발급
        await axios.post("/api/v1/auth/refresh", {}, { withCredentials: true });

        // 원래 요청 재시도
        return api(originalRequest);
      } catch (refreshError) {
        console.log("리프레시 토큰 만료 → 로그아웃 처리");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
