import { ArrowLeft } from "lucide-react";
import MessageInput from "./MessageInput";
import Messages from "./Messages";

// import { MessageCircle } from "lucide-react";

const MessageContainer = () => {
	return (
		<div className='w-full h-dvh sm:h-full flex flex-col'>
			<>
				{/* Header */}
				<div className='bg-dgray-600 border-dgray-800 border-b-2 px-4 py-2 mb-2 flex gap-4 items-center'>
				<label htmlFor='my-drawer-2' className='cursor-pointer drawer-button block md:hidden'>
          <ArrowLeft className='size-8' />
        </label>
					<img src='https://avatar.iran.liara.run/public/boy?username=johndoe' className='w-10 h-10 rounded-full' />
					<span className='text-dgray-100 font-bold'>John doe</span>
				</div>
				<Messages />
				<MessageInput />
			</>
		</div>
	);
};
export default MessageContainer;

// const NoChatSelected = () => {
// 	return (
// 		<div className='flex items-center justify-center w-full h-full'>
// 			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
// 				<p>Welcome 👋 John Doe ❄</p>
// 				<p>Select a chat to start messaging</p>
// 				<MessageCircle className='text-3xl md:text-6xl text-center' />
// 			</div>
// 		</div>
// 	);
// };
