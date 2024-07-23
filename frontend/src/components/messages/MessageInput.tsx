import useSendMessage from '@hooks/useSendMessage';
import { SendHorizontal } from 'lucide-react';
import { useState } from 'react';

const MessageInput = () => {
  const [message, setMessage] = useState('');

  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;
    await sendMessage(message);
    setMessage('');
  };

  return (
    <form className='px-4 mb-3' onSubmit={handleSubmit}>
      <div className='w-full relative'>
        <input
          type='text'
          className='border text-sm rounded-lg block w-[86%] sm:w-[90%]  p-2.5  bg-gray-700 border-gray-600 text-white'
          placeholder='Send a message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type='submit'
          className='absolute inset-y-0 end-0 w-10 h-10 flex items-center bg-dblue rounded-full text-center'
        >
          {loading ? (
            <span className='loading loading-spinner' />
          ) : (
            <SendHorizontal className='w-8 h-8 text-white ps-2' fill='currentColor' />
          )}
        </button>
      </div>
    </form>
  );
};
export default MessageInput;

