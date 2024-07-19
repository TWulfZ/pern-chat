type GenderCheckboxProps = {
	selectedGender: string;
	onCheckboxChange: (gender: 'male' | 'female') => void;
}

const GenderCheckbox = ({ selectedGender, onCheckboxChange}: GenderCheckboxProps )  => {
	return (
		<div className='flex'>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer`}>
					<span className='label-text'>Hombre</span>
					<input type='checkbox' className='checkbox border-slate-900' 
					checked={selectedGender === 'male'}
					onChange={() => onCheckboxChange('male')}/>
				</label>
			</div>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer`}>
					<span className='label-text'>Mujer</span>
					<input type='checkbox' className='checkbox border-slate-900' 
					checked={selectedGender === 'female'}
					onChange={() => {onCheckboxChange('female')}}/>
					
				</label>
			</div>
			<span className='text-dred ms-2'>*</span>
		</div>
	);
};
export default GenderCheckbox;
