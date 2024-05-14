import React, { useEffect, useState } from "react"
import Navbar from "./Navbar"
import OnOffButton from "../buttons/OnOffButton"
import CurrentTime from "./CurrentTime"
import { auth } from "@/firebase"
import { IDevice, IRoom } from "@/lib/DataInterfaces"
import {
  getAllDevicesFromUser,
  getAllRoomsFromUser,
} from "@/lib/FirebaseCollection"

const DevicesControl = () => {
  const [localDevices, setLocalDevices] = useState<IDevice[]>([])
  const [roomColors, setRoomColors] = useState<{ [key: number]: string }>({})

  const userId = auth.currentUser?.uid ?? ""

  const sortDevicesByType = (devices: IDevice[]) => {
    return devices.sort((a, b) => a.type.localeCompare(b.type))
  }

  const fetchRooms = async () => {
    const rooms = await getAllRoomsFromUser(userId)
    const colors: { [key: number]: string } = {}
    rooms.forEach((room: IRoom) => {
      colors[room.roomId] = room.color // Assuming each room has a 'color' property
    })
    setRoomColors(colors)
  }

  const fetchDevices = async () => {
    const fetchedDevices = await getAllDevicesFromUser(userId)
    const sortedDevices = sortDevicesByType(fetchedDevices as IDevice[])
    setLocalDevices(sortedDevices)
  }

  const fetchData = async () => {
    await fetchRooms()
    await fetchDevices()
  }

  useEffect(() => {
    fetchData()
  }, [userId])

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5">
        <Navbar />
        <div className="flex items-center justify-end transform duration-500 hover:scale-105">
          <CurrentTime />
        </div>
        <div className="bg-[#F0F0F0] sm:col-span-1 md:col-span-1 lg:col-span-2 rounded-xl grid grid-cols-4 gap-5 p-5 dark:bg-[#66676d]">
          <div className="col-span-4">
            <h1 className="lg:text-5xl sm:text-lg md:text-lg font-bold mb-3">
              Devices
            </h1>
          </div>
          {localDevices.map((device) => (
            <div
              key={device.idDevice}
              className="transform duration-500 hover:scale-105 rounded-3xl sm:col-span-2 md:col-span-2 lg:col-span-1 flex flex-col items-center"
            >
              <div
                className={`flex flex-col items-center p-1 rounded-2xl ${
                  roomColors[device.roomId] || "bg-green-100"
                } lg:h-44 lg:w-44 sm:h-32 sm:w-32 md:h-64 md:w-64 justify-evenly shadow-lg`}
              >
                <OnOffButton userId={userId} deviceId={device.idDevice} />
                <img
                  src={device.icon}
                  className="lg:w-3/12 sm:w-2.5/12 md:w-4/12 object-contain"
                  alt={device.name}
                />
                <span className="lg:mt-2 text-lg font-medium pb-2 sm:pb-3 dark:text-slate-400">
                  {device.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DevicesControl
