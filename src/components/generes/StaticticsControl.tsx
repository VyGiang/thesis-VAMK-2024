import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { SiHomeassistant } from "react-icons/si";
import AddDeviceForm from "./AddDeviceForm";
import Navbar from "./Navbar";
import { auth } from "@/firebase";
import { addAllDevicesToUser } from "@/lib/FirebaseCollection";
import { devices } from "@/data";

const StaticControl: React.FC = () => {
  const addDevicesToFirestore = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      console.error("No user is currently signed in.");
      return;
    }
    for (const device of devices) {
      await addAllDevicesToUser(userId, device);
    }
  };

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
        <div className="  bg-[#F0F0F0] sm:col-span-1 md:col-span-1 lg:col-span-2 rounded-xl  grid grid-cols-4 gap-5 p-5">
          <div className="col-span-4">
            <h1 className="lg:text-5xl  sm:text-lg md:text-lg font-bold mb-3">
              Firebase
            </h1>
          </div>
          {/* Devices*/}
          {/* Add button */}
          <div className="transform duration-500 hover:scale-105 rounded-3xlxl sm:col-span-2 md:col-span-2 lg:col-span-1 flex flex-col items-center">
            <div className="flex flex-col items-center p-3 rounded-2xl bg-gradient-to-br to-blue-300 via-blue-200 from-white lg:h-44 lg:w-44 sm:h-32 sm:w-32 md:h-64 md:w-64 justify-evenly shadow-2xl   ">
              <button
                className=" flex h-20 w-20 shrink-0 grow-0 items-center justify-center rounded-full bg-gradient-to-br to-blue-300 via-blue-200 from-white shadow-lg shadow-slate-500 border-4 border-white"
                onClick={() => addDevicesToFirestore()}
              >
                <FaPlus className="w-6 h-6 md:w-8 md:h-8 lg:w-8 lg:h-8 text-white" />
              </button>
              <span className=" pt-2 pb-2 text-white flex items-center">
                <SiHomeassistant className="inline-block" />
                <span className="ml-2 md:text-xl sm:text-sm lg:text-xl font-medium ">
                  Add Device
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaticControl;
