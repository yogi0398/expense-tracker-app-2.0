import React from 'react'

const Modal = ({children, isOpen, onClose, title, theme}) => {

    if(!isOpen) return null

  return (
    <div className='fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%)] max-h-full overflow-y-auto overflow-x-hidden bg-black/70 bg-opacity-50'>
        <div className="relative p-4 w-full max-w-2xl max-h-full">
        {/* modal content  */}
        <div className={`relative  border border-white/40 rounded-lg shadow-sm ${theme === "dark" ? "bg-black": "bg-white"}`}>
            {/* modal header  */}
            <div className={`flex items-center justify-between p-4 md:p-5 border-b rounded-t ${theme === "dark" ? "border-gray-600": "border-gray-200"}`}>
                <h3 className={`text-lg font-medium ${theme === "dark" ? "text-white": "text-gray-900"}`}>
                    {title}
                </h3>

                <button className={`rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center  cursor-pointer ${theme === "dark" ? "text-gray-400 hover:bg-gray-600 hover:text-white": "text-gray-400 hover:bg-gray-200 hover:text-gray-900"}`} type="button" onClick={onClose}>
                    <svg
                        className='w-3 h-3'
                        aria-hidden="true"
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 14 14'
                    >
                        <path
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth="2"
                            d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                        />
                    </svg>
                </button>
            </div>

            {/* modal body  */}
            <div className="p-4 md:p-5 space-y-4">
                {children}
            </div>
        </div>
        </div>
    </div>
  )
}

export default Modal