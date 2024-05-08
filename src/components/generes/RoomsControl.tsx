import React, { useEffect, useState } from "react"
import Navbar from "./Navbar"
import { useNavigate } from "react-router-dom"
import CurrentTime from "./CurrentTime"
import { FaPlus } from "react-icons/fa"
import AddRoomForm from "./AddRoomForm"
import {
  addFamilyMembersToFirestore,
  addRoomToUser,
  addRoomsToFirestore,
  deleteRoomFromUser,
  getAllRoomsFromUser,
} from "@/lib/FirebaseCollection"
import { IRoom, RoomType, getRoomIcon } from "@/lib/DataInterfaces"
import { auth } from "@/firebase"

const RoomsControl: React.FC = () => {
  const userId = auth.currentUser?.uid ?? ""

  const [localRooms, setLocalRooms] = useState<IRoom[]>([])

  const fetchData = async () => {
    // Fetch s from Firestore and update the state
    const fetchedRooms = await getAllRoomsFromUser(userId)
    setLocalRooms(fetchedRooms as IRoom[])
  }

  const handleAddRoom = async (room: {
    name: string
    color: string
    type: RoomType
  }) => {
    try {
      await addRoomToUser(userId, 7, {
        name: room.name,
        roomId: 7,
        ownerId: "test",
        isPrivate: false,
        icon: getRoomIcon(room.type),
        color: room.color,
      })
      fetchData() // Reload or refetch room data
    } catch (error) {
      console.error("Error adding room:", error)
    }
  }

  const handleDeleteRoom = async (roomId: number) => {
    await deleteRoomFromUser(userId, roomId)
    setLocalRooms((prevRooms) =>
      prevRooms.filter((room) => room.roomId !== roomId)
    )
  }

  useEffect(() => {
    fetchData()
  }, [userId])

  const navigate = useNavigate()

  const navigateToLivingRoom = () => {
    navigate("/rooms/livingRoom")
  }
  const navigateToBedRoom = () => {
    navigate("/rooms/bedRoom")
  }
  const navigateToBathRoom = () => {
    navigate("/rooms/bathRoom")
  }
  const navigateToKitchen = () => {
    navigate("/rooms/kitchen")
  }
  const [isFormOpen, setIsFormOpen] = useState(false)

  const [rooms, setRooms] = useState<string[]>([])

  const addRoom = (name: string) => {
    setRooms([...rooms, name])
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Navbar */}
        <Navbar />
        <div className="flex items-center justify-end transform duration-500 hover:scale-105">
          <CurrentTime />
        </div>

        {/* main*/}
        <div className=" bg-[#F0F0F0] sm:col-span-1 md:col-span-1 lg:col-span-2 rounded-xl p-10 dark:bg-[#66676d]">
          <h1 className="lg:text-5xl  sm:text-lg md:text-lg font-bold mb-3">
            Rooms
          </h1>
          {/* Dynamically render rooms */}
          {localRooms.map((room) => (
            <React.Fragment key={room.roomId}>
              <div
                className="bg-white p-3 rounded-2xl flex items-center mb-5 dark:bg-[#1d1d1f] transform duration-500 hover:scale-105"
                onClick={() => navigateToKitchen()}
              >
                <div
                  className={`flex h-20 w-20 shrink-0 grow-0 items-center justify-center rounded-full ${room.color} shadow-md shadow-slate-500`}
                >
                  <img src={room.icon} alt={room.name} className="w-5/12"></img>
                </div>
                <span className=" lg:text-xl  sm:text-lg md:text-lg font-bold pl-5">
                  {room.name}
                </span>
              </div>
            </React.Fragment>
          ))}
          {/* Add room*/}
          <div className="bg-white p-3 rounded-2xl flex items-center mb-5 dark:bg-[#1d1d1f] transform duration-500 hover:scale-105">
            <button
              className=" flex h-20 w-20 shrink-0 grow-0 items-center justify-center rounded-full bg-gradient-to-br to-blue-300 via-blue-200 from-white shadow-lg shadow-slate-500 border-4 border-white"
              onClick={() => setIsFormOpen(true)}
            >
              <FaPlus className="w-6 h-6 md:w-8 md:h-8 lg:w-8 lg:h-8 text-white" />
            </button>
            <span className=" lg:text-xl  sm:text-lg md:text-lg font-bold pl-5">
              Add Room
            </span>
          </div>
          <AddRoomForm
            isOpen={isFormOpen}
            setIsOpen={setIsFormOpen}
            submitForm={handleAddRoom}
          />
        </div>
      </div>
    </div>
  )
}

export default RoomsControl
