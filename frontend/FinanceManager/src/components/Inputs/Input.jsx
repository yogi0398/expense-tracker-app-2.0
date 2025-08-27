import React, { useState } from 'react'
import {FaRegEye, FaRegEyeSlash} from 'react-icons/fa6'

const Input = ({ value, onChange, placeholder, label, type, theme}) => {

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () =>{
    setShowPassword(!showPassword);
  }

  return (
    <div className=''>
      <label className={`text-[13px] ${theme === "dark" ? "text-gray-200" : "text-slate-800"}`}>{label}</label>

      <div className={`${theme === "dark" ? "input-box-dark" : "input-box"}`}>
        <input 
        type={type == 'password' ? showPassword ? 'text' : 'password' : type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e)}
        className={`w-full outline-none bg-transparent`}
        />
        
        {type === "password" && (
          <>
            {showPassword ? (
              <FaRegEye
                size={22}
                className="text-primary cursor-pointer"
                onClick={() => toggleShowPassword()}
              />
            ) : (
              <FaRegEyeSlash 
                size={22}
                className="text-slate-400 cursor-pointer"
                onClick={() => toggleShowPassword()}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Input