import React from "react"
import Navbar from "./Navbar"
import Statictics from "./StaticticsControl"
import { BsThreeDots } from "react-icons/bs"
import { useNavigate } from "react-router-dom"

const HomeControl = () => {
  const navigate = useNavigate()

  const navigateToLivingRoom = () => {
    navigate("/livingRoom")
  }
  const navigateToBedRoom = () => {
    navigate("/bedRoom")
  }
  const navigateToBathRoom = () => {
    navigate("/bathRoom")
  }
  const navigateToKitchen = () => {
    navigate("/kitchen")
  }
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Navbar */}
        <Navbar />
        <div className="flex items-center justify-end">
          <p className="text-right text-sm font-bold">
            Monday, 11 December 2023
          </p>
        </div>

        {/* main*/}
        <div className=" bg-[#F0F0F0] sm:col-span-1 md:col-span-1 lg:col-span-2 rounded-xl  grid grid-cols-4 gap-5 p-5">
          {/* Living Room */}
          <div
            className="bg-white h-32 rounded-2xl sm:col-span-2 md:col-span-1 lg:col-span-1"
            onClick={navigateToLivingRoom}
          >
            <div className=" p-3">
              <div className="flex flex-wrap justify-around items-center">
                <strong className=" text-sm">Living Room</strong>
                <div>
                  <button className="mt-1">
                    <BsThreeDots size={20} />
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap justify-evenly">
                <img
                  src="/images/living.png"
                  className="w-3/12 object-contain"
                ></img>

                <div className=" content-center">
                  <p className="text-3xl text-center">150</p>
                  <p className="text-center text-[#828282]">kWh</p>
                </div>
              </div>
            </div>
          </div>
          {/* Bedroom */}
          <div
            className="bg-white h-32 rounded-2xl sm:col-span-2 md:col-span-1 lg:col-span-1"
            onClick={navigateToBedRoom}
          >
            <div className=" p-3">
              <div className="flex flex-wrap justify-around items-center">
                <strong className=" text-sm">Bedroom</strong>
                <div>
                  <button className="mt-1">
                    <BsThreeDots size={20} />
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap justify-evenly">
                <img
                  src="/images/bed.png"
                  className="w-3/12 object-contain"
                ></img>

                <div className=" content-center">
                  <p className="text-3xl text-center">150</p>
                  <p className="text-center text-[#828282]">kWh</p>
                </div>
              </div>
            </div>
          </div>
          {/* Bathroom */}
          <div
            className="bg-white h-32 rounded-2xl sm:col-span-2 md:col-span-1 lg:col-span-1"
            onClick={navigateToBathRoom}
          >
            <div className=" p-3">
              <div className="flex flex-wrap justify-around items-center">
                <strong className=" text-sm">Bathroom</strong>
                <div>
                  <button className="mt-1">
                    <BsThreeDots size={20} />
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap justify-evenly">
                <img
                  src="/images/bath.png"
                  className="w-3/12 object-contain"
                ></img>

                <div className=" content-center">
                  <p className="text-3xl text-center">150</p>
                  <p className="text-center text-[#828282]">kWh</p>
                </div>
              </div>
            </div>
          </div>
          {/* Kitchen */}
          <div
            className="bg-white h-32 rounded-2xl sm:col-span-2 md:col-span-1 lg:col-span-1"
            onClick={navigateToKitchen}
          >
            <div className=" p-3">
              <div className="flex flex-wrap justify-around items-center">
                <strong className=" text-sm">Kitchen</strong>
                <div>
                  <button className="mt-1">
                    <BsThreeDots size={20} />
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap justify-evenly">
                <img
                  src="/images/kitchen.png"
                  className="w-3/12 object-contain"
                ></img>

                <div className=" content-center">
                  <p className="text-3xl text-center">150</p>
                  <p className="text-center text-[#828282]">kWh</p>
                </div>
              </div>
            </div>
          </div>
          {/* phan phia duoi */}
          <div className=" col-span-4 grid grid-cols-12 gap-5">
            {/* 2 cuc ben trai*/}
            <div className=" col-span-5 sm:col-span-12 md:col-span-12 lg:col-span-5 grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
              {/* Indoor Temperature */}
              <div className=" bg-white rounded-xl px-5 py-5 h-auto flex items-center">
                <div className="flex flex-wrap justify-between items-center">
                  <div className=" flex h-20 w-20 shrink-0 grow-0 items-center justify-center rounded-full bg-white shadow-md shadow-slate-500">
                    <img
                      src="/images/temp.png"
                      alt="temp"
                      className=" w-5/12"
                    ></img>
                  </div>
                  <div className=" pl-5">
                    <p className=" text-sm font-semibold">Indoor Temperature</p>
                    <h3 className=" text-4xl">
                      25 <span className=" text-xl">&#8451;</span>
                    </h3>
                  </div>
                </div>
              </div>
              {/* Humidity */}
              <div className=" bg-white rounded-xl px-5 py-5 h-auto flex items-center">
                <div className="flex flex-wrap justify-between items-center">
                  <div className=" flex h-20 w-20 shrink-0 grow-0 items-center justify-center rounded-full bg-white shadow-md shadow-slate-500">
                    <img
                      src="/images/percent.png"
                      alt="temp"
                      className=" w-5/12"
                    ></img>
                  </div>
                  <div className=" pl-5">
                    <p className=" text-sm font-semibold">Humidity </p>
                    <h3 className=" text-4xl">
                      30 <span className=" text-xl">%</span>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            {/* 1 cuc ben phai*/}
            <div className=" col-span-7 h-auto sm:col-span-12 md:col-span-12 lg:col-span-7 bg-white rounded-xl"></div>
          </div>
        </div>

        {/* Statictics*/}
        <Statictics />
      </div>
    </>
  )
}

export default HomeControl
