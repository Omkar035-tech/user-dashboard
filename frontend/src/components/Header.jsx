import React from 'react'
import { Plus, SearchIcon, Settings, Upload } from "lucide-react";

const Header = () => {
    return (
        <div>
            <div className='flex justify-between mx-5 my-4 items-center'>

                <h1>All Users: <span className='font-semibold'>{Number(1211).toLocaleString()}</span></h1>

                <button className='flex justify-center items-center border-2 rounded-md px-3 py-1 hover:bg-black hover:text-white transition-all duration-300 border-slate-300'><Settings size={18} className='inline-flex mr-1.5' /> Setting</button>

            </div>
            <hr className='h-[1.5px] bg-slate-300 mx-5' />
            <div className='flex items-center justify-between mx-5 my-4'>

                <button className='flex justify-center items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'><Plus size={18} className='inline-flex mr-1.5' /> Add new user</button>
                <div className='flex gap-3'>
                    <button className='flex justify-center items-center border-2 rounded-md px-3 py-1 hover:bg-black hover:text-white transition-all duration-300 border-slate-300'><Upload size={18} className='inline-flex mr-1.5' /> Upload Excel/csv</button>
                    <button className='flex justify-center items-center border-2 rounded-md px-3 py-1 hover:bg-black hover:text-white transition-all duration-300 border-slate-300'><SearchIcon size={18} className='inline-flex mr-1.5' /> Search</button>
                </div>

            </div>
            <hr className='h-[1.5px] bg-slate-300 mx-5' />
        </div>
    )
}

export default Header