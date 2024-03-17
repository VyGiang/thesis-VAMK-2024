// MobileHeader.js
import React, { useState } from "react"
import { Menu as MenuIcon, X as CloseIcon } from "react-feather"

const MobileHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }
  return (
    <header className="bg-[#305B81] p-4 md:p-8 relative lg:hidden sm:block md:block">
      <div className="container mx-auto relative z-10">
        <div className="flex md:flex-row items-center justify-between">
          {/* Logo */}
          <div className="text-white text-lg font-bold">Your Logo</div>

          {/* Navigation */}
          <nav
            className={`absolute top-full left-0 w-auto sm:w-full md:w-auto lg:w-auto md:relative md:flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 transition-all duration-300 bg-vy-jang ${
              isMenuOpen ? "flex" : "hidden"
            }`}
            style={{ zIndex: 9 }} // Thiết lập thứ bậc hiển thị
          >
            <a
              href="/#"
              className="text-white hover:text-gray-300 block py-2 px-4"
              onClick={closeMenu}
            >
              Dashboard
            </a>
            <a
              href="/#"
              className="text-white hover:text-gray-300 block py-2 px-4"
              onClick={closeMenu}
            >
              Room
            </a>
            <a
              href="/#"
              className="text-white hover:text-gray-300 block py-2 px-4"
              onClick={closeMenu}
            >
              Devices
            </a>
            <a
              href="/#"
              className="text-white hover:text-gray-300 block py-2 px-4"
              onClick={closeMenu}
            >
              Statictics
            </a>
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            {isMenuOpen ? (
              // Nút đóng menu với biểu tượng "X"
              <button className="text-white" onClick={closeMenu}>
                <CloseIcon size={24} />
              </button>
            ) : (
              // Nút mở menu với biểu tượng
              <button className="text-white" onClick={toggleMenu}>
                <MenuIcon size={24} />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default MobileHeader
