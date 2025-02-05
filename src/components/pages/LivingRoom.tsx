import React from "react"
import MobileHeader from "../generes/MobileHeader"
import LeftSidebar from "../generes/LeftSidebar"
import LivingControl from "../generes/LivingControl"

const LivingRoom = () => {
  return (
    <div className="bg-blue-200 font-merri">
      <div>
        {/* Your other components */}
        <MobileHeader />
      </div>
      <div className=" grid grid-cols-12 gap-5 container mx-auto p-6 md:px-6">
        <div className="bg-[#305B81] flex-wrap space-between sticky top-0 md:col-span-12 md:hidden h-screen sm:col-span-12 sm:hidden lg:col-span-2 lg:flex rounded-xl">
          <LeftSidebar />
        </div>
        <div className="md:col-span-12 sm:col-span-12 lg:col-span-10 rounded-xl">
          <LivingControl />
        </div>
      </div>
    </div>
  )
}

export default LivingRoom
