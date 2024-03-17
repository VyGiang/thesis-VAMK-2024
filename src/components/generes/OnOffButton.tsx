import React, { useState } from "react"

const OnOffButton = () => {
  const [isOn, setIsOn] = useState(false)

  const toggle = () => {
    setIsOn(!isOn)
  }
  return (
    <button
      onClick={toggle}
      className={`w-20 h-10 flex items-center rounded-full p-1 m-2 transition-colors ${
        isOn ? "bg-blue-200" : "bg-pink-200"
      }`}
    >
      {/* The toggle switch */}
      <div
        className={`w-8 h-8 rounded-full shadow-md transform duration-300 ease-in-out ${
          isOn ? "translate-x-10 bg-blue-400" : "translate-x-0 bg-red-400"
        }`}
      >
        <span className="flex items-center justify-center h-full text-sm text-gray-700">
          {isOn ? "On" : "Off"}
        </span>
      </div>
    </button>
  )
}

export default OnOffButton
