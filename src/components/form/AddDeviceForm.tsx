// AddDeviceForm.tsx
import React, { useState, useEffect } from "react"
import {
  DeviceType,
  Manufacturer,
  Status,
  IDevice,
  getDeviceIcon,
} from "@/lib/DataInterfaces"
import { getAllRoomsFromUser } from "@/lib/FirebaseCollection"
import { auth } from "@/firebase" // Make sure the auth module is correctly imported

interface Props {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  submitForm: (deviceData: IDevice) => void
}

const AddDeviceForm: React.FC<Props> = ({ isOpen, setIsOpen, submitForm }) => {
  const [deviceName, setDeviceName] = useState("")
  const [deviceType, setDeviceType] = useState<DeviceType | "">("")
  const [deviceManufacturer, setDeviceManufacturer] = useState<
    Manufacturer | ""
  >("")
  const [deviceCost, setDeviceCost] = useState<number | "">("")
  const [devicePowerConsumption, setDevicePowerConsumption] = useState<
    number | ""
  >("")
  const [roomId, setRoomId] = useState<number | undefined>()
  const [rooms, setRooms] = useState<{ id: number; name: string }[]>([])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    switch (name) {
      case "name":
        setDeviceName(value)
        break
      case "cost":
        setDeviceCost(value === "" ? "" : parseFloat(value))
        break
      case "powerConsumption":
        setDevicePowerConsumption(value === "" ? "" : parseFloat(value))
        break
      case "roomId":
        setRoomId(value === "" ? undefined : parseInt(value))
        break
      case "type": // Handling device type selection
        setDeviceType(value as DeviceType)
        break
      case "manufacturer": // Handling manufacturer selection
        setDeviceManufacturer(value as Manufacturer)
        break
      default:
        break
    }
  }

  const handleFormSubmit = () => {
    if (
      deviceName &&
      deviceType &&
      deviceManufacturer &&
      roomId !== undefined
    ) {
      const newDevice: IDevice = {
        name: deviceName,
        type: deviceType,
        idDevice: Date.now(),
        roomId: roomId,
        manufacturer: deviceManufacturer,
        status: Status.OFF,
        cost: Number(deviceCost),
        preTimestamp: new Date() as any,
        postTimestamp: new Date() as any,
        powerConsumption: Number(devicePowerConsumption),
        icon: getDeviceIcon(deviceType),
      }
      submitForm(newDevice)
      setIsOpen(false)
      resetForm()
    }
  }

  const resetForm = () => {
    setDeviceName("")
    setDeviceType("")
    setDeviceManufacturer("")
    setDeviceCost("")
    setDevicePowerConsumption("")
    setRoomId(undefined)
  }

  useEffect(() => {
    const userId = auth.currentUser?.uid ?? ""
    const fetchRooms = async () => {
      const fetchedRooms = await getAllRoomsFromUser(userId)
      setRooms(
        fetchedRooms.map((room) => ({ id: room.roomId, name: room.name }))
      )
    }
    fetchRooms()
  }, [])
  return (
    <div
      style={{
        opacity: isOpen ? 1 : 0,
        visibility: isOpen ? "visible" : "hidden",
      }}
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-40 transition-opacity duration-500"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-full px-4 py-6 sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl mx-auto bg-white border-0 shadow-lg sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-2xl font-bold mb-8">Add Device</h1>
        <form id="form" noValidate>
          <input
            type="text"
            name="name"
            placeholder="Enter Device Name"
            value={deviceName}
            onChange={handleInputChange}
            className="w-full p-2 border-b-2 mb-5"
          />
          <select
            name="type"
            value={deviceType}
            onChange={handleInputChange}
            className="w-full p-2 border-b-2 mb-5"
          >
            <option value="" disabled hidden>
              Select a device type
            </option>
            {Object.values(DeviceType).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <select
            name="manufacturer"
            value={deviceManufacturer}
            onChange={handleInputChange}
            className="w-full p-2 border-b-2 mb-5"
          >
            <option value="" disabled hidden>
              Select a manufacturer
            </option>
            {Object.values(Manufacturer).map((manufacturer) => (
              <option key={manufacturer} value={manufacturer}>
                {manufacturer}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="cost"
            placeholder="Cost ($)"
            value={deviceCost}
            onChange={handleInputChange}
            className="w-full p-2 border-b-2 mb-5"
          />
          <input
            type="number"
            name="powerConsumption"
            placeholder="Power Consumption (kWh)"
            value={devicePowerConsumption}
            onChange={handleInputChange}
            className="w-full p-2 border-b-2 mb-5"
          />
          <select
            name="roomId"
            value={roomId || ""}
            onChange={handleInputChange}
            className="w-full p-2 border-b-2 mb-5"
          >
            <option value="" disabled>
              Select a room
            </option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="w-full p-3 mt-3 text-lg text-white bg-pink-500 hover:bg-pink-600 focus:outline-none rounded-lg"
            onClick={handleFormSubmit}
          >
            Add Device
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddDeviceForm
