import { db } from "@/firebase";
import {
  DeviceType,
  IDevice,
  Manufacturer,
  Status,
  parseDeviceType,
} from "@/lib/DataInterfaces";
import { Timestamp } from "firebase/firestore";

export class Stove implements IDevice {
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

  constructor(device: IDevice) {
    this.name = device.name;
    this.type = parseDeviceType(DeviceType.Bulb);
    this.idDevice = device.idDevice;
    this.roomId = device.roomId;
    this.manufacturer = device.manufacturer;
    this.cost = device.cost;

    this.status = device.status || Status.OFF;
    this.preTimestamp = device.preTimestamp;
    this.postTimestamp = device.postTimestamp;
    this.powerConsumption = device.powerConsumption;
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
    };
  }

  // Method to toggle the device status
  public async toggleStatus(): Promise<void> {
    const newStatus = this.status === Status.OFF ? Status.ON : Status.OFF;

    this.status = newStatus;

    console.log(
      `Device ${this.idDevice} type ${this.type} status toggled to ${newStatus}.`
    );
  }

  public getStatus(): number | undefined {
    return this.status;
  }

  public getPowerConsumption(): number | undefined {
    return this.powerConsumption;
  }

  private setStatus(status: Status): void {
    this.status = status;
  }

  private calculateCost(): number | undefined {
    return (
      this.powerConsumption *
      (this.postTimestamp.toMillis() - this.preTimestamp.toMillis())
    );
  }

  public getCost(): number | undefined {
    return this.calculateCost();
  }
}
