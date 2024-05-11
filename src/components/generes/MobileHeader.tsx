// MobileHeader.js
import React, { useEffect, useState } from "react"
import { useDarkMode } from "./DarkModeContext"
import { GiHamburgerMenu, GiMoon } from "react-icons/gi"
import { IoMdClose } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import { AuthData } from "../auth/AuthWrapper"

const MobileHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }
  const navigate = useNavigate()
  const { logout } = AuthData()

  const navigateToHome = () => {
    navigate("/dashboard")
  }
  const navigateToRooms = () => {
    navigate("/rooms")
  }
  const navigateToDevices = () => {
    navigate("/devices")
  }
  const navigateToStatictics = () => {
    navigate("/statictics")
  }
  const navigateToSetting = () => {
    navigate("/setting")
  }
  const handleLogout = () => {
    logout()
    navigate("/")
  }
  const { isDarkMode, setIsDarkMode } = useDarkMode()
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Explicitly typing the event
      if (event.shiftKey && event.key === "D") {
        toggleDarkMode()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    // Cleanup to remove the event listener when the component unmounts
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isDarkMode, toggleDarkMode])

  return (
    <header className="bg-white p-4 md:p-4 relative lg:hidden sm:block md:block dark:bg-[#305B81]">
      <nav className="flex justify-between items-center mx-auto max-w-screen-xl">
        {/* Left Section: Avatar and Welcome Message */}
        <div className="flex items-center">
          <img
            src="/images/avatar.png"
            alt="Avatar"
            className="sm:w-2/12 md:w-2.5/12"
          />
          <div className="ml-3">
            <h2 className="text-lg font-semibold">Welcome Vivian!</h2>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="avatarInput"
            />
          </div>
        </div>

        {/* Right Section: Links and Menu Toggle */}
        <div className="flex items-center">
          {/* dark mode */}
          <button
            className="flex items-center justify-center pr-1"
            onClick={toggleDarkMode}
          >
            <GiMoon className="w-7 h-7 md:w-9 md:h-9 " />
          </button>
          {/* Hamburger button */}
          <button
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <IoMdClose className="w-7 h-7 md:w-8 md:h-8" />
            ) : (
              <GiHamburgerMenu className="w-7 h-7 md:w-8 md:h-8" />
            )}
          </button>
        </div>
      </nav>

      {/* Conditionally render mobile menu */}
      {isMenuOpen && (
        <div
          className="flex lg:hidden justify-between items-center w-full"
          id="mobile-menu"
        >
          {/* Mobile Menu Items */}
          <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <li>
              <a
                className="block py-2 pr-4 pl-3  text-gray-700  rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
                onClick={(e) => {
                  e.preventDefault() // Prevent default link behavior
                  navigateToHome()
                  closeMenu()
                }}
              >
                Dash Board
              </a>
            </li>
            <li>
              <a
                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                onClick={(e) => {
                  e.preventDefault() // Prevent default link behavior
                  navigateToRooms()
                  closeMenu()
                }}
              >
                Rooms
              </a>
            </li>
            <li>
              <a
                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                onClick={(e) => {
                  e.preventDefault() // Prevent default link behavior
                  navigateToDevices()
                  closeMenu()
                }}
              >
                Devices
              </a>
            </li>
            <li>
              <a
                onClick={(e) => {
                  e.preventDefault() // Prevent default link behavior
                  navigateToStatictics()
                  closeMenu()
                }}
                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
              >
                Statistics
              </a>
            </li>
            <li>
              <a
                onClick={(e) => {
                  e.preventDefault() // Prevent default link behavior
                  navigateToSetting()
                  closeMenu()
                }}
                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
              >
                Setting
              </a>
            </li>
            <li>
              <a
                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                onClick={(e) => {
                  e.preventDefault() // Prevent default link behavior
                  handleLogout()
                  closeMenu()
                }}
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}

export default MobileHeader
