import useGetMessages from "@hooks/useGetMessages";
import Message from "./Message";
import MessageSkeleton from "@components/skeletons/MessageSkeleton";

const Messages = () => {
	const {loading, messages} = useGetMessages();

	return (
		<div className='px-4 flex-1 overflow-auto'>
			{loading && [...Array(3)].map((_, i) => <MessageSkeleton key={i} />)}
			{messages.map((message) => (
				<Message key={message.id} message={message} />
			))}
			{!loading && messages.length === 0 && (
				<div className='mt-4 text-center text-dgray-300'>Envía un mensaje para comenzar la conversación</div>
			)}
		</div>
	);
};
export default Messages;
