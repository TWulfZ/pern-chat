import { useEffect } from 'react';

import { useSocketContext } from '@context/SocketContext.tsx';
import useConversation from 'zustand/useConversation.ts';

import notificationSound from '@assets/sounds/notification.mp3';

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on('newMessage', (newMessage) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.volume = 0.1;
      sound.play();
      setMessages([...messages, newMessage]);
    });
    return () => {
      socket?.off('newMessage');
    };
  }, [socket, messages, setMessages]);
};

export default useListenMessages;
