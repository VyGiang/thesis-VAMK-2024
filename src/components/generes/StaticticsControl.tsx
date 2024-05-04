// Todo: Try CRUD operations with Firebase Firestore (update, delete, read)
// For example, find how many devices which type is Bulb are in the Firestore
// Add dummy data for family member and room

// Todo: Try to make a form to add a device to Firestore
// Design the form with Tailwind CSS
// Add the form to the StaticControl component

// Todo: Implement state machine for the app. Handle auto reload and error handling

// Todo: I want to update to Firestore every 1 minute to update the status of devices
// to firestore
// Use setInterval to update the status of devices every 1 minute

// Todo: Implement the feature to add a family member to Firestore
// Add a button to add a family member to Firestore
// Add a form to add a family member to Firestore

// Todo: Implement the feature to add a room to Firestore
// Add a button to add a room to Firestore
// Add a form to add a room to Firestore

// Todo: Add error handling. Like global error handling. This will be displayed in the UI
// on top right corner?

import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { auth } from "@/firebase";
import OnOffButton from "../buttons/OnOffButton";
import {
  addDevicesToFirestore,
  addFamilyMembersToFirestore,
  addRoomsToFirestore,
  deleteDeviceFromUser,
  getAllDevicesFromUser,
} from "@/lib/FirebaseCollection";
import ActionButton from "../buttons/ActionButton";
import { FaMinus, FaPlus } from "react-icons/fa";
import { IDevice } from "@/lib/DataInterfaces";

const StaticControl: React.FC = () => {
  const [localDevices, setLocalDevices] = useState<IDevice[]>([]);
  const userId = auth.currentUser?.uid ?? "";

  const fetchData = async () => {
    // Fetch devices from Firestore and update the state
    const fetchedDevices = await getAllDevicesFromUser(userId);
    setLocalDevices(fetchedDevices as IDevice[]);
  };

  const handleDeleteDevice = async (deviceId: number) => {
    if (window.confirm("Are you sure you want to delete this device?")) {
      await deleteDeviceFromUser(userId, deviceId);
      setLocalDevices((prevDevices) =>
        prevDevices.filter((device) => device.idDevice !== deviceId)
      );
    }
  };

  const handleAddDevice = async () => {
    await addDevicesToFirestore();
    fetchData();
  };

  const handleAddFamilyMember = async () => {
    await addFamilyMembersToFirestore();
    fetchData();
  };

  const handleAddRoom = async () => {
    await addRoomsToFirestore();
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
          <ActionButton
            icon={FaPlus}
            label="Add Device"
            onClick={handleAddDevice}
          />
          <ActionButton
            icon={FaPlus}
            label="Add Fam"
            onClick={handleAddFamilyMember}
          />
          <ActionButton
            icon={FaPlus}
            label="Add Room"
            onClick={handleAddRoom}
          />
          <ActionButton
            icon={FaMinus}
            label="Delete device"
            onClick={() => handleDeleteDevice(102)}
          />
          {/* 1 */}
          {/* Dynamically render devices */}
          {localDevices.map((device) => (
            <>
              <div
                key={device.idDevice}
                className="transform duration-500 hover:scale-105 rounded-3xlxl sm:col-span-2 md:col-span-2 lg:col-span-1 flex flex-col items-center"
              >
                <div className="flex flex-col items-center p-1 rounded-2xl bg-green-100 lg:h-44 lg:w-44 sm:h-32 sm:w-32 md:h-64 md:w-64 justify-evenly shadow-lg  ">
                  {/* Render the correct OnOffButton based on device type */}
                  <OnOffButton userId={userId} deviceId={device.idDevice} />
                  <img
                    src="/images/Tivi.png" // Ensure you have corresponding images
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
  );
};

export default StaticControl;
