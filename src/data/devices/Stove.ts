import { DeviceType, IDevice, Manufacturer, Status } from "@/lib/DataInterfaces"
import { Timestamp } from "firebase/firestore"

export class Stove implements IDevice {
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

  constructor(device: IDevice) {
    this.name = device.name
    this.type = DeviceType.Stove
    this.idDevice = device.idDevice
    this.roomId = device.roomId
    this.manufacturer = device.manufacturer
    this.cost = device.cost
    this.icon = device.icon
    this.status = device.status
    this.preTimestamp = device.preTimestamp
    this.postTimestamp = device.postTimestamp
    this.powerConsumption = device.powerConsumption
  }

  public toFirestore() {
    return {
      name: this.name,
      type: this.type,
      idDevice: this.idDevice,
      roomId: this.roomId,
      manufacturer: this.manufacturer,
      status: this.status,
      cost: this.cost,
      preTimestamp: this.preTimestamp,
      postTimestamp: this.postTimestamp,
      powerConsumption: this.powerConsumption,
    }
  }

  public getStatus(): string | undefined {
    return this.status
  }

  public getPowerConsumption(): number | undefined {
    return this.powerConsumption
  }

  private setStatus(status: Status): void {
    this.status = status
  }

  private calculateCost(): number | undefined {
    return (
      this.powerConsumption *
      (this.postTimestamp.toMillis() - this.preTimestamp.toMillis())
    )
  }

  public getCost(): number | undefined {
    return this.calculateCost()
  }
}
