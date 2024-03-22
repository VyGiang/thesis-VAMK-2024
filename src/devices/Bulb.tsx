import { ISmartHomeDevice } from "@/components/generes/StaticticsControl"
import React from "react"

class Bulb implements ISmartHomeDevice {
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
}

const TpLinkBulb = () => {
  return <div>Bulb</div>
}

const PhilipsHueBulb = () => {
  return <div>Bulb</div>
}
const
