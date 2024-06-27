import React, { useState } from 'react'
import { getAuth, signOut } from "firebase/auth";



const LogoutModal = ({ setLogoutOpen , setIsAuthenticated}) => {
    

    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            setIsAuthenticated(false)
        }).catch((error) => {
            console.log(error)
        });
    }
    return (
        <div onClick={(e) => {
            if (e.target !== e.currentTarget) {
                return
            }
            setLogoutOpen(false)
        }} className='absolute z-50 w-full max-h-[100vh] top-0 left-0 bottom-0 right-0 bg-[#00000080] flex items-center justify-center'>
            <div className=' bg-white m-auto p-6 rounded-3xl'>
                <h1>Are you sure you would like to logout?</h1>
                <div className=' flex items-center justify-center mt-8'>
                    <button onClick={handleLogout} className=' mx-4 py-2 px-5 rounded-full text-white font-semibold bg-red-500 hover:opacity-60 duration-200'>Yes</button>
                    <button onClick={() => setLogoutOpen(false)} className=' mx-4 py-2 px-5 rounded-full text-white font-semibold bg-gray-500 hover:opacity-60 duration-200'>No</button>
                </div>
            </div>
        </div>
    )
}

export default LogoutModal
