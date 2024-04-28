import { Timestamp } from "@firebase/firestore";
import {
  DeviceType,
  IDevice,
  Manufacturer,
  Status,
  parseDeviceType,
} from "@/lib/DataInterfaces";

export class AirCondition implements IDevice {
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
  // Specific properties for AirCondition
  temperatureSetting: number;

  constructor(device: IDevice) {
    this.name = device.name;
    this.type = parseDeviceType(DeviceType.AirCondition);
    this.idDevice = device.idDevice;
    this.roomId = device.roomId;
    this.manufacturer = device.manufacturer;
    this.cost = device.cost;

    this.status = device.status || Status.OFF;
    this.preTimestamp = device.preTimestamp;
    this.postTimestamp = device.postTimestamp;
    this.powerConsumption = device.powerConsumption;
    // Initialize specific properties for AirCondition
    this.temperatureSetting = device.temperatureSetting || 24; // Default temperature
  }

  public getStatus(): number | undefined {
    return this.status;
  }
  // Method to toggle the device status
  public async toggleStatus(): Promise<void> {
    // Determine the new status based on the current status
    const newStatus = this.status === Status.OFF ? Status.ON : Status.OFF;

    // Update local object's status
    this.status = newStatus;

    console.log(
      `Device ${this.idDevice}, type ${this.type} status toggled to ${newStatus}.`
    );
  }
  public getPowerConsumption(): number | undefined {
    return this.powerConsumption;
  }

  public setTemperature(temperature: number): void {
    this.temperatureSetting = temperature;
  }

  public getTemperature(): number {
    return this.temperatureSetting;
  }

  private setStatus(status: Status): void {
    this.status = status;
  }

  private calculateCost(): number | undefined {
    // A more complex cost calculation could be implemented for an air conditioner
    return (
      this.powerConsumption *
      (this.postTimestamp.toMillis() - this.preTimestamp.toMillis())
    );
  }

  public getCost(): number | undefined {
    return this.calculateCost();
  }
}
