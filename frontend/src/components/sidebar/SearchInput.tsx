const SearchInput = () => {
	return (
		<form className='flex items-center gap-2'>
			<input
				type='text'
				placeholder='Buscar or iniciar una conversación'
				className='input-sm md:input-sm input-bordered rounded-full sm:rounded-md w-full'
			/>

		</form>
	);
};
export default SearchInput;
