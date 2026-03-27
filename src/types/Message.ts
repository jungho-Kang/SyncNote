export interface Message {
  id: number;
  roomId: number;
  userId: number;
  nickname: string;
  messageType: string;
  content: string;
  edited: boolean;
  deleted: boolean;
  readCount: number;
  createdAt: string;
  updatedAt: string;
}
