import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import Navbar from './Navbar';
import SideMenu from './SideMenu';
import Loading from './Loading';

const DashboardLayout = ({children, activeMenu, theme, onToggle}) => {

    const {user} = useContext(UserContext);
    // const theme = "dark";
  return (
    <div className=''>
        <Navbar activeMenu = {activeMenu} theme = {theme} onToggle = {onToggle}/>

        {user ? (
            <div className={`flex ${theme === "dark" ? "bg-black" : ""}`}>
                <div className="max-[1080px]:hidden">
                    <SideMenu activeMenu = {activeMenu} theme = {theme}/>
                </div>
                <div className={`grow mx-5 `}>{children}</div>
            </div>
        ) : (<Loading theme = {theme}/>)}
    </div>
  )
}

export default DashboardLayout;