import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import OnOffButton from "../buttons/OnOffButton";
import { FaMinus, FaPlus } from "react-icons/fa";
import AddDeviceForm from "./AddDeviceForm";
import CurrentTime from "./CurrentTime";
import ActionButton from "../buttons/ActionButton";
import { auth } from "@/firebase";
import { IDevice } from "@/lib/DataInterfaces";
import {
  addDevicesToFirestore,
  deleteDeviceFromUser,
  getAllDevicesFromUser,
} from "@/lib/FirebaseCollection";

const DevicesControl = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [localDevices, setLocalDevices] = useState<IDevice[]>([]);

  const userId = auth.currentUser?.uid ?? "";

  const sortDevicesByType = (devices: IDevice[]) => {
    return devices.sort((a, b) => a.type.localeCompare(b.type));
  };

  const fetchData = async () => {
    const fetchedDevices = await getAllDevicesFromUser(userId);
    // Sort devices by type before setting them to state
    const sortedDevices = sortDevicesByType(fetchedDevices as IDevice[]);
    setLocalDevices(sortedDevices);
  };

  const handleDeleteDevice = async (deviceId: number) => {
    await deleteDeviceFromUser(userId, deviceId);
    setLocalDevices((prevDevices) =>
      prevDevices.filter((device) => device.idDevice !== deviceId)
    );
  };

  const handleAddDevice = async () => {
    await addDevicesToFirestore();
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Navbar */}
        <Navbar />
        <div className="flex items-center justify-end ransform duration-500 hover:scale-105">
          <CurrentTime />
        </div>
        <div className="  bg-[#F0F0F0] sm:col-span-1 md:col-span-1 lg:col-span-2 rounded-xl  grid grid-cols-4 gap-5 p-5 dark:bg-[#66676d]">
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
                  <OnOffButton userId={userId} deviceId={device.idDevice} />
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
        <ActionButton
          icon={FaPlus}
          label="Add Device"
          onClick={handleAddDevice}
        />
        <ActionButton
          icon={FaMinus}
          label="Delete device"
          onClick={() => handleDeleteDevice(102)}
        />
      </div>
      <AddDeviceForm isOpen={isFormOpen} setIsOpen={setIsFormOpen} />
    </div>
  );
};

export default DevicesControl;
