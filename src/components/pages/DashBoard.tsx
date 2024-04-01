import React from "react"
import LeftSidebar from "../generes/LeftSidebar"
import HomeControl from "../generes/HomeControl"

import RightSidebar from "../generes/RightSidebar"
import MobileHeader from "../generes/MobileHeader"

const DashBoard = () => {
  return (
    <div className="bg-blue-200 font-merri dark:bg-gray-800">
      <div>
        {/* Your other components */}
        <MobileHeader />
      </div>
      <div className=" grid grid-cols-12 gap-5 container mx-auto p-6 md:px-6">
        <div className="bg-[#305B81] flex-wrap space-between sticky top-0 md:col-span-12 md:hidden h-screen sm:col-span-12 sm:hidden lg:col-span-2 lg:flex rounded-xl dark:bg-gray-300">
          <LeftSidebar />
        </div>
        <div className="md:col-span-12 sm:col-span-12 lg:col-span-7 rounded-xl">
          <HomeControl />
        </div>
        <div className="  md:col-span-12 sm:col-span-12 lg:col-span-3 ">
          <RightSidebar />
        </div>
      </div>
    </div>
  )
}

export default DashBoard
