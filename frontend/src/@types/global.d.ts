type ConversationType = {
  id: string;
  fullName: string;
  profilePic: string;
  emoji: string;
}

type MessageType = {
  id: string;
  body: string;
  senderId: string;
  createdAt: string;
  shouldShake: boolean;
}
