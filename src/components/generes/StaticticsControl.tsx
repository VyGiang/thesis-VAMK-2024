import React from "react"
import { BsThreeDots } from "react-icons/bs"

const StaticticsControl = () => {
  return (
    <div className=" bg-[#F0F0F0] sm:col-span-1 md:col-span-1 lg:col-span-2 rounded-xl h-screen p-5">
      <div className="flex flex-wrap justify-between items-center">
        <p className=" text-sm font-semibold">Statictics</p>
        <div>
          <button className="mt-1">
            <BsThreeDots size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default StaticticsControl
