import {
  IDevice,
  Manufacturer,
  Status,
  parseDeviceType,
  DeviceType,
} from "@/lib/DataInterfaces";
import { Timestamp } from "firebase/firestore";

export class Plug implements IDevice {
  // Common IDevice properties
  name: string;
  type: string;
  idDevice: number;
  roomId: number;
  manufacturer: Manufacturer;
  status: Status;
  cost: number;
  preTimestamp: Timestamp;
  postTimestamp: Timestamp;
  powerConsumption: number;

  // Plug-specific properties might include smart features, but for simplicity, we'll stick with common properties

  constructor(device: IDevice) {
    // Initialize common properties
    this.name = device.name;
    this.type = parseDeviceType(DeviceType.Plug);
    this.idDevice = device.idDevice;
    this.roomId = device.roomId;
    this.manufacturer = device.manufacturer;
    this.cost = device.cost;
    this.status = device.status;
    this.preTimestamp = device.preTimestamp;
    this.postTimestamp = device.postTimestamp;
    this.powerConsumption = device.powerConsumption;
  }
  public async toggleStatus(): Promise<void> {
    // Determine the new status based on the current status
    const newStatus = this.status === Status.OFF ? Status.ON : Status.OFF;

    // Update local object's status
    this.status = newStatus;

    console.log(
      `Device ${this.idDevice}, type ${this.type} status toggled to ${newStatus}.`
    );
  }
  // Plug might not need additional specific methods, but you can add methods for smart features if applicable
}
