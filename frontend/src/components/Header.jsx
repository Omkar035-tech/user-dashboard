import React from 'react'
import { Settings } from "lucide-react";

const Header = () => {
    return (
        <div>
            <div className='flex justify-between mx-5 my-4 items-center'>

                <h1>All Users: <span className='font-semibold'>{Number(1211).toLocaleString()}</span></h1>

                <button className='flex justify-center items-center border-2 rounded-md px-3 py-1 hover:bg-black hover:text-white transition-all duration-300 border-slate-300'><Settings size={18} className='inline-flex mr-1.5' /> Setting</button>

            </div>
            <hr className='h-[1.5px] bg-slate-300 mx-5' />

        </div>
    )
}

export default Header