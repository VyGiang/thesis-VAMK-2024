import React from "react"
import Navbar from "./Navbar"
import { useNavigate } from "react-router-dom"

const RoomsControl = () => {
  const navigate = useNavigate()

  const navigateToLivingRoom = () => {
    navigate("/rooms/livingRoom")
  }
  const navigateToBedRoom = () => {
    navigate("/rooms/bedRoom")
  }
  const navigateToBathRoom = () => {
    navigate("/rooms/bathRoom")
  }
  const navigateToKitchen = () => {
    navigate("/rooms/kitchen")
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Navbar */}
        <Navbar />
        <div className="flex items-center justify-end">
          <p className="text-right text-sm font-bold">
            Monday, 11 December 2023
          </p>
        </div>

        {/* main*/}
        <div className=" bg-[#F0F0F0] sm:col-span-1 md:col-span-1 lg:col-span-2 rounded-xl p-10">
          <h1 className="lg:text-5xl  sm:text-lg md:text-lg font-bold mb-3">
            Rooms
          </h1>
          {/* Living room*/}
          <div
            className="bg-white p-3 rounded-2xl flex items-center mb-5"
            onClick={navigateToLivingRoom}
          >
            <div className="flex h-20 w-20 shrink-0 grow-0 items-center justify-center rounded-full bg-pink-100 shadow-md shadow-slate-500">
              <img src="/images/living.png" alt="temp" className="w-5/12"></img>
            </div>
            <span className=" lg:text-xl  sm:text-lg md:text-lg font-bold pl-5">
              Living Room
            </span>
          </div>
          {/* Bed room*/}
          <div
            className="bg-white p-3 rounded-2xl flex items-center mb-5"
            onClick={navigateToBedRoom}
          >
            <div className="flex h-20 w-20 shrink-0 grow-0 items-center justify-center rounded-full bg-green-100 shadow-md shadow-slate-500">
              <img src="/images/bed.png" alt="temp" className="w-5/12"></img>
            </div>
            <span className=" lg:text-xl  sm:text-lg md:text-lg font-bold pl-5">
              Bed Room
            </span>
          </div>
          {/* Bath room*/}
          <div
            className="bg-white p-3 rounded-2xl flex items-center mb-5"
            onClick={navigateToBathRoom}
          >
            <div className="flex h-20 w-20 shrink-0 grow-0 items-center justify-center rounded-full bg-yellow-100 shadow-md shadow-slate-500">
              <img src="/images/bath.png" alt="temp" className="w-5/12"></img>
            </div>
            <span className=" lg:text-xl  sm:text-lg md:text-lg font-bold pl-5">
              Bath Room
            </span>
          </div>
          {/* Kitchen*/}
          <div
            className="bg-white p-3 rounded-2xl flex items-center mb-5 "
            onClick={navigateToKitchen}
          >
            <div className="flex h-20 w-20 shrink-0 grow-0 items-center justify-center rounded-full bg-blue-100 shadow-md shadow-slate-500">
              <img
                src="/images/kitchen.png"
                alt="temp"
                className="w-5/12"
              ></img>
            </div>
            <span className=" lg:text-xl  sm:text-lg md:text-lg font-bold pl-5">
              Kitchen
            </span>
          </div>
          {/* Kitchen*/}
        </div>
      </div>
    </div>
  )
}

export default RoomsControl
