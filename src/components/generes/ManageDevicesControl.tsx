// ManageDevicesControl.tsx
import React, { useEffect, useState } from "react"
import Navbar from "./Navbar"
import CurrentTime from "./CurrentTime"
import { FaPlus } from "react-icons/fa"
import { IoReturnDownBack } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import {
  DeviceType,
  IDevice,
  Manufacturer,
  Status,
  getDeviceIcon,
  IRoom,
} from "@/lib/DataInterfaces"
import AddDeviceForm from "../form/AddDeviceForm"
import {
  addDeviceToUser,
  deleteDeviceFromUser,
  getAllDevicesFromUser,
  getAllRoomsFromUser,
} from "@/lib/FirebaseCollection"
import { auth } from "@/firebase"

const ManageDevicesControl = () => {
  const [localDevices, setLocalDevices] = useState<IDevice[]>([])
  const [roomColors, setRoomColors] = useState<{ [roomId: number]: string }>({})
  const [roomName, setRoomName] = useState<{ [roomId: number]: string }>({})
  const [isAddFormOpen, setIsAddFormOpen] = useState(false)
  const userId = auth.currentUser?.uid ?? ""

  const sortDevicesByType = (devices: IDevice[]) => {
    return devices.sort((a, b) => a.type.localeCompare(b.type))
  }

  const fetchRooms = async () => {
    const fetchedRooms = await getAllRoomsFromUser(userId)
    const roomColor: { [roomId: number]: string } = {}
    const roomNames: { [roomId: number]: string } = {}
    if (fetchedRooms) {
      fetchedRooms.forEach((room: IRoom) => {
        roomColor[room.roomId] = room.color
        roomNames[room.roomId] = room.name
      })
    }
    setRoomColors(roomColor)
    setRoomName(roomNames)
  }

  const fetchDevices = async () => {
    const fetchedDevices = await getAllDevicesFromUser(userId)
    // Sort devices by type before setting them to state
    const sortedDevices = sortDevicesByType(fetchedDevices as IDevice[])
    setLocalDevices(sortedDevices)
  }

  const fetchData = async () => {
    await fetchRooms()
    await fetchDevices()
  }

  const handleDeleteDevice = async (deviceId: number) => {
    await deleteDeviceFromUser(userId, deviceId)
    setLocalDevices((prevDevices) =>
      prevDevices.filter((device) => device.idDevice !== deviceId)
    )
  }

  const getNextDeviceId = () => {
    const maxDeviceId = localDevices.reduce(
      (max, device) => Math.max(max, device.idDevice),
      0
    )
    return maxDeviceId + 1
  }

  const handleAddDevice = async (device: {
    name: string
    type: DeviceType
    manufacturer: Manufacturer
    cost: number
    roomId: number
    powerConsumption: number
  }) => {
    try {
      const nextDeviceId = getNextDeviceId()
      await addDeviceToUser(userId, nextDeviceId, {
        name: device.name,
        type: device.type,
        idDevice: nextDeviceId,
        roomId: device.roomId, // Replace with the appropriate room ID if applicable
        manufacturer: device.manufacturer,
        status: Status.OFF, // Default status for new devices
        cost: device.cost,
        preTimestamp: new Date() as any,
        postTimestamp: new Date() as any,
        powerConsumption: device.powerConsumption,
        icon: getDeviceIcon(device.type),
      })
      fetchData() // Reload or refetch the device data
    } catch (error) {
      console.error("Error adding device:", error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [userId])

  const navigate = useNavigate()
  const navigateToSetting = () => {
    navigate("/setting")
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Navbar */}
        <Navbar />
        <div className="flex items-center justify-end transform duration-500 hover:scale-105">
          <CurrentTime />
        </div>

        {/* main */}
        <div className="bg-[#F0F0F0] sm:col-span-1 md:col-span-1 lg:col-span-2 rounded-xl grid md:grid-cols-2 lg:grid-cols-2 gap-5 p-5 dark:bg-[#66676d]">
          <div className="col-span-2">
            <div className="flex justify-between mb-5">
              <h1 className="lg:text-5xl sm:text-xl md:text-xl font-bold">
                Manage Devices
              </h1>
              <button
                onClick={navigateToSetting}
                className="flex items-center text-xl font-semibold transition duration-200"
              >
                <IoReturnDownBack
                  className="mr-2 hidden sm:block lg:hidden"
                  size={20}
                />
                <IoReturnDownBack className="mr-2 hidden lg:block" size={40} />
                <span className="lg:text-2xl sm:text-lg md:text-lg">Back</span>
              </button>
            </div>
          </div>
          {/* Map Devices */}
          {localDevices.map((device) => {
            const deviceColor = roomColors[device.roomId] || "bg-white"
            return (
              <div
                key={device.idDevice}
                className={`p-5 ${deviceColor} rounded-xl shadow-lg flex flex-col justify-between`}
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center space-x-2">
                    <img
                      src={device.icon}
                      className="lg:w-3/12 sm:w-2/12 md:w-3/12 lg:h-3/12 sm:h-1/12 md:h-3/12"
                      alt="Device"
                    />
                    <h2 className="lg:text-2xl sm:text-md md:text-2xl font-bold ">
                      {device.name}
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
                  <li>Type: {device.type}</li>
                  <li>Cost: ${device.cost}</li>
                  <li>Manufacturer: {device.manufacturer}</li>
                  <li>Power Consumption: {device.powerConsumption} kWh</li>
                  <li>Room ID: {device.roomId}</li>
                  <li>Room Name: {roomName[device.roomId]}</li>
                </ul>
              </div>
            )
          })}

          {/* Add Device Button */}
          <div className="flex justify-center mt-5 sm:col-span-1 md:col-span-1 lg:col-span-2">
            <button
              className="flex items-center bg-blue-200 p-3 rounded-full text-blue-700 font-bold shadow-lg hover:scale-105 transition-transform"
              onClick={() => setIsAddFormOpen(true)}
            >
              <FaPlus className="mr-2" />
              Add Device
            </button>
          </div>
          <AddDeviceForm
            isOpen={isAddFormOpen}
            setIsOpen={setIsAddFormOpen}
            submitForm={handleAddDevice}
          />
        </div>
      </div>
    </div>
  )
}

export default ManageDevicesControl
