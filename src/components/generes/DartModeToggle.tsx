// DarkModeToggle.tsx
import React from "react"
import { useDarkMode } from "./DarkModeContext"

const DarkModeToggle = () => {
  const { isDarkMode, setIsDarkMode } = useDarkMode()

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <button
      onClick={toggleDarkMode}
      className={`flex items-center w-20 p-2 rounded-full transition-colors ${
        isDarkMode ? "bg-blue-200" : "bg-gray-200"
      }`}
    >
      <div
        className={`w-8 h-8 flex items-center justify-center rounded-full shadow-md transform duration-300 ease-in-out ${
          isDarkMode ? "translate-x-8 bg-blue-400" : "translate-x-0 bg-red-400"
        }`}
      >
        <span className="text-sm text-gray-700">
          {isDarkMode ? "On" : "Off"}
        </span>
      </div>
    </button>
  )
}

export default DarkModeToggle
