import React, { useState } from "react"
import MyCalendar from "./MyCalendar"

export interface ISmartHomeDevice {
  id: string
  type: "light" | "thermostat" | "camera" | "lock" | "plug"
  name: string
  status?: number
  brightness?: number
  color?: string
  temperature?: number
  locked?: boolean
  powerConsumption?: number
  costPerKw?: number
}

class SmartDevice implements ISmartHomeDevice {
  id: string
  type: "light" | "thermostat" | "camera" | "lock" | "plug"
  name: string
  status?: number
  brightness?: number
  color?: string
  temperature?: number
  locked?: boolean
  powerConsumption?: number
  costPerKw?: number

  constructor(device: ISmartHomeDevice) {
    this.id = device.id
    this.type = device.type
    this.name = device.name
    this.status = device.status
    this.brightness = device.brightness
    this.color = device.color
    this.temperature = device.temperature
    this.locked = device.locked
    this.powerConsumption = device.powerConsumption
    this.costPerKw = device.costPerKw
  }

  // Getters
  getStatus() {
    return this.status
  }

  getPowerConsumption() {
    return this.powerConsumption
  }

  // Setters
  setStatus(status: number) {
    this.status = status
  }

  setTemperature(temperature: number) {
    if (this.type === "thermostat") {
      this.temperature = temperature
    }
  }

  // Additional methods
  calculateCost(hours: number): number | undefined {
    if (this.powerConsumption && this.costPerKw) {
      const consumptionKwH = (this.powerConsumption / 1000) * hours
      return consumptionKwH * this.costPerKw
    }
    return undefined
  }
}

const StaticControl: React.FC = () => {
  const initialDevice = new SmartDevice({
    id: "1",
    type: "thermostat",
    name: "Living Room Light",
    status: 0,
    powerConsumption: 60,
    costPerKw: 0.12,
  })

  const [device, setDevice] = useState<SmartDevice>(initialDevice)

  const toggleDeviceStatus = () => {
    device.setStatus(device.getStatus() === 0 ? 1 : 0)
    setDevice(new SmartDevice({ ...device })) // Create a new instance to trigger re-render
  }

  // Example of setting a different property based on device type
  const adjustTemperature = (temperature: number) => {
    if (device.type === "thermostat") {
      device.setTemperature(temperature)
      setDevice(new SmartDevice({ ...device })) // Update the state to reflect changes
    }
  }

  return (
    <div>
      <h3>{device.name}</h3>
      <p>Status: {device.getStatus() === 0 ? "Off" : "On"}</p>
      <button onClick={toggleDeviceStatus}>Toggle Status</button>
      {device.type === "thermostat" && (
        <div>
          <button onClick={() => adjustTemperature(22)}>
            Set Temperature to 22°C
          </button>
        </div>
      )}
      {/* Display additional device-specific controls as needed */}
    </div>
  )
}

export default StaticControl
