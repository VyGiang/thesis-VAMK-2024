import { BsThreeDots } from "react-icons/bs"
import React, { useState, useEffect } from "react"
import OnOffButton from "./OnOffButton"

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
            <strong className=" text-sm ">Favor Devices</strong>
            <div className="flex justify-end">
              <button className="mt-1 ">
                <BsThreeDots size={20} />
              </button>
            </div>
          </div>
          {/* <!-- Tivi--> */}
          <div className="sm:col-span-2 md:col-span-1 lg:col-span-1">
            <div className="flex flex-col items-center p-3 rounded-2xl bg-pink-100 h-32  justify-evenly  ">
              <OnOffButton />
              <img
                src="/images/Tivi.png"
                className="lg:w-5/12 sm:w-3/12 md:w-3/12 object-contain"
              ></img>
              <span className="mt-2 text-lg font-medium">Tivi</span>
            </div>
          </div>
          {/* <!--Router--> */}
          <div className="sm:col-span-2 md:col-span-1 lg:col-span-1">
            <div className="flex flex-col items-center p-3 rounded-2xl bg-green-100 h-32 justify-evenly ">
              <OnOffButton />
              <img
                src="/images/Router.png"
                className="lg:w-5/12 sm:w-3/12 md:w-3/12 object-contain"
              ></img>
              <span className="mt-2 text-lg font-medium">Router</span>
            </div>
          </div>
          {/* <!--Bulb--> */}
          <div className=" sm:col-span-2 md:col-span-1 lg:col-span-1">
            <div className="flex flex-col items-center p-3 rounded-2xl bg-yellow-100 h-32 justify-evenly ">
              <OnOffButton />
              <img
                src="/images/Bulb.png"
                className="lg:w-5/12 sm:w-3/12 md:w-3/12 object-contain"
              ></img>
              <span className="mt-2 text-lg font-medium">Bulb</span>
            </div>
          </div>
          {/* <!--Stove--> */}
          <div className=" sm:col-span-2 md:col-span-1 lg:col-span-1">
            <div className="flex flex-col items-center p-3 rounded-2xl bg-blue-100 h-32 justify-evenly ">
              <OnOffButton />
              <img
                src="/images/Stove.png"
                className="lg:w-5/12 sm:w-3/12 md:w-3/12 object-contain"
              ></img>
              <span className="mt-2 text-lg font-medium">Stove</span>
            </div>
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
