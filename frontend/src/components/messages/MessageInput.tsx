import { SendHorizontal } from "lucide-react";

const MessageInput = () => {
	return (
		<form className='px-4 mb-3 '>
			<div className='w-full relative'>
				<input
					type='text'
					className='border text-sm rounded-lg block w-[86%] sm:w-[90%]  p-2.5  bg-gray-700 border-gray-600 text-white'
					placeholder='Send a message'
				/>
				<button type='submit' className='absolute inset-y-0 end-0 w-10 h-10 flex items-center bg-dblue rounded-full text-center'>
					<SendHorizontal className='w-8 h-8 text-white ps-2' fill='currentColor' />
				</button>
			</div>
		</form>
	);
};
export default MessageInput;
