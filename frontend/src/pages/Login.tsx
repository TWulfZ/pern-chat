import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { FormEvent } from 'react';
import useLogin from '@hooks/useLogin';

const Login = () => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });

  const { loading, login } = useLogin();

  const handleSubmitForm = async (e: FormEvent) => {
    e.preventDefault();
    login(inputs);
  };

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto transition duration-300 shadow-sm shadow-black'>
      {/* LOGO */}
      <div className='no-drag absolute inset-y-10 inset-x-12 flex gap-2 w-20 h-1'>
        <img src='/nyacord.svg' alt='nyacord' className='w-8 h-8 no-drag' />
        <span className='text-dgray-100 text-xl font-extrabold pt-1'>Nyacord</span>
      </div>
      <div className='w-full p-6 rounded-lg shadow-md bg-dgray-600 bg-clip-padding '>
        <h1 className='text-2xl font-semibold text-center text-white no-drag'>¡Te damos la bienvenida de nuevo!</h1>

        <form onSubmit={handleSubmitForm}>
          <div>
            <label className='label p-2 my-2'>
              <span className='text-dgray-200 text-[0.75rem] font-bold label-text'>
                NOMBRE DE USUARIO <span className='text-dred'>*</span>
              </span>
            </label>
            <input
              type='text'
              className='w-full input input-bordered h-10'
              value={inputs.username}
              onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            />
          </div>

          <div>
            <label className='label my-2'>
              <span className='text-dgray-200 text-[0.75rem] font-bold label-text'>
                CONTRASEÑA <span className='text-dred'>*</span>
              </span>
            </label>
            <input
              type='password'
              className='w-full input input-bordered h-10'
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            />
          </div>
          <div>
            <button className='btn btn-block btn-sm mt-6 my-2 py-6 border text-base flex-nowrap text-dgray-100 bg-dblue hover:bg-dblue-active'
              disabled={loading}>
              { loading ? 'Cargando...' : 'Iniciar sesión' }
            </button>
          </div>
          <Link to='/signup' className='text-sm  hover:underline text-sky-500 mt-2 inline-block no-drag'>
            ¿No tienes una cuenta?
          </Link>
        </form>
      </div>
    </div>
  );
};
export default Login;

