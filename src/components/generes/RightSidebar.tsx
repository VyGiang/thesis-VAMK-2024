import { BsThreeDots } from "react-icons/bs"
import MyCalendar from "./MyCalendar"

const RightSidebar = () => {
  return (
    <>
      <div className="bg-[#F0F0F0] rounded-xl p-3  ">
        {/* Avatar upload and preview */}
        <div className=" flex flex-col items-center justify-center px-5 py-10  ">
          <img src="/images/avatar.png" className=" w-4/12"></img>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="avatarInput"
          />
          <label
            htmlFor="avatarInput"
            className="cursor-pointer text-blue-600 hover:text-blue-800 transition duration-200"
          >
            Change Avatar
          </label>
          <h2 className="text-lg font-semibold">Welcome Vivian!</h2>
        </div>
        {/* <!-- Favorite Devices Section --> */}
        <div className=" bg-white rounded-2xl  grid grid-cols-2 gap-5 p-5">
          <div className="col-span-2 grid grid-cols-2 gap-5 items-center">
            <strong className=" text-sm ">Calendar</strong>
            <div className="flex justify-end">
              <button className="mt-1 ">
                <BsThreeDots size={20} />
              </button>
            </div>
          </div>
          <div className="col-span-2">
            <MyCalendar />
          </div>
        </div>
      </div>
      <div className="pt-3 bg-blue-200">
        <img src="/images/relax.png"></img>
      </div>
    </>
  )
}

export default RightSidebar
