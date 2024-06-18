import React, { useState } from 'react'
import UseDarkModeHook from '../hooks/UseDarkModeHook'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

const Sidebar = () => {
    const [colorTheme, setTheme] = UseDarkModeHook()
    const [darkSide, setDarkSide] = useState(
        colorTheme === 'light' ? true : false
    )
    const toggleDarkMode = (checked) => {
        setTheme(colorTheme)
        setDarkSide(checked)
    }
    return (

        <>
            <div className=' w-[5vw] py-5 absolute z-50 h-full md:flex sm:hidden bg-[#373B53] dark:text-white hidden flex-col items-center justify-between'>
                <button onClick={toggleDarkMode} className='text-[#858BB2]'>
                    {
                        colorTheme === 'light' ? (<LightModeOutlinedIcon />) : (<DarkModeOutlinedIcon />)
                    }
                </button>
                <button onClick={toggleDarkMode} className='text-[#858BB2]'>
                    {
                        colorTheme === 'light' ? (<LightModeOutlinedIcon />) : (<DarkModeOutlinedIcon />)
                    }
                </button>

            </div>
            <div className=' w-full py-5 block h-[fit] sm:flex md:hidden bg-[#373B53] dark:text-white '>
                <div className=' w-full h-full flex items-center justify-between'>
                    <button onClick={toggleDarkMode} className='text-[#858BB2]'>
                        {
                            colorTheme === 'light' ? (<LightModeOutlinedIcon />) : (<DarkModeOutlinedIcon />)
                        }
                    </button>
                    <button onClick={toggleDarkMode} className='text-[#858BB2]'>
                        {
                            colorTheme === 'light' ? (<LightModeOutlinedIcon />) : (<DarkModeOutlinedIcon />)
                        }
                    </button>
                </div>
            </div>
        </>
    )
}

export default Sidebar
