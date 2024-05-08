import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthData } from "../auth/AuthWrapper"
import { GiMoon } from "react-icons/gi"
import { useDarkMode } from "./DarkModeContext"

const LeftSidebar = () => {
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
    <>
      <div className=" h-1/2 w-full">
        <div className="flex  flex-col  justify-center items-center h-1/2">
          <img
            src="/images/home.png"
            alt="house"
            className="md:w-1/2 sm:w-1/3 lg:w-3/6"
          ></img>
          <div className="relative group">
            <button
              className="flex items-center justify-center"
              onClick={toggleDarkMode}
            >
              <GiMoon className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 pt-1" />
              {/* Adjust the size as needed */}
            </button>
            <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Dark Mode
            </span>
          </div>
        </div>
        <div className="w-full flex flex-wrap justify-between">
          {/* Dashboard */}
          <div
            className="px-10 py-5 inline-flex hover:bg-[#EBF5FF]  dark:hover:bg-[#777a7c] items-center cursor-pointer "
            onClick={navigateToHome}
          >
            <div className="inline-flex transform duration-500 hover:scale-110 items-center">
              <img
                src="/images/dashboard.png"
                alt="dashboard"
                className="w-3/12 object-contain"
              ></img>

              <strong className=" pl-3 text-xl">Dashboard</strong>
            </div>
          </div>

          {/* Rooms */}
          <div
            className="px-10 py-5 inline-flex hover:bg-[#EBF5FF]  dark:hover:bg-[#777a7c] items-center cursor-pointer"
            onClick={navigateToRooms}
          >
            <div className="inline-flex transform duration-500 hover:scale-110 items-center">
              <img src="/images/door.png" alt="room" className="w-3/12" />
              <strong className="pl-3 text-xl">Rooms</strong>
            </div>
          </div>

          {/* Devices */}
          <div
            className="px-10 py-5 inline-flex hover:bg-[#EBF5FF]  dark:hover:bg-[#777a7c] items-center cursor-pointer"
            onClick={navigateToDevices}
          >
            <div className="inline-flex transform duration-500 hover:scale-110 items-center">
              <img
                src="/images/device.png"
                alt="device"
                className="w-3/12"
              ></img>
              <strong className=" pl-3 text-xl">Devices</strong>
            </div>
          </div>

          {/* Statistics */}
          <div
            className=" px-10 py-5 inline-flex hover:bg-[#EBF5FF]  dark:hover:bg-[#777a7c] items-center cursor-pointer"
            onClick={navigateToStatictics}
          >
            <div className="inline-flex transform duration-500 hover:scale-110 items-center">
              <img
                src="/images/statistic.png"
                alt="dashboard"
                className="w-3/12"
              ></img>
              <strong className="pl-3 text-xl">Statistics</strong>
            </div>
          </div>

          {/* Setting */}
          <div
            className=" px-10 py-5 inline-flex hover:bg-[#EBF5FF]  dark:hover:bg-[#777a7c] items-center cursor-pointer"
            onClick={navigateToSetting}
          >
            <div className="inline-flex transform duration-500 hover:scale-110 items-center">
              <img
                src="/images/setting.png"
                alt="dashboard"
                className="w-6/12"
              ></img>
              <strong className="pl-4 pr-9 text-xl">Setting</strong>
            </div>
          </div>
        </div>
      </div>
      {/* Logout */}
      <div className="flex  justify-end items-center pb-5">
        <div
          className="px-10 py-3 inline-flex hover:bg-[#EBF5FF]  dark:hover:bg-[#777a7c] items-center cursor-pointer pb-5"
          onClick={handleLogout}
        >
          <div className="inline-flex transform duration-500 hover:scale-110 items-center">
            <img
              src="/images/Logout.png"
              alt="dashboard"
              className="w-6/12 object-contain"
            ></img>
            <span className="pl-2 pr-2 text-2xl text-black font-bold dark:text-white">
              Logout
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default LeftSidebar
