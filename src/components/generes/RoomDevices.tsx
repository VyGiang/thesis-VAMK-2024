import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OnOffButton from "../buttons/OnOffButton";
import { auth } from "@/firebase";
import { IDevice } from "@/lib/DataInterfaces";
import { getAllDevicesFromUser } from "@/lib/FirebaseCollection";
import LeftSidebar from "./LeftSidebar";
import MobileHeader from "./MobileHeader";
import Navbar from "./Navbar";
import CurrentTime from "./CurrentTime";

const RoomDevices = () => {
  const { roomId } = useParams();
  const userId = auth.currentUser?.uid ?? "";
  const [localDevices, setLocalDevices] = useState<IDevice[]>([]);

  const fetchData = async () => {
    const fetchedDevices = await getAllDevicesFromUser(userId);
    if (fetchedDevices) {
      const filteredDevices = fetchedDevices.filter(
        (device) => device.roomId === parseInt(roomId)
      );
      const sortedDevices = filteredDevices.sort((a, b) =>
        a.type.localeCompare(b.type)
      );
      setLocalDevices(sortedDevices);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId, roomId]);

  return (
    <div className="bg-blue-200 font-merri dark:bg-[#1c1d1f]">
      <div>
        {/* Your other components */}
        <MobileHeader />
      </div>
      <div className=" grid grid-cols-12 gap-5 container mx-auto p-6 md:px-6">
        <div className="bg-[#4979a3] flex-wrap space-between sticky top-0 md:col-span-12 md:hidden h-screen sm:col-span-12 sm:hidden lg:col-span-2 lg:flex rounded-xl dark:bg-[#2e537a]">
          <LeftSidebar />
        </div>
        <div className="md:col-span-12 sm:col-span-12 lg:col-span-10 rounded-xl">
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Navbar */}
              <Navbar />
              <div className="flex items-center justify-end ransform duration-500 hover:scale-105">
                <CurrentTime />
              </div>

              {/* main*/}
              <div className="  bg-[#F0F0F0]  sm:col-span-1 md:col-span-1 lg:col-span-2 rounded-xl  grid grid-cols-4 gap-5 p-5 dark:bg-[#66676d]">
                <div className="col-span-4">
                  <h1 className="lg:text-5xl  sm:text-lg md:text-lg font-bold mb-3">
                    Devices
                  </h1>
                </div>
                {localDevices.map((device) => (
                  <>
                    <div
                      key={device.idDevice}
                      className="transform duration-500 hover:scale-105 rounded-3xlxl sm:col-span-2 md:col-span-2 lg:col-span-1 flex flex-col items-center"
                    >
                      <div className="flex flex-col items-center p-1 rounded-2xl bg-green-100 lg:h-44 lg:w-44 sm:h-32 sm:w-32 md:h-64 md:w-64 justify-evenly shadow-lg  ">
                        <OnOffButton
                          userId={userId}
                          deviceId={device.idDevice}
                        />
                        <img
                          src="/images/Tivi.png"
                          className="lg:w-5/12 sm:w-3/12 md:w-3/12 object-contain"
                          alt={device.name}
                        />
                        <span className="mt-2 text-lg font-medium pb-2">
                          {device.name}
                        </span>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDevices;
