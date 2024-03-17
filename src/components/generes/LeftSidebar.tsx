import React from "react"

const LeftSidebar = () => {
  return (
    <>
      <div className=" h-1/2 w-full">
        <div className="flex justify-center items-center h-1/2">
          <img
            src="/images/home.png"
            alt="house"
            className="md:w-1/2 sm:w-1/3 lg:w-2/6"
          ></img>
        </div>
        <div className="w-full flex flex-wrap justify-between">
          <div className="px-10 py-5 inline-flex hover:bg-[#EBF5FF] items-center ">
            <img
              src="/images/dashboard.png"
              alt="dashboard"
              className="w-3/12 object-contain"
            ></img>
            <strong className=" pl-3 text-xl">Dashboard</strong>
          </div>
          <div className="px-10 py-5 inline-flex hover:bg-[#EBF5FF] items-center">
            <img
              src="/images/door.png"
              alt="dashboard"
              className="w-3/12"
            ></img>
            <strong className=" pl-3 text-xl">Rooms</strong>
          </div>
          <div className="px-10 py-5 inline-flex hover:bg-[#EBF5FF] items-center">
            <img
              src="/images/device.png"
              alt="dashboard"
              className="w-3/12"
            ></img>
            <strong className=" pl-3 text-xl">Devices</strong>
          </div>
          <div className="px-10 py-5 inline-flex hover:bg-[#EBF5FF] items-center">
            <img
              src="/images/statistic.png"
              alt="dashboard"
              className="w-3/12"
            ></img>
            <strong className="pl-3 text-xl">Statistics</strong>
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center">
        <div className="px-10 py-3 inline-flex hover:bg-[#EBF5FF] items-center">
          <img
            src="/images/Logout.png"
            alt="dashboard"
            className="w-6/12 object-contain"
          ></img>
          <span className="pl-2 text-2xl text-black font-bold">Logout</span>
        </div>
      </div>
    </>
  )
}

export default LeftSidebar
