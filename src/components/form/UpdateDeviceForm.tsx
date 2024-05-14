import React, { useState, useEffect } from "react"
import { DeviceType, Manufacturer, IDevice } from "@/lib/DataInterfaces"
import { getAllRoomsFromUser } from "@/lib/FirebaseCollection"
import { auth } from "@/firebase"

interface Props {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  initialDevice: IDevice
  updateDevice: (deviceId: number, deviceData: IDevice) => void
}

const UpdateDeviceForm: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  initialDevice,
  updateDevice,
}) => {
  const [deviceName, setDeviceName] = useState(initialDevice.name)
  const [deviceType, setDeviceType] = useState<DeviceType>(initialDevice.type)
  const [deviceManufacturer, setDeviceManufacturer] = useState<Manufacturer>(
    initialDevice.manufacturer
  )
  const [deviceCost, setDeviceCost] = useState<number>(initialDevice.cost)
  const [devicePowerConsumption, setDevicePowerConsumption] = useState<number>(
    initialDevice.powerConsumption
  )
  const [roomId, setRoomId] = useState<number | undefined>(initialDevice.roomId)
  const [rooms, setRooms] = useState<{ id: number; name: string }[]>([])

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    switch (name) {
      case "name":
        setDeviceName(value)
        break
      case "cost":
        setDeviceCost(parseFloat(value))
        break
      case "powerConsumption":
        setDevicePowerConsumption(parseFloat(value))
        break
      case "roomId":
        setRoomId(parseInt(value))
        break
      case "type":
        setDeviceType(value as DeviceType)
        break
      case "manufacturer":
        setDeviceManufacturer(value as Manufacturer)
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
      const updatedDevice: IDevice = {
        ...initialDevice, // Start with all initial device properties
        name: deviceName,
        type: deviceType,
        roomId: roomId,
        manufacturer: deviceManufacturer,
        cost: deviceCost,
        powerConsumption: devicePowerConsumption,
      }
      updateDevice(initialDevice.idDevice, updatedDevice)
      setIsOpen(false)
    }
  }

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
        <h1 className="text-2xl font-bold mb-8">Update Device</h1>
        <form id="form" noValidate>
          <input
            type="text"
            name="name"
            placeholder="Enter Device Name"
            value={deviceName}
            onChange={handleInputChange}
            className="w-full p-2 border-b-2 mb-5"
          />
          {/* Remaining form fields with similar setup */}
          <button
            type="button"
            className="w-full p-3 mt-3 text-lg text-white bg-pink-500 hover:bg-pink-600 focus:outline-none rounded-lg"
            onClick={handleFormSubmit}
          >
            Update Device
          </button>
        </form>
      </div>
    </div>
  )
}

export default UpdateDeviceForm
