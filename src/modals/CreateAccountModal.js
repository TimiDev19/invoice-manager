import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';


const CreateAccountModal = ({ setIsCreateAccountOpen, setIsAuthenticated }) => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const handleRegister = async (e) => {
    e.preventDefault()

    const auth = getAuth();

    if (document.activeElement.name === 'register') {
      try {
        createUserWithEmailAndPassword(auth, email, password)
        setIsAuthenticated(true)
      } catch (error) {
        console.log(error)
      }
    }


  }
  return (
    <div onClick={(e) => {
      if (e.target !== e.currentTarget) {
        return
      }
      setIsCreateAccountOpen(false)
    }} className='absolute z-50 w-full max-h-[100vh] top-0 left-0 bottom-0 right-0 bg-[#00000080] flex items-center justify-center'>
      <div className=' w-[90%] m-auto sm:w-full flex flex-col items-center'>

        <form onSubmit={handleRegister} className=' bg-white md:w-[35%] p-8 shadow shadow-slate-300 rounded-3xl m-auto flex flex-col items-start justify-center'>
          <h1 className='text-3xl text-left font-bold mb-4 text-[#7C5DFA]'>Create Account</h1>
          <div className=' flex flex-col justify-center items-start w-full'>
            <label className=' text-left text-[#736a96] mb-2'>Email:</label>
            <input className=' border border-[#7E88C3] focus:outline-none focus:border-[#7C5DFA] mb-4 px-4 py-2 rounded-lg w-full' value={email} onChange={e => setEmail(e.target.value)} />
            <label className=' text-left text-[#7c5dfa] mb-2'>Password(must be 6 characters long):</label>
            <input className=' border border-[#7E88C3] focus:outline-none focus:border-[#7C5DFA] mb-4 px-4 py-2 rounded-lg w-full' value={password} onChange={e => setPassword(e.target.value)} />
            <div className=' flex items-center justify-center'>
              <button name='register' className=' px-4 py-2 bg-[#7c5dfa] rounded-full text-white duration-200 hover:opacity-85'>Register</button>
              <button onClick={() => setIsCreateAccountOpen(false)} className=' mx-4 px-4 py-2 bg-[#7c5dfa] rounded-full text-white duration-200 hover:opacity-85'>Cancel</button>
              {/* <button name='register' className=' cursor-pointer mx-4 text-blue-700 duration-200 hover:opacity-50'>Don't have an account? Create Account</button> */}
            </div>
          </div>
        </form>

      </div>
    </div>
  )
}

export default CreateAccountModal
