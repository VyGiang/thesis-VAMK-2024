import Navbar from "./Navbar"
import { useNavigate } from "react-router-dom"
import CurrentTime from "./CurrentTime"
import DarkModeToggle from "./DartModeToggle"

const SettingControl = () => {
  const navigate = useNavigate()

  const navigateToUserDetail = () => {
    navigate("/setting/userDetail")
  }
  const navigateToManageRooms = () => {
    navigate("/setting/manageRooms")
  }
  const navigateToManageDevices = () => {
    navigate("/setting/manageDevices")
  }
  const navigateToFamilyMemberDetail = () => {
    navigate("/setting/familyMemberDetail")
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Navbar */}
        <Navbar />
        <div className="flex items-center justify-end transform duration-500 hover:scale-105">
          <CurrentTime />
        </div>

        {/* main*/}
        <div className=" bg-[#F0F0F0] sm:col-span-1 md:col-span-1 lg:col-span-2 rounded-xl p-10 dark:bg-[#66676d]">
          <h1 className="lg:text-5xl  sm:text-lg md:text-lg font-bold mb-10">
            Setting
          </h1>
          {/* User Detail*/}
          <div
            className="bg-white p-3 rounded-2xl flex items-center mb-5 dark:bg-[#1d1d1f] transform duration-500 hover:scale-105"
            onClick={navigateToUserDetail}
          >
            <div className="flex h-20 w-20 shrink-0 grow-0 items-center justify-center rounded-full bg-gray-200 shadow-md shadow-slate-500">
              <img src="/images/user.png" alt="temp" className="w-5/12"></img>
            </div>
            <span className=" lg:text-xl  sm:text-lg md:text-lg font-bold pl-5">
              User Detail
            </span>
          </div>
          {/*  Manage Rooms   */}
          <div
            className="bg-white p-3 rounded-2xl flex items-center mb-5 dark:bg-[#1d1d1f] transform duration-500 hover:scale-105"
            onClick={navigateToManageRooms}
          >
            <div className="flex h-20 w-20 shrink-0 grow-0 items-center justify-center rounded-full bg-gray-200 shadow-md shadow-slate-500">
              <img src="/images/door.png" alt="temp" className="w-5/12"></img>
            </div>
            <span className=" lg:text-xl  sm:text-lg md:text-lg font-bold pl-5">
              Manage Rooms
            </span>
          </div>
          {/* Manage Devices  */}
          <div
            className="bg-white p-3 rounded-2xl flex items-center mb-5 dark:bg-[#1d1d1f] transform duration-500 hover:scale-105"
            onClick={navigateToManageDevices}
          >
            <div className="flex h-20 w-20 shrink-0 grow-0 items-center justify-center rounded-full bg-gray-200 shadow-md shadow-slate-500">
              <img src="/images/device.png" alt="temp" className="w-5/12"></img>
            </div>
            <span className=" lg:text-xl  sm:text-lg md:text-lg font-bold pl-5">
              Manage Devices
            </span>
          </div>
          {/* Family Member Details  */}
          <div
            className="bg-white p-3 rounded-2xl flex items-center mb-5 dark:bg-[#1d1d1f] transform duration-500 hover:scale-105"
            onClick={navigateToFamilyMemberDetail}
          >
            <div className="flex h-20 w-20 shrink-0 grow-0 items-center justify-center rounded-full bg-gray-200 shadow-md shadow-slate-500">
              <img src="/images/family.png" alt="temp" className="w-7/12"></img>
            </div>
            <span className=" lg:text-xl  sm:text-lg md:text-lg font-bold pl-5">
              Family Member Details
            </span>
          </div>

          {/* Dart Mode */}
          <div className="bg-white p-3 rounded-2xl flex items-center mb-10 dark:bg-[#1d1d1f] transform duration-500 hover:scale-105">
            <div className="flex h-20 w-20 shrink-0 grow-0 items-center justify-center rounded-full bg-gray-200 shadow-md shadow-slate-500">
              <img src="/images/moon.png" alt="temp" className="w-7/12"></img>
            </div>
            <span className="lg:text-xl sm:text-lg md:text-lg font-bold pl-5">
              Dart Mode
            </span>
            {/* Dark Mode Toggle */}
            <div className="ml-auto mr-5">
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingControl
