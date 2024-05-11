import React from "react"
import { RxAvatar } from "react-icons/rx"
const Avatar = () => {
  return (
    <div className="flex flex-col items-center pb-4 border-b">
      {/* Avatar upload and preview */}
      <div className="w-32 h-32 rounded-full mt-4 mb-3 overflow-hidden bg-white">
        <div className="flex items-center justify-center h-full">
          {/* Placeholder or icon if no image has been selected */}
          <RxAvatar size={120} />
        </div>
      </div>
      <input type="file" accept="image/*" className="hidden" id="avatarInput" />
      <label
        htmlFor="avatarInput"
        className="cursor-pointer text-blue-600 hover:text-blue-800 transition duration-200"
      >
        Change Avatar
      </label>
      <h2 className="text-lg font-semibold">Welcome Vivian!</h2>
    </div>
  )
}

export default Avatar
