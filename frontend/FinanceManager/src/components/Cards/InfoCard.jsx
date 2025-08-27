import React from 'react'

const InfoCard = ({ icon, label, value, color, theme }) => {
    return (
        <div className={`flex gap-6  ${theme == "dark" ? "card-dark" : "card"}`}>
            <div className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}>
                {icon}
            </div>
            <div>
                <h6 className={`text-sm  mb-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>{label}</h6>
                <span className={`text-[22px] ${theme === "dark" ? "text-white" : ""}`}>${value}</span>
            </div>
        </div>
    )
}

export default InfoCard;