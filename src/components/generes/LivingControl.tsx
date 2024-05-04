import React from "react";
import OnOffButton from "../buttons/OnOffButton";
import Navbar from "./Navbar";

const LivingControl = () => {
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
              Living Room
            </h1>
          </div>
          {/* Devices*/}
          {/* 1 */}
          <div className=" rounded-2xl sm:col-span-2 md:col-span-2 lg:col-span-1 flex flex-col items-center">
            <div className="flex flex-col items-center p-3 rounded-2xl bg-green-100 lg:h-44 lg:w-44 sm:h-32 sm:w-32 md:h-64 md:w-64 justify-evenly  ">
              <OnOffButton />
              <img
                src="/images/Tivi.png"
                className="lg:w-5/12 sm:w-3/12 md:w-3/12 object-contain"
              ></img>
              <span className="mt-2 text-lg font-medium">Tivi</span>
            </div>
          </div>

          {/* 2 */}
          <div className=" rounded-2xl sm:col-span-2 md:col-span-2 lg:col-span-1 flex flex-col items-center">
            <div className="flex flex-col items-center p-3 rounded-2xl bg-green-100  lg:h-44 lg:w-44 sm:h-32 sm:w-32 md:h-64 md:w-64  justify-evenly  ">
              <OnOffButton />
              <img
                src="/images/Tivi.png"
                className="lg:w-5/12 sm:w-3/12 md:w-3/12 object-contain"
              ></img>
              <span className="mt-2 text-lg font-medium">Tivi</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivingControl;
