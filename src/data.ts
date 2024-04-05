import { Timestamp } from "firebase/firestore";
import {
  IUserLogin,
  IDevice,
  DeviceType,
  Manufacturer,
  IRoom,
  Status,
} from "./lib/DataInterfaces";
import { Bulb } from "./devices/Bulb";

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
];

// Dummy Devices
export const devices: IDevice[] = [
  new Bulb({
    name: "Smart LED Bulb",
    type: DeviceType.Bulb, // Assuming you have a type property in IDevice
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
    type: DeviceType.Bulb, // This line ensures your device is of the correct type
    idDevice: 102, // Changed ID for uniqueness
    roomId: 1,
    manufacturer: Manufacturer.Bosch,
    status: Status.OFF,
    cost: 15,
    preTimestamp: Timestamp.fromDate(new Date("2024-03-02T08:00:00Z")), // Adjusted date for variety
    postTimestamp: Timestamp.fromDate(new Date("2024-03-02T10:00:00Z")), // Adjusted date for variety
    powerConsumption: 0.6, // Slight change for variety
  }),
  new Bulb({
    name: "Smart LED Bulb 2",
    type: DeviceType.Bulb, // This line ensures your device is of the correct type
    idDevice: 103, // Changed ID for uniqueness
    roomId: 1,
    manufacturer: Manufacturer.Bosch,
    status: Status.OFF,
    cost: 15,
    preTimestamp: Timestamp.fromDate(new Date("2024-03-02T08:00:00Z")), // Adjusted date for variety
    postTimestamp: Timestamp.fromDate(new Date("2024-03-02T10:00:00Z")), // Adjusted date for variety
    powerConsumption: 0.6, // Slight change for variety
  }),
];

// Dummy Rooms
export const rooms: IRoom[] = [
  {
    name: "Living Room",
    roomId: 1,
    ownerId: "1",
    isPrivate: false,
  },
  {
    name: "Kitchen",
    roomId: 2,
    ownerId: "2",
    isPrivate: false,
  },
];
