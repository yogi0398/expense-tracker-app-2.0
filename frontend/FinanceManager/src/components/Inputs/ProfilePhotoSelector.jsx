import React, { useRef, useState } from 'react'
import {LuUser, LuUpload, LuTrash} from 'react-icons/lu'

const ProfilePhotoSelector = ({image, setImage, theme}) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if(file){
            //Update the image state
            setImage(file);
            // console.log(typeof(file));
            //Generate preview URL from the file
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
            // console.log(preview);
        }
    };

    const handleRemoveImage = () => {
        // if (previewUrl) {
        //     URL.revokeObjectURL(previewUrl); // 🧹 free memory
        // }
        setImage(null);
        setPreviewUrl(null);
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };

  return (
    <div className='flex justify-center mb-6'>
        <input
            type="file"
            accept='image/*'
            ref={inputRef}
            onChange={handleImageChange}
            className='hidden'
        />

        {!image ? (
            <div className={`w-20 h-20 flex items-center justify-center ${theme === "dark" ? "bg-purple-900" : "bg-purple-100"} rounded-full relative`}>
                <LuUser className={`text-4xl ${theme === "dark" ? "text-violet-200" : "text-primary"} `} />
                <button 
                    type='button'
                    className='w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer'
                    onClick={onChooseFile}
                >
                    <LuUpload />
                </button>
            </div>
        ) : (
            <div className="relative">
                <img   
                    src={previewUrl}
                    alt="profile photo"
                    className='w-20 h-20 rounded-full object-cover'
                />
                <button
                    type='button'
                    className='w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1'
                    onClick={handleRemoveImage}
                >
                    <LuTrash />
                </button>
                {/* <span className='text-xl'>{previewUrl}</span> */}
            </div>
        )}

    </div>
  )
}

export default ProfilePhotoSelector