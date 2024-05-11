import { IDevice, Manufacturer, Status, DeviceType } from "@/lib/DataInterfaces"
import { Timestamp } from "firebase/firestore"

export class Thermostat implements IDevice {
  // Common IDevice properties
  name: string
  type: DeviceType
  idDevice: number
  roomId: number
  manufacturer: Manufacturer
  status: Status
  cost: number
  preTimestamp: Timestamp
  postTimestamp: Timestamp
  powerConsumption: number
  icon: string

  // Thermostat-specific properties
  currentTemperature: number
  targetTemperature: number

  constructor(device: IDevice) {
    // Initialize common properties
    this.name = device.name
    this.type = DeviceType.Thermostat
    this.idDevice = device.idDevice
    this.roomId = device.roomId
    this.manufacturer = device.manufacturer
    this.cost = device.cost
    this.status = device.status
    this.preTimestamp = device.preTimestamp
    this.postTimestamp = device.postTimestamp
    this.powerConsumption = device.powerConsumption
    this.icon = device.icon
    // Initialize thermostat-specific properties
    this.currentTemperature = device.currentTemperature ?? 0
    this.targetTemperature = device.targetTemperature ?? 0
  }
  // Additional methods for thermostat-specific functionality
  setTargetTemperature(temperature: number): void {
    this.targetTemperature = temperature
  }

  getCurrentTemperature(): number {
    return this.currentTemperature
  }

  getTargetTemperature(): number {
    return this.targetTemperature
  }
}
