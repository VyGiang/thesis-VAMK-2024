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
          {/* <svg
            className="w-12 h-12 bg-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="file:///C:/Users/admin/Desktop/thesis-VAMK-2024/src/assets/avatar.svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5.121 11.121a1.5 1.5 0 01.327 1.991L5.12 13.12m.877-8.48a1.5 1.5 0 011.99.326l.003.004m14.003 14.004a1.5 1.5 0 01-2.121 0l-.003-.003m0 0a1.5 1.5 0 010-2.121l.003-.003m0 0L16 12m0 0l-4-4m4 4H4m12 0l4 4"
            ></path>
          </svg> */}
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
