import {
  DeviceType,
  IDevice,
  Manufacturer,
  Status,
} from "@/lib/DataInterfaces";
import { Timestamp } from "@firebase/firestore";

export class Bulb implements IDevice {
  name: string;
  type: DeviceType;
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
    this.type = DeviceType.Bulb;
    this.idDevice = device.idDevice;
    this.roomId = device.roomId;
    this.manufacturer = device.manufacturer;
    this.cost = device.cost;

    this.status = device.status || Status.OFF;
    this.preTimestamp = device.preTimestamp;
    this.postTimestamp = device.postTimestamp;
    this.powerConsumption = device.powerConsumption;
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
