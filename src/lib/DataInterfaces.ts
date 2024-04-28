import { Timestamp } from "firebase/firestore";

export enum DeviceType {
  UNKNOWN = -1,
  Thermostat,
  Bulb,
  Plug,
  AirCondition,
  Stove,
}

export enum Relationship {
  Parent,
  Child,
  Spouse,
  Sibling,
  Other,
}

export const parseDeviceType = (type: number): string => {
  switch (type) {
    case DeviceType.Thermostat:
      return "Thermostat";
    case DeviceType.Bulb:
      return "Bulb";
    case DeviceType.Plug:
      return "Plug";
    case DeviceType.AirCondition:
      return "Air Condition";
    case DeviceType.Stove:
      return "Stove";
    default:
      return "Unknown";
  }
};

export const parseDeviceStatus = (status: Status): string => {
  switch (status) {
    case Status.ON:
      return "ON";
    case Status.OFF:
      return "OFF";
    case Status.BROKEN:
      return "BROKEN";
    default:
      return "Unknown";
  }
};

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
  type: string;
  idDevice: number;
  roomId: number;
  manufacturer: Manufacturer;
  status: Status;
  cost: number;
  preTimestamp: Timestamp;
  postTimestamp: Timestamp;
  powerConsumption: number; // in kWh
  temperatureSetting?: number;
  currentTemperature?: number;
  targetTemperature?: number;

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

export interface IFamilyMember {
  name: string;
  memberId: number;
  age: number;
  relationship: Relationship;
  avatarUrl?: string; // Optional property for a profile picture
}
