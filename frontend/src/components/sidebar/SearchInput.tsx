import useGetConversations from '@hooks/useGetConversations';
import { useState } from 'react';
import type { FormEvent } from 'react';
import toast from 'react-hot-toast';
import useConversation from 'zustand/useConversation';

const SearchInput = () => {
  const [search, setSearch] = useState('');
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!search) return;
    if (search.length < 3) return toast.error('Ingresa al menos 3 caracteres');

    const conversation = conversations.find((c: ConversationType) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch('');
    } else {
      toast.error('Usuario no encontrado');
    }
  };

  return (
    <form className='flex items-center gap-2' onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Buscar or iniciar una conversación'
        className='input-sm md:input-sm input-bordered rounded-full sm:rounded-md w-full'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};
export default SearchInput;

