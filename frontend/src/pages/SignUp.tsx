import { Link } from 'react-router-dom';
import GenderCheckbox from '../components/GenderCheckbox';
import { useState } from 'react';
import type { FormEvent } from 'react';
import useSignup from '@hooks/useSignup';

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: '',
  });

  const {loading, signup} = useSignup();

  const handleCheckboxChange = (gender: 'male' | 'female') => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    signup(inputs);
  };

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto shadow-sm shadow-black'>
      {/* LOGO */}
      <div className='no-drag absolute inset-y-10 inset-x-12 flex gap-2 w-20 h-1'>
        <img src='/nyacord.svg' alt='nyacord' className='w-8 h-8 no-drag' />
        <span className='text-dgray-100 text-xl font-extrabold pt-1'>Nyacord</span>
      </div>
      <div className='w-full p-6 rounded-lg shadow-md bg-dgray-600 bg-clip-padding'>
        <h1 className='no-drag text-2xl font-semibold text-center text-dgray-100 mb-4'>Crear una cuenta</h1>

        <form onSubmit={handleSubmitForm}>
          <div>
            <label className='label p-2'>
              <span className='text-dgray-200 text-[0.75rem] font-bold label-text'>
                NOMBRE PARA MOSTRAR <span className='text-dred'>*</span>
              </span>
            </label>
            <input
              type='text'
              placeholder=''
              className='w-full input input-bordered  h-10'
              value={inputs.fullName}
              onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
            />
          </div>

          <div>
            <label className='label p-2 '>
              <span className='text-dgray-200 text-[0.75rem] font-bold label-text'>NOMBRE DE USUARIO</span>
            </label>
            <input
              type='text'
              placeholder=''
              className='w-full input input-bordered h-10'
              value={inputs.username}
              onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            />
          </div>

          <div>
            <label className='label'>
              <span className='text-dgray-200 text-[0.75rem] font-bold label-text'>
                CONTRASEÑA <span className='text-dred'>*</span>
              </span>
            </label>
            <input
              type='password'
              placeholder=''
              className='w-full input input-bordered h-10'
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            />
          </div>

          <div>
            <label className='label'>
              <span className='text-dgray-200 text-[0.75rem] font-bold label-text'>
                CONFIRMAR CONTRASEÑA <span className='text-dred'>*</span>
              </span>
            </label>
            <input
              type='password'
              placeholder=''
              className='w-full input input-bordered h-10 mb-2'
              value={inputs.confirmPassword}
              onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
            />
          </div>

          <GenderCheckbox selectedGender={inputs.gender} onCheckboxChange={handleCheckboxChange} />

          <div>
            <button className='btn btn-block btn-sm mt-6 my-2 py-6 border text-base flex-nowrap text-dgray-100 bg-dblue hover:bg-dblue-active
            ' disabled={loading}>
              {loading ? 'Procesando...' : 'Continuar'}
            </button>
          </div>

          <Link to={'/login'} className='text-sm hover:underline text-sky-500 mt-4 inline-block'>
            ¿Ya tienes una cuenta?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

