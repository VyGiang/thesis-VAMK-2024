import Navbar from "./Navbar"

import CurrentTime from "./CurrentTime"
import { FaPlus } from "react-icons/fa"
import { useEffect, useState } from "react"
import { IDevice } from "@/lib/DataInterfaces"
import { auth } from "@/firebase"
import {
  addDevicesToFirestore,
  deleteDeviceFromUser,
  getAllDevicesFromUser,
} from "@/lib/FirebaseCollection"

const ManageDevicesControl = () => {
  const [localDevices, setLocalDevices] = useState<IDevice[]>([])

  const userId = auth.currentUser?.uid ?? ""

  const sortDevicesByType = (devices: IDevice[]) => {
    return devices.sort((a, b) => a.type.localeCompare(b.type))
  }

  const fetchData = async () => {
    const fetchedDevices = await getAllDevicesFromUser(userId)
    // Sort devices by type before setting them to state
    const sortedDevices = sortDevicesByType(fetchedDevices as IDevice[])
    setLocalDevices(sortedDevices)
  }

  const handleDeleteDevice = async (deviceId: number) => {
    await deleteDeviceFromUser(userId, deviceId)
    setLocalDevices((prevDevices) =>
      prevDevices.filter((device) => device.idDevice !== deviceId)
    )
  }

  const handleAddDevice = async () => {
    await addDevicesToFirestore()
    fetchData()
  }

  useEffect(() => {
    fetchData()
  }, [userId])
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Navbar */}
        <Navbar />
        <div className="flex items-center justify-end transform duration-500 hover:scale-105">
          <CurrentTime />
        </div>

        {/* main*/}
        <div className="bg-[#F0F0F0] sm:col-span-1  md:col-span-1 lg:col-span-2 rounded-xl grid md:grid-cols-2 lg:grid-cols-2 gap-5 p-5 dark:bg-[#66676d]">
          <div className="col-span-2">
            <h1 className="lg:text-5xl sm:text-lg md:text-lg font-bold mb-3">
              Manage Device
            </h1>
          </div>
          {/* Map Devices */}
          {localDevices.map((device) => (
            <div
              key={device.idDevice}
              className="p-5 bg-green-100 rounded-xl shadow-lg flex flex-col justify-between"
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-2">
                  <img
                    src="/images/Bulb.png"
                    className="lg:w-3/12 sm:w-2/12 md:w-3/12 lg:h-3/12 sm:h-1/12 md:h-3/12"
                    alt="Device"
                  />
                  <h2 className="lg:text-3xl sm:text-md md:text-2xl font-bold">
                    {device.type}
                  </h2>
                </div>
                <div className="flex space-x-2">
                  <button>
                    <img
                      src="/images/edit.png"
                      className="lg:w-10 sm:w-4 md:w-6 lg:h-10 sm:h-4 md:h-6"
                      alt="Edit"
                    />
                  </button>
                  <button onClick={() => handleDeleteDevice(device.idDevice)}>
                    <img
                      src="/images/delete.png"
                      className="lg:w-10 sm:w-4 md:w-6 lg:h-10 sm:h-4 md:h-6"
                      alt="Delete"
                    />
                  </button>
                </div>
              </div>
              <hr className="border-t border-gray-300 mb-3" />
              <ul>
                <li>Device name: {device.name}</li>
                <li>Type: {device.type}</li>
                <li>Cost: ${device.cost}</li>
                <li>Manufacturer: {device.manufacturer}</li>
                <li>Power Consumption: {device.powerConsumption} kWh</li>
                <li>Room: {device.roomId}</li>
              </ul>
            </div>
          ))}

          {/* Add Device Button */}
          <div className="flex justify-center mt-5 sm:col-span-1 md:col-span-1 lg:col-span-2 ">
            <button className="flex items-center bg-blue-200 p-3 rounded-full text-blue-700 font-bold shadow-lg hover:scale-105 transition-transform">
              <FaPlus className="mr-2" />
              Add Device
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageDevicesControl
