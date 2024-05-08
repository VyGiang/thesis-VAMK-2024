import { Timestamp } from "firebase/firestore"
import {
  IUserLogin,
  IDevice,
  DeviceType,
  Manufacturer,
  IRoom,
  Status,
  parseDeviceType,
  Relationship,
  IFamilyMember,
} from "../lib/DataInterfaces"
import { Bulb } from "./devices/Bulb"
import { AirCondition } from "./devices/AC"
import { FamilyMember } from "./family/FamilyMember"
import { Stove } from "./devices/Stove"
import { Thermostat } from "./devices/Thermostat"

// Dummy Users
export const users: IUserLogin[] = [
  {
    name: "Alex Doe",
    id: 1,
    timestamp: Timestamp.now(),
    avatar: "https://example.com/avatar1.jpg",
  },
  {
    name: "Jamie Smith",
    id: 2,
    timestamp: Timestamp.now(),
    avatar: "https://example.com/avatar2.jpg",
  },
]

// Dummy Devices
export const devices: IDevice[] = [
  new Bulb({
    name: "Smart LED Bulb",
    type: parseDeviceType(DeviceType.Bulb), // Assuming you have a type property in IDevice
    idDevice: 101,
    roomId: 1,
    manufacturer: Manufacturer.Philips,
    status: Status.OFF,
    cost: 15,
    preTimestamp: Timestamp.fromDate(new Date("2024-03-01T08:00:00Z")),
    postTimestamp: Timestamp.fromDate(new Date("2024-03-01T10:00:00Z")),
    powerConsumption: 0.5,
  }),

  new Bulb({
    name: "Smart LED Bulb 2",
    type: parseDeviceType(DeviceType.Bulb), // This line ensures your device is of the correct type
    idDevice: 102, // Changed ID for uniqueness
    roomId: 1,
    manufacturer: Manufacturer.Bosch,
    status: Status.OFF,
    cost: 15,
    preTimestamp: Timestamp.fromDate(new Date("2024-03-02T08:00:00Z")), // Adjusted date for variety
    postTimestamp: Timestamp.fromDate(new Date("2024-03-02T10:00:00Z")), // Adjusted date for variety
    powerConsumption: 0.6, // Slight change for variety
  }),
  new AirCondition({
    name: "Air Condition",
    type: parseDeviceType(DeviceType.Bulb), // This line ensures your device is of the correct type
    idDevice: 103, // Changed ID for uniqueness
    roomId: 1,
    manufacturer: Manufacturer.Bosch,
    status: Status.OFF,
    cost: 15,
    preTimestamp: Timestamp.fromDate(new Date("2024-03-02T08:00:00Z")), // Adjusted date for variety
    postTimestamp: Timestamp.fromDate(new Date("2024-03-02T10:00:00Z")), // Adjusted date for variety
    powerConsumption: 0.6, // Slight change for variety
    temperatureSetting: 24,
  }),

  new Stove({
    name: "Stove",
    type: parseDeviceType(DeviceType.Bulb), // This line ensures your device is of the correct type
    idDevice: 104, // Changed ID for uniqueness
    roomId: 1,
    manufacturer: Manufacturer.Bosch,
    status: Status.OFF,
    cost: 15,
    preTimestamp: Timestamp.fromDate(new Date("2024-03-02T08:00:00Z")), // Adjusted date for variety
    postTimestamp: Timestamp.fromDate(new Date("2024-03-02T10:00:00Z")), // Adjusted date for variety
    powerConsumption: 0.6, // Slight change for variety
  }),

  new Thermostat({
    name: "Thermostat",
    type: parseDeviceType(DeviceType.Bulb), // This line ensures your device is of the correct type
    idDevice: 105, // Changed ID for uniqueness
    roomId: 1,
    manufacturer: Manufacturer.Bosch,
    status: Status.OFF,
    cost: 15,
    preTimestamp: Timestamp.fromDate(new Date("2024-03-02T08:00:00Z")), // Adjusted date for variety
    postTimestamp: Timestamp.fromDate(new Date("2024-03-02T10:00:00Z")), // Adjusted date for variety
    powerConsumption: 0.6, // Slight change for variety
  }),
]

// Family Members
export const fams: IFamilyMember[] = [
  new FamilyMember({
    name: "John Doe",
    memberId: 1,
    age: 35,
    relationship: Relationship.Parent,
    avatarUrl: "https://example.com/avatar/john.jpg",
  }),
]

// Dummy Rooms
export const rooms: IRoom[] = [
  {
    name: "Living Room",
    roomId: 1,
    ownerId: "1",
    isPrivate: false,
    icon: "/images/living.png",
    color: "bg-pink-100",
  },
  {
    name: "Kitchen",
    roomId: 2,
    ownerId: "2",
    isPrivate: false,
    icon: "/images/kitchen.png",
    color: "bg-blue-100",
  },
  {
    name: "Bedroom",
    roomId: 3,
    ownerId: "3",
    isPrivate: false,
    icon: "/images/bed.png",
    color: "bg-green-100",
  },
  {
    name: "Bathroom",
    roomId: 4,
    ownerId: "4",
    isPrivate: false,
    icon: "/images/bath.png",
    color: "bg-yellow-100",
  },
]
