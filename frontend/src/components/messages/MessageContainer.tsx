import { ArrowLeft, MessageCircle, MessageCircleMore } from 'lucide-react';
import MessageInput from './MessageInput';
import Messages from './Messages';
import useConversation from 'zustand/useConversation';
import { useAuthContext } from 'context/AuthContext';

// import { MessageCircle } from "lucide-react";

const MessageContainer = () => {
  const { selectedConversation} = useConversation();
  return (
    <div className='w-full h-dvh sm:h-full flex flex-col'>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className='bg-dgray-600 border-dgray-800 border-b-2 px-4 py-2 mb-2 flex gap-4 items-center'>
            <label htmlFor='my-drawer-2' className='cursor-pointer drawer-button block md:hidden'>
              <ArrowLeft className='size-8' />
            </label>
            <img src={`${selectedConversation.profilePic}`} className='w-10 h-10 rounded-full' />
            <span className='text-dgray-100 font-bold'>{selectedConversation.fullName}</span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};
export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
        <p>Bienvenido 👋 {authUser?.fullName}</p>
        <p>Selecciona un chat para empezar a conversar</p>
        <MessageCircle className='size-12 text-center hidden md:block' />
        <label htmlFor='my-drawer-2' className='cursor-pointer mt-8 drawer-button flex flex-col md:hidden items-center'>
          <p>¡Presiona aqui!</p>
          <MessageCircleMore className='size-16' />
        </label>
      </div>
    </div>
  );
};

