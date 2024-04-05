import { Timestamp } from "firebase/firestore";

export enum DeviceType {
  Thermostat,
  Bulb,
  Plug,
  Camera,
  Lock,
}

export enum Status {
  ON,
  OFF,
  BROKEN,
}

export enum Manufacturer {
  Bosch,
  Philips,
  Samsung,
  Sony,
  LG,
  Xiaomi,
  Apple,
  Microsoft,
}

export interface IUserLogin {
  name: string;
  id: number;
  timestamp: Timestamp;
  avatar: string;
}

export interface IDevice {
  name: string;
  type: DeviceType;
  idDevice: number;
  roomId: number;
  manufacturer: Manufacturer;
  status: Status;
  cost: number;
  preTimestamp: Timestamp;
  postTimestamp: Timestamp;
  powerConsumption: number; // in kWh

  // // Specific functions
  // getStatus(): number | undefined;
  // getPowerConsumption(): number | undefined;
  // setStatus(status: number): void;
  // calculateCost(hours: number): number | undefined;
}

export interface IRoom {
  name: string;
  roomId: number;
  ownerId?: string;
  isPrivate?: boolean;
}
