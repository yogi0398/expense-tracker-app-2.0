import React from 'react'
import {BlinkBlur} from 'react-loading-indicators'

const Loading = () => {
  return (
    <div className="flex min-h-screen justify-center items-center">
        <BlinkBlur color="#875cf5" size="medium" text="Loading" textColor="" />
    </div>
  )
}

export default Loading