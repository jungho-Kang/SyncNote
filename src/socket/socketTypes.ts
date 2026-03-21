export interface ChatMessage {
  sender: string;
  message: string;
}

export interface ServerMessage<T> {
  body: string; // STOMP는 항상 string
}
