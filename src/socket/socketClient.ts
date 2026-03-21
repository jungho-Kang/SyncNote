import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { SERVER_URL } from "@/constants/url";

// STOMP 클라이언트 저장 변수
let client: Client | null = null;

export const connectSocket = (): Promise<Client> => {
  return new Promise((resolve, reject) => {
    if (client && client.connected) {
      resolve(client);
      return;
    }

    // SockJS 생성
    const socket = new SockJS(`${SERVER_URL}/ws`);

    // STOMP 클라이언트 생성
    client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: str => {
        console.log("STOMP DEBUG 👉", str);
      },
    });

    client.onConnect = () => {
      console.log("소켓 연결 성공");
      resolve(client as Client);
    };

    client.onStompError = frame => {
      console.error("STOMP 에러", frame);
    };

    client.onWebSocketError = error => {
      console.error("WebSocket 에러", error);
      reject(error);
    };

    client.activate();
  });
};

// 현재 클라이언트 반환 함수
export const getClient = (): Client | null => client;

// 소켓 연결 해제
export const disconnectSocket = () => {
  if (client) {
    client.deactivate();
    client = null;
  }
};
