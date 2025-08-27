import React from 'react'
import {
    LuUtensils,
    LuTrendingUp,
    LuTrendingDown,
    LuTrash2,
} from 'react-icons/lu';

const TransactionInfoCard = ({
    title,
    icon,
    date,
    amount,
    type,
    hideDeleteBtn,
    onDelete,
    theme
}) => {

    const getAmountStyles = () => {
        return type === "Income" ? `${theme === "dark" ? "border bg-green-200 text-green-800" : "bg-green-50 text-green-500"}` : `${theme === "dark" ? "border bg-red-200 text-red-800" : "bg-red-50 text-red-500"}`
    }

    // const onDelete = () =>{

    // }
    return (
        <div className={`group relative flex items-center gap-4 mt-2 p-3 rounded-lg  ${theme === "dark" ? "hover:bg-purple-800/60" : "hover:bg-gray-100/60"}`}>
            <div className={`w-12 h-12 flex items-center justify-center text-xl  rounded-full ${theme === "dark" ? "text-gray-300 bg-gray-800" : "text-gray-800 bg-gray-100"}`}>
                {icon ? (
                    <img src={icon} alt={title} className='w-6 h-6' />
                ) : (
                    <LuUtensils />
                )}
            </div>
            <div className="flex-1 flex items-center justify-between">
                <div>
                    <p className={`text-sm ${theme === "dark" ? "text-gray-200" : "text-gray-700"} font-medium`}>{title}</p>
                    <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-400"} mt-1`}>{date}</p>
                </div>

                <div className="flex items-center gap-2">
                    {!hideDeleteBtn && (
                        <button className='text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'
                            onClick={onDelete}>
                            <LuTrash2 size={18} />
                        </button>
                    )}
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}>
                    <h6 className='text-xs font-medium'>
                        {type === "Income" ? "+" : "-"} ${amount}
                    </h6>
                    {type === "Income" ? <LuTrendingUp /> : <LuTrendingDown />}
                </div>
            </div>
        </div>
    </div >
  )
}

export default TransactionInfoCard