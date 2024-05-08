// FormWithFloatingLabels.tsx
import { RoomType } from "@/lib/DataInterfaces"
import React, { useState } from "react"

interface Props {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  submitForm: (roomData: {
    name: string
    color: string
    type: RoomType
  }) => void
}

const AddRoomForm: React.FC<Props> = ({ isOpen, setIsOpen, submitForm }) => {
  const [roomName, setRoomName] = useState("")
  const [roomColor, setRoomColor] = useState("")
  const [roomType, setRoomType] = useState<RoomType | "">(RoomType.LivingRoom)

  // Apply the overlay style conditionally based on isOpen
  const overlayStyle = isOpen
    ? {
        opacity: 1,
        visibility: "visible" as const,
      }
    : {
        opacity: 0,
        visibility: "hidden" as const,
      }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomName(e.target.value)
  }

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRoomColor(e.target.value)
  }

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRoomType(e.target.value as RoomType)
  }

  const handleFormSubmit = () => {
    if (roomName.trim() !== "" && roomColor && roomType) {
      submitForm({
        name: roomName,
        color: roomColor,
        type: roomType,
      })
      setIsOpen(false)
      setRoomName("")
      setRoomColor("")
      setRoomType(RoomType.LivingRoom) // Reset to default or consider using a specific initial state
    }
  }

  return (
    <div
      style={overlayStyle}
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-40 transition-opacity duration-500"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-full px-4 py-6 sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl mx-auto bg-white border-0 shadow-lg sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-2xl font-bold mb-8">Add Room</h1>
        <form id="form" noValidate>
          <div className="relative z-0 w-full mb-5">
            <input
              type="text"
              name="name"
              placeholder="Enter Room Name"
              value={roomName}
              onChange={handleInputChange}
              className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 focus:outline-none"
            />
            <span className="text-sm text-red-600">Name is required</span>
          </div>

          <div className="relative z-0 w-full mb-5">
            <select
              name="color"
              value={roomColor}
              onChange={handleColorChange}
              className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 focus:outline-none"
            >
              <option value="" disabled hidden>
                Select a color
              </option>
              <option value="bg-purple-200">Purple</option>
              <option value="bg-rose-200">Rose</option>
              <option value="bg-indigo-200">Indigo</option>
              <option value="bg-orange-100">Orange</option>
            </select>
          </div>

          {/* Select room type */}
          <fieldset className="relative z-0 w-full p-px mb-5">
            <legend className="absolute text-gray-500 transform scale-75 -top-3 origin-0">
              Choose a room type
            </legend>
            <div className="block pt-3 pb-2 space-x-4">
              {Object.values(RoomType).map((type) => (
                <label key={type}>
                  <input
                    type="radio"
                    name="radio"
                    value={type}
                    checked={roomType === type}
                    onChange={handleTypeChange}
                    className="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black"
                  />
                  {type}
                </label>
              ))}
            </div>
            <span className="text-sm text-red-600 hidden" id="error">
              Option has to be selected
            </span>
          </fieldset>

          <button
            type="button"
            className="w-full px-6 py-3 mt-3 text-lg text-white rounded-lg shadow bg-pink-500 hover:bg-pink-600 focus:outline-none"
            onClick={handleFormSubmit}
          >
            Add Room
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddRoomForm
