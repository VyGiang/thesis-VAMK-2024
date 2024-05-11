import { IDevice, Manufacturer, Status, DeviceType } from "@/lib/DataInterfaces"
import { Timestamp } from "firebase/firestore"

export class Plug implements IDevice {
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

  // Plug-specific properties might include smart features, but for simplicity, we'll stick with common properties

  constructor(device: IDevice) {
    // Initialize common properties
    this.name = device.name
    this.type = DeviceType.Plug
    this.idDevice = device.idDevice
    this.roomId = device.roomId
    this.manufacturer = device.manufacturer
    this.cost = device.cost
    this.status = device.status
    this.preTimestamp = device.preTimestamp
    this.postTimestamp = device.postTimestamp
    this.powerConsumption = device.powerConsumption
    this.icon = device.icon
  }
  // Plug might not need additional specific methods, but you can add methods for smart features if applicable
}
