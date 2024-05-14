import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import OnOffButton from "../buttons/OnOffButton"
import { auth } from "@/firebase"
import { IDevice, IRoom } from "@/lib/DataInterfaces"
import {
  getAllDevicesFromUser,
  getAllRoomsFromUser,
} from "@/lib/FirebaseCollection"
import LeftSidebar from "./LeftSidebar"
import MobileHeader from "./MobileHeader"
import Navbar from "./Navbar"
import CurrentTime from "./CurrentTime"
import { IoReturnDownBack } from "react-icons/io5"

const RoomDevices = () => {
  const { roomId } = useParams()
  const userId = auth.currentUser?.uid ?? ""
  const [localDevices, setLocalDevices] = useState<IDevice[]>([])
  const [roomName, setRoomName] = useState("Loading...")
  const [roomColors, setRoomColors] = useState<{ [key: number]: string }>({})
  const [totalCost, setTotalCost] = useState(0)
  const navigate = useNavigate()
  const navigateToRoom = () => navigate("/rooms")

  const fetchData = async () => {
    const fetchedRooms = await getAllRoomsFromUser(userId)
    const fetchedDevices = await getAllDevicesFromUser(userId)
    const colors: { [key: number]: string } = {}
    fetchedRooms.forEach((room: IRoom) => {
      colors[room.roomId] = room.color // Assuming each room has a 'color' property
    })
    setRoomColors(colors)

    // Filter and sort devices by room
    if (fetchedDevices) {
      const filteredDevices = fetchedDevices.filter(
        (device) => device.roomId === parseInt(roomId)
      )
      const sortedDevices = filteredDevices.sort((a, b) =>
        a.type.localeCompare(b.type)
      )
      setLocalDevices(sortedDevices)
      calculateTotalCost(sortedDevices)
    }

    // Find the current room and set its name
    const currentRoom = fetchedRooms.find(
      (room) => room.roomId === parseInt(roomId)
    )
    if (currentRoom) {
      setRoomName(currentRoom.name)
    }
  }

  const calculateTotalCost = (devices) => {
    const costPerKWh = 0.12 // Fixed cost per kWh for testing
    const total = devices.reduce((acc, device) => {
      return acc + device.usageDuration * device.powerConsumption * costPerKWh
    }, 0)
    setTotalCost(total)
    console.log("Total cost:", total)
  }

  useEffect(() => {
    fetchData()
  }, [userId, roomId])

  return (
    <div className="bg-blue-200 font-merri dark:bg-[#1c1d1f]">
      <div>
        <MobileHeader />
      </div>
      <div className="grid grid-cols-12 gap-5 container mx-auto p-6 md:px-6">
        <div className="bg-[#4979a3] flex-wrap space-between sticky top-0 md:col-span-12 md:hidden h-screen sm:col-span-12 sm:hidden lg:col-span-2 lg:flex rounded-xl dark:bg-[#2e537a]">
          <LeftSidebar />
        </div>
        <div className="md:col-span-12 sm:col-span-12 lg:col-span-10 rounded-xl">
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5">
              <Navbar />
              <div className="flex items-center justify-end transform duration-500 hover:scale-105">
                <CurrentTime />
              </div>
              <div className="bg-[#F0F0F0] sm:col-span-1 md:col-span-1 lg:col-span-2 rounded-xl grid grid-cols-4 gap-5 p-5 dark:bg-[#66676d]">
                <div className="col-span-4">
                  <div className="flex justify-between mb-5">
                    <h1 className="lg:text-5xl sm:text-lg md:text-lg font-bold mb-2">
                      {roomName}
                    </h1>
                    <button
                      onClick={navigateToRoom}
                      className="flex items-center text-xl font-semibold transition duration-200"
                    >
                      <IoReturnDownBack
                        className="mr-2 hidden sm:block lg:hidden"
                        size={20}
                      />
                      <IoReturnDownBack
                        className="mr-2 hidden lg:block"
                        size={40}
                      />
                      <span className="lg:text-2xl sm:text-lg md:text-lg">
                        Back
                      </span>
                    </button>
                  </div>
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
        </div>
      </div>
    </div>
  )
}

export default RoomDevices
