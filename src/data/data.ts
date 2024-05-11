import { Timestamp } from "firebase/firestore"
import {
  IUserLogin,
  IDevice,
  DeviceType,
  Manufacturer,
  IRoom,
  Status,
  Relationship,
  IFamilyMember,
  RoomType,
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
    type: DeviceType.Bulb, // Assuming you have a type property in IDevice
    idDevice: 101,
    roomId: 1,
    manufacturer: Manufacturer.Philips,
    status: Status.OFF,
    cost: 15,
    preTimestamp: Timestamp.fromDate(new Date("2024-03-01T08:00:00Z")),
    postTimestamp: Timestamp.fromDate(new Date("2024-03-01T10:00:00Z")),
    powerConsumption: 0.5,
    icon: "/images/bulb.png",
  }),

  new Bulb({
    name: "Smart LED Bulb 2",
    type: DeviceType.Bulb.toString(), // This line ensures your device is of the correct type
    idDevice: 102, // Changed ID for uniqueness
    roomId: 1,
    manufacturer: Manufacturer.Bosch,
    status: Status.OFF,
    cost: 15,
    preTimestamp: Timestamp.fromDate(new Date("2024-03-02T08:00:00Z")), // Adjusted date for variety
    postTimestamp: Timestamp.fromDate(new Date("2024-03-02T10:00:00Z")), // Adjusted date for variety
    powerConsumption: 0.6,
    icon: "/images/bulb.png", // Slight change for variety
  }),
  new AirCondition({
    name: "Air Condition",
    type: DeviceType.AirCondition.toString(), // This line ensures your device is of the correct type
    idDevice: 103, // Changed ID for uniqueness
    roomId: 1,
    manufacturer: Manufacturer.Bosch,
    status: Status.OFF,
    cost: 15,
    preTimestamp: Timestamp.fromDate(new Date("2024-03-02T08:00:00Z")), // Adjusted date for variety
    postTimestamp: Timestamp.fromDate(new Date("2024-03-02T10:00:00Z")), // Adjusted date for variety
    powerConsumption: 0.6, // Slight change for variety
    temperatureSetting: 24,
    icon: "/images/ac.png",
  }),

  new Stove({
    name: "Stove",
    type: DeviceType.Stove.toString(), // This line ensures your device is of the correct type
    idDevice: 104, // Changed ID for uniqueness
    roomId: 1,
    manufacturer: Manufacturer.Bosch,
    status: Status.OFF,
    cost: 15,
    preTimestamp: Timestamp.fromDate(new Date("2024-03-02T08:00:00Z")), // Adjusted date for variety
    postTimestamp: Timestamp.fromDate(new Date("2024-03-02T10:00:00Z")), // Adjusted date for variety
    powerConsumption: 0.6, // Slight change for variety
    icon: "/images/Stove.png",
  }),

  new Thermostat({
    name: "Thermostat",
    type: DeviceType.Thermostat.toString(), // This line ensures your device is of the correct type
    idDevice: 105, // Changed ID for uniqueness
    roomId: 1,
    manufacturer: Manufacturer.Bosch,
    status: Status.OFF,
    cost: 15,
    preTimestamp: Timestamp.fromDate(new Date("2024-03-02T08:00:00Z")), // Adjusted date for variety
    postTimestamp: Timestamp.fromDate(new Date("2024-03-02T10:00:00Z")), // Adjusted date for variety
    powerConsumption: 0.6, // Slight change for variety
    icon: "/images/thermostat.png",
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
  new FamilyMember({
    name: "Minh ",
    memberId: 2,
    age: 25,
    relationship: Relationship.Child,
    avatarUrl:
      "https://scontent.fqlf1-2.fna.fbcdn.net/v/t1.6435-1/67690615_2160921370703245_2038448795020165120_n.jpg?stp=dst-jpg_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=pmclHtflEVAQ7kNvgHoQ23E&_nc_ht=scontent.fqlf1-2.fna&oh=00_AYD_mhDoUw26AB548QfPvgL7h3RfNNUcCKEiEMvvz8LCEw&oe=6665AB6D",
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
    type: RoomType.LivingRoom,
  },
  {
    name: "Kitchen",
    roomId: 2,
    ownerId: "2",
    isPrivate: false,
    icon: "/images/kitchen.png",
    color: "bg-blue-100",
    type: RoomType.Kitchen,
  },
  {
    name: "Bedroom",
    roomId: 3,
    ownerId: "3",
    isPrivate: false,
    icon: "/images/bed.png",
    color: "bg-green-100",
    type: RoomType.Bedroom,
  },
  {
    name: "Bathroom",
    roomId: 4,
    ownerId: "4",
    isPrivate: false,
    icon: "/images/bath.png",
    color: "bg-yellow-100",
    type: RoomType.Bathroom,
  },
]

export const fingridData = [
  {
    datasetId: 317,
    startTime: "2024-05-03T22:00:00.000Z",
    endTime: "2024-05-03T23:00:00.000Z",
    value: 75,
  },
  {
    datasetId: 317,
    startTime: "2024-05-03T23:00:00.000Z",
    endTime: "2024-05-04T00:00:00.000Z",
    value: 75,
  },
  {
    datasetId: 317,
    startTime: "2024-05-04T00:00:00.000Z",
    endTime: "2024-05-04T01:00:00.000Z",
    value: 70,
  },
  {
    datasetId: 317,
    startTime: "2024-05-04T01:00:00.000Z",
    endTime: "2024-05-04T02:00:00.000Z",
    value: 70,
  },
  {
    datasetId: 317,
    startTime: "2024-05-04T02:00:00.000Z",
    endTime: "2024-05-04T03:00:00.000Z",
    value: 60,
  },
  {
    datasetId: 317,
    startTime: "2024-05-04T03:00:00.000Z",
    endTime: "2024-05-04T04:00:00.000Z",
    value: 60,
  },
  {
    datasetId: 317,
    startTime: "2024-05-04T04:00:00.000Z",
    endTime: "2024-05-04T05:00:00.000Z",
    value: 41.52,
  },
  {
    datasetId: 317,
    startTime: "2024-05-04T05:00:00.000Z",
    endTime: "2024-05-04T06:00:00.000Z",
    value: 47.91,
  },
  {
    datasetId: 317,
    startTime: "2024-05-04T06:00:00.000Z",
    endTime: "2024-05-04T07:00:00.000Z",
    value: 60,
  },
  {
    datasetId: 317,
    startTime: "2024-05-04T07:00:00.000Z",
    endTime: "2024-05-04T08:00:00.000Z",
    value: 60,
  },
  {
    datasetId: 317,
    startTime: "2024-05-04T08:00:00.000Z",
    endTime: "2024-05-04T09:00:00.000Z",
    value: 18,
  },
  {
    datasetId: 317,
    startTime: "2024-05-04T09:00:00.000Z",
    endTime: "2024-05-04T10:00:00.000Z",
    value: 18,
  },
  {
    datasetId: 317,
    startTime: "2024-05-04T10:00:00.000Z",
    endTime: "2024-05-04T11:00:00.000Z",
    value: 16,
  },
  {
    datasetId: 317,
    startTime: "2024-05-04T11:00:00.000Z",
    endTime: "2024-05-04T12:00:00.000Z",
    value: 18,
  },
  {
    datasetId: 317,
    startTime: "2024-05-04T12:00:00.000Z",
    endTime: "2024-05-04T13:00:00.000Z",
    value: 10.6,
  },
  {
    datasetId: 317,
    startTime: "2024-05-04T13:00:00.000Z",
    endTime: "2024-05-04T14:00:00.000Z",
    value: 15,
  },
  {
    datasetId: 317,
    startTime: "2024-05-04T14:00:00.000Z",
    endTime: "2024-05-04T15:00:00.000Z",
    value: 15,
  },
  {
    datasetId: 317,
    startTime: "2024-05-04T15:00:00.000Z",
    endTime: "2024-05-04T16:00:00.000Z",
    value: 16,
  },
  {
    datasetId: 317,
    startTime: "2024-05-04T16:00:00.000Z",
    endTime: "2024-05-04T17:00:00.000Z",
    value: 60,
  },
  {
    datasetId: 317,
    startTime: "2024-05-04T17:00:00.000Z",
    endTime: "2024-05-04T18:00:00.000Z",
    value: 16,
  },
  {
    datasetId: 317,
    startTime: "2024-05-04T18:00:00.000Z",
    endTime: "2024-05-04T19:00:00.000Z",
    value: 16,
  },
  {
    datasetId: 317,
    startTime: "2024-05-04T19:00:00.000Z",
    endTime: "2024-05-04T20:00:00.000Z",
    value: 50,
  },
  {
    datasetId: 317,
    startTime: "2024-05-04T20:00:00.000Z",
    endTime: "2024-05-04T21:00:00.000Z",
    value: 50,
  },
  {
    datasetId: 317,
    startTime: "2024-05-04T21:00:00.000Z",
    endTime: "2024-05-04T22:00:00.000Z",
    value: 50,
  },
]
