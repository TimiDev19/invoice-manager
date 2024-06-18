import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    // const [authenticated, setIsAuthenticated] = useState(false)


    const handleLogin = async (e) => {
        e.preventDefault()

        const auth = getAuth();

        try {
            await signInWithEmailAndPassword(auth, email, password)
            setIsAuthenticated(true)
            console.log(auth)
        } catch (error) {
            console.log(error)
            window.alert("incorrect email / password")
        }
    }
    return (
        <div className=' bg-[#F8F8FB] h-[100vh] w-full flex flex-col items-center justify-center'>
            <div className=' w-full flex flex-col items-center'>
                <h1 className=' font-semibold text-2xl mb-6 text-[#1E2139]'>Oluwatimilehin Invoice Management Web App</h1>
                <form onSubmit={handleLogin} className=' bg-white w-[35%] p-8 shadow shadow-slate-300 rounded-3xl m-auto flex flex-col items-start justify-center'>
                    <h1 className='text-3xl text-left font-bold mb-4 text-[#7C5DFA]'>Login</h1>
                    <div className=' flex flex-col justify-center items-start w-full'>
                        <label className=' text-left text-[#736a96] mb-2'>Email:</label>
                        <input className=' border border-[#7E88C3] focus:outline-none focus:border-[#7C5DFA] mb-4 px-4 py-2 rounded-lg w-full' value={email} onChange={e => setEmail(e.target.value)} />
                        <label className=' text-left text-[#7c5dfa] mb-2'>Password:</label>
                        <input className=' border border-[#7E88C3] focus:outline-none focus:border-[#7C5DFA] mb-4 px-4 py-2 rounded-lg w-full' value={password} onChange={e => setPassword(e.target.value)} />
                        <button className=' px-4 py-2 bg-[#7c5dfa] rounded-full text-white duration-200 hover:opacity-85'>Login</button>
                    </div>
                </form>
            </div>
        </div>


    )
}

export default Login
