type Visibility = "PRIVATE" | "PUBLIC" | "INVITE_ONLY";
type ParticipantRole = "OWNER" | "EDITOR" | "VIEWER";

interface Participant {
  userId: number;
  nickname: string;
  role: ParticipantRole;
  joinedAt: string;
  lastVisitedAt: string;
}

interface Note {
  id: number;
  content: string;
  updatedAt: string;
}

type BoardElementType = "PEN";

interface BoardElement {
  id: number;
  elementType: BoardElementType;
  createdByUserId: number;
  updatedByUserId: number;
  isDeleted: boolean;
  data: string;
  updatedAt: string;
}

interface Board {
  id: number;
  boardElements: BoardElement[];
}

// 방 상세 정보
export interface RoomDetail {
  id: number;
  title: string;
  description: string;
  visibility: Visibility;
  inviteCode: string;
  ownerId: number;
  updatedAt: string;

  participants?: Participant[];
  note?: Note;
  board?: Board;
}
