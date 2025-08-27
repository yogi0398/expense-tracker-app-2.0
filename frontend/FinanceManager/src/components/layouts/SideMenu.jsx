import React from 'react'
import {SIDE_MENU_DATA} from '../../Utils/data.js';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import {useNavigate} from 'react-router-dom';
import CharAvatar from '../Cards/CharAvatar.jsx';

const SideMenu = ({activeMenu, theme}) => {
    const {user, clearUser} = useContext(UserContext);

    const navigate = useNavigate();

    const handleClick = (route) => {
        if(route === "logout"){
            handleLogout();
            return;
        }

        navigate(route);
    }

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate("/login");
    }

  return (
    <div className={`w-64 h-[calc(100vh-61px)] border-r p-5 sticky top-[61px] z-20 ${theme === "dark" ? "bg-black border-primary" : "bg-white border-gray-200/50"}`}>
        <div className='flex flex-col items-center justify-center gap-3 mt-3 mb-7'>
            {user?.profileImageUrl ? (
                <img 
                    src={user?.profileImageUrl || null}
                    alt="Profile Image"
                    className={`w-20 h-20 rounded-full ${theme === "dark" ? "bg-gray-800" : "bg-slate-400"}`}
                />) : <CharAvatar 
                        fullName = {user?.fullName}
                        width = "w-20"
                        height = "h-20"
                        style = "text-xl"
                        theme = {theme}
                    />
            }
            <h5 className={` font-medium leading-6 ${theme === "dark" ? "text-white" : "text-gray-950"}`}>
                {user?.fullName || ""}
            </h5>
        </div>

            
        {
        SIDE_MENU_DATA.map((item, index) => (
            <button
                key={`menu_${index}`}
                className={`w-full flex items-center gap-4 text-[15px] ${activeMenu == item.label ? "text-white bg-primary" : theme === "dark" ? "text-white" : "text-gray-950"} py-3 px-6 rounded-lg mb-3 hover:cursor-pointer`}
                onClick={() => handleClick(item.path)}
            >
                <item.icon className='text-xl' />
                {item.label}
            </button>
        ))}
        
    </div>
  )
}

export default SideMenu