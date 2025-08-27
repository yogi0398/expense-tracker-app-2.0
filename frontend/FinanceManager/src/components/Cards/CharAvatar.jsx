import React from 'react'
import { getInitials } from '../../Utils/helper'

const CharAvatar = ({fullName, width, height, style, theme}) => {
  return (
    <div className={`${width || 'w-12'} ${height || 'h-12'} ${style || ''} flex items-center justify-center rounded-full  font-medium  ${theme === "dark" ? "bg-gray-600 text-white" : "text-gray-900 bg-gray-100"}`}>
        {getInitials(fullName || '')}
    </div>
  )
}

export default CharAvatar;