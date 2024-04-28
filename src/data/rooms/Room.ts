import { IRoom } from "@/lib/DataInterfaces";

export class Room implements IRoom {
  name: string;
  roomId: number;
  ownerId?: string;
  isPrivate: boolean;

  constructor(room: IRoom) {
    this.name = room.name;
    this.roomId = room.roomId;
    this.ownerId = room.ownerId;
    this.isPrivate = room.isPrivate ?? false; // Default to public if not specified
  }

  // Example method to describe the room
  describe() {
    const privacy = this.isPrivate ? "private" : "public";
    console.log(`The ${this.name} is a ${privacy} room.`);
  }
}
