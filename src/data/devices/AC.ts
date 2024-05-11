import { Timestamp } from "@firebase/firestore"
import {
  DeviceType,
  IDevice,
  Manufacturer,
  Status,
  getDeviceIcon,
} from "@/lib/DataInterfaces"

export class AirCondition implements IDevice {
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
  // Specific properties for AirCondition
  temperatureSetting: number
  icon: string

  constructor(device: IDevice) {
    this.name = device.name
    this.type = DeviceType.AirCondition
    this.idDevice = device.idDevice
    this.roomId = device.roomId
    this.manufacturer = device.manufacturer
    this.cost = device.cost
    this.icon = device.icon
    this.status = device.status
    this.preTimestamp = device.preTimestamp
    this.postTimestamp = device.postTimestamp
    this.powerConsumption = device.powerConsumption
    // Initialize specific properties for AirCondition
    this.temperatureSetting = device.temperatureSetting || 24 // Default temperature
  }

  public getStatus(): string | undefined {
    return this.status
  }
  public getPowerConsumption(): number | undefined {
    return this.powerConsumption
  }

  public setTemperature(temperature: number): void {
    this.temperatureSetting = temperature
  }

  public getTemperature(): number {
    return this.temperatureSetting
  }

  private setStatus(status: Status): void {
    this.status = status
  }

  private calculateCost(): number | undefined {
    // A more complex cost calculation could be implemented for an air conditioner
    return (
      this.powerConsumption *
      (this.postTimestamp.toMillis() - this.preTimestamp.toMillis())
    )
  }

  public getCost(): number | undefined {
    return this.calculateCost()
  }
}
