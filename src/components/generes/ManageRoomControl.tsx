// ManageRoomControl.tsx
import React, { useEffect, useState } from "react"
import Navbar from "./Navbar"
import { useNavigate } from "react-router-dom"
import CurrentTime from "./CurrentTime"
import { FaPlus } from "react-icons/fa"
import AddRoomForm from "../form/AddRoomForm"
import UpdateRoomForm from "../form/UpdateRoomForm"
import {
  addRoomToUser,
  updateRoomToUser,
  deleteRoomFromUser,
  getAllRoomsFromUser,
} from "@/lib/FirebaseCollection"
import { IRoom, RoomType, getRoomIcon } from "@/lib/DataInterfaces"
import { auth } from "@/firebase"
import { IoReturnDownBack } from "react-icons/io5"

const ManageRoomControl: React.FC = () => {
  const userId = auth.currentUser?.uid ?? ""

  const [localRooms, setLocalRooms] = useState<IRoom[]>([])
  const [isAddFormOpen, setIsAddFormOpen] = useState(false)
  const [isEditFormOpen, setIsEditFormOpen] = useState(false)
  const [editingRoom, setEditingRoom] = useState<IRoom | null>(null)

  const fetchData = async () => {
    const fetchedRooms = await getAllRoomsFromUser(userId)
    setLocalRooms(fetchedRooms as IRoom[])
  }

  const getNextRoomId = () => {
    const maxRoomId = localRooms.reduce(
      (max, room) => Math.max(max, room.roomId),
      0
    )
    return maxRoomId + 1
  }

  const handleAddRoom = async (room: {
    name: string
    color: string
    type: RoomType
  }) => {
    try {
      const nextRoomId = getNextRoomId()
      await addRoomToUser(userId, nextRoomId, {
        name: room.name,
        roomId: nextRoomId,
        ownerId: userId,
        isPrivate: false,
        icon: getRoomIcon(room.type),
        color: room.color,
      })
      fetchData() // Reload or refetch room data
    } catch (error) {
      console.error("Error adding room:", error)
    }
  }

  const handleEditRoom = (room: IRoom) => {
    setEditingRoom(room)
    setIsEditFormOpen(true)
  }

  const handleUpdateRoom = async (room: {
    name: string
    color: string
    type: RoomType
  }) => {
    if (editingRoom) {
      try {
        await updateRoomToUser(userId, editingRoom.roomId, {
          ...editingRoom,
          name: room.name,
          color: room.color,
          type: room.type,
          icon: getRoomIcon(room.type),
        })
        fetchData() // Reload or refetch room data
        setEditingRoom(null)
      } catch (error) {
        console.error("Error updating room:", error)
      }
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
        <div className="bg-[#F0F0F0] sm:col-span-1 md:col-span-1 lg:col-span-2 rounded-xl p-10 dark:bg-[#66676d]">
          <div className="flex justify-between mb-5">
            <h1 className="lg:text-5xl sm:text-xl md:text-xl font-bold">
              Manage Rooms
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

          {/* Dynamically render rooms */}
          {localRooms.map((room) => (
            <React.Fragment key={room.roomId}>
              <div className="bg-white p-3 rounded-2xl flex items-center mb-5 dark:bg-[#1d1d1f] transform duration-500 hover:scale-105">
                <div
                  className={`flex h-20 w-20 shrink-0 grow-0 items-center justify-center rounded-full ${room.color} shadow-md shadow-slate-500`}
                >
                  <img src={room.icon} alt={room.name} className="w-5/12" />
                </div>
                <span className="lg:text-xl sm:text-lg md:text-lg font-bold pl-5">
                  {room.name}
                </span>
                <div className="flex ml-auto space-x-3">
                  <button onClick={() => handleEditRoom(room)}>
                    <img
                      src="/images/edit.png"
                      className="lg:w-10 sm:w-4 md:w-6 lg:h-10 sm:h-4 md:h-6"
                      alt="Edit"
                    />
                  </button>
                  <button onClick={() => handleDeleteRoom(room.roomId)}>
                    <img
                      src="/images/delete.png"
                      className="lg:w-10 sm:w-4 md:w-6 lg:h-10 sm:h-4 md:h-6"
                      alt="Delete"
                    />
                  </button>
                </div>
              </div>
            </React.Fragment>
          ))}

          {/* Add Room */}
          <div className="bg-white p-3 rounded-2xl flex items-center mb-5 dark:bg-[#1d1d1f] transform duration-500 hover:scale-105">
            <button
              className="flex h-20 w-20 shrink-0 grow-0 items-center justify-center rounded-full bg-gradient-to-br to-blue-300 via-blue-200 from-white shadow-lg shadow-slate-500 border-4 border-white"
              onClick={() => setIsAddFormOpen(true)}
            >
              <FaPlus className="w-6 h-6 md:w-8 md:h-8 lg:w-8 lg:h-8 text-white" />
            </button>
            <span className="lg:text-xl sm:text-lg md:text-lg font-bold pl-5">
              Add Room
            </span>
          </div>

          {/* Add and Update Room Forms */}
          <AddRoomForm
            isOpen={isAddFormOpen}
            setIsOpen={setIsAddFormOpen}
            submitForm={handleAddRoom}
          />
          {editingRoom && (
            <UpdateRoomForm
              isOpen={isEditFormOpen}
              room={editingRoom}
              setIsOpen={setIsEditFormOpen}
              updateRoom={handleUpdateRoom}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default ManageRoomControl
