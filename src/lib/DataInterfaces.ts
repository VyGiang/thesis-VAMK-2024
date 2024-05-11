import { Timestamp } from "firebase/firestore"

export enum Relationship {
  Parent = "Parent",
  Child = "Child",
  Spouse = "Spouse",
  Sibling = "Sibling",
  Other = "Other",
}

export enum RoomType {
  LivingRoom = "Living Room",
  Bedroom = "Bedroom",
  Kitchen = "Kitchen",
  Bathroom = "Bathroom",
}
export enum DeviceType {
  UNKNOWN = "Unknown",
  Thermostat = "Thermostat",
  Bulb = "Bulb",
  Plug = "Plug",
  AirCondition = "AC",
  Stove = "Stove",
}
export const getDeviceIcon = (type: DeviceType): string => {
  switch (type) {
    case DeviceType.Thermostat:
      return "/images/thermostat.png"
    case DeviceType.Bulb:
      return "/images/bulb.png"
    case DeviceType.Plug:
      return "/images/plug.png"
    case DeviceType.AirCondition:
      return "/images/ac.png"
    case DeviceType.Stove:
      return "/images/Stove.png"
    default:
      return "🏠"
  }
}

export const getRoomIcon = (type: RoomType): string => {
  switch (type) {
    case RoomType.LivingRoom:
      return "/images/living.png"
    case RoomType.Bedroom:
      return "/images/bed.png"
    case RoomType.Kitchen:
      return "/images/kitchen.png"
    case RoomType.Bathroom:
      return "/images/bath.png"
    default:
      return "🏠"
  }
}

export enum Status {
  OFF = "OFF",
  ON = "ON",
  BROKEN = "BROKEN",
}

export enum Manufacturer {
  Bosch = "Bosch",
  Philips = "Philips",
  Samsung = "Samsung",
  Sony = "Sony",
  LG = "LG",
  Xiaomi = "Xiaomi",
  Apple = "Apple",
  Microsoft = "Microsoft",
  TpLink = "Tp-Link",
}

export interface IUserLogin {
  name: string
  id: number
  timestamp: Timestamp
  avatar: string
}

export interface IDevice {
  name: string
  type: DeviceType
  idDevice: number
  roomId: number
  manufacturer: Manufacturer
  status: Status
  cost: number
  preTimestamp?: Timestamp
  postTimestamp?: Timestamp
  powerConsumption: number // in kWh
  temperatureSetting?: number
  currentTemperature?: number
  targetTemperature?: number
  icon: string

  // // Specific functions
  // getStatus(): number | undefined;
  // getPowerConsumption(): number | undefined;
  // setStatus(status: number): void;
  // calculateCost(hours: number): number | undefined;
}

export interface IRoom {
  name: string
  roomId: number
  ownerId?: string
  isPrivate?: boolean
  icon: string
  color: string
  type: RoomType
}

export interface IFamilyMember {
  name: string
  memberId: number
  age: number
  relationship: Relationship
  avatarUrl?: string // Optional property for a profile picture
}
