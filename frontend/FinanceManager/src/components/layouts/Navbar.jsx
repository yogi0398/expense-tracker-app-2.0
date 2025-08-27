import React from 'react'
import { useState } from 'react'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import SideMenu from './SideMenu';
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";

const Navbar = ({ activeMenu, theme, onToggle}) => {

    console.log("Inside Navbar", onToggle);
    const [openSideMenu, setOpenSideMenu] = useState(false);

    return (
        <div className={`flex justify-between gap-5 border backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30 ${theme === "dark" ? "bg-black border-2 border-b-[#875cf5]" : "bg-white border-b border-gray-200/50"}`}>
            <button className={`block lg:hidden ${theme === "dark" ? "text-white" : "text-black "}`} onClick={() => {
                setOpenSideMenu(!openSideMenu);
            }}>
                {openSideMenu ? (
                    <HiOutlineX className={`text-2xl ${theme === "dark" ? "text-white" : "text-black "}`} />
                ) : (
                    <HiOutlineMenu className={`text-2xl ${theme === "dark" ? "text-white" : "text-black "}`} />
                )}
            </button>

            <h2 className={`text-lg font-medium ${theme === "dark" ? "text-white" : "text-black "} `}>Finance Manager</h2>

            {openSideMenu && (
                <div className="fixed top-[61px] -ml-4 bg-white">
                    <SideMenu activeMenu={activeMenu} theme={theme} />
                </div>
            )}

            <div className='text-xl text-white'>
                {/* <label htmlFor="darkSwtich" className="relative inline-block w-11 h-6 cursor-pointer" onClick={(e) => onToggle(e)}>
                    <input data-hs-theme-switch="" type="checkbox" id="darkSwtich" className="peer sr-only" />
                    <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-blue-600 dark:bg-neutral-700 dark:peer-checked:bg-blue-500 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></span>
                    <span className="absolute top-1/2 start-0.5 -translate-y-1/2 size-5 bg-white rounded-full shadow-sm !transition-transform duration-200 ease-in-out peer-checked:translate-x-full dark:bg-neutral-400 dark:peer-checked:bg-white"></span>
                </label> */}

                {/* <MdLightMode />
                <MdDarkMode /> */}
                <button className={`${theme === "dark" ? "card-btn" : "card-btn-dark"} text-xl`} onClick={(e) => onToggle(e)}>
                    {theme === "dark" ? (<MdLightMode />) : (<MdDarkMode />)}
                </button>
            </div>
        </div>
    )
}

export default Navbar