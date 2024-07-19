import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from '@pages/Home'
import SignUp from '@pages/SignUp'
import Login from '@pages/Login'


function App() {

  return (
    <div className='h-dvh flex items-center justify-center'>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/login' element={<Login />}/>
      </Routes>
    </div>
  )
}

export default App
