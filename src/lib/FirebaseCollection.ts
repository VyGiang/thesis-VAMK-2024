import { db } from "@/firebase";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { IDevice } from "./DataInterfaces";

// Function to add a device to a user's 'devices' subcollection
export const addAllDevicesToUser = async (userId: string, device: IDevice) => {
  try {
    // Loop through each device and add it to the user's 'devices' subcollection
    const deviceDocRef = doc(
      db,
      "users",
      userId,
      "devices",
      `device_${device.idDevice}`
    );

    await setDoc(deviceDocRef, {
      ...device,
      preTimestamp: Timestamp.fromDate(new Date()),
      postTimestamp: Timestamp.fromDate(new Date()),
    });

    console.log(
      `Device ${device.idDevice} for user ${userId} added/updated successfully.`
    );
  } catch (error) {
    console.error(
      "Error adding/updating devices in user's subcollection: ",
      error
    );
  }
};

// Function to add a family member to a user's 'familyMembers' subcollection
export const addFamilyMemberToUser = async (
  userId: string,
  memberId: string,
  memberData: object
) => {
  const memberDocRef = doc(db, "users", userId, "familyMembers", memberId);
  await setDoc(memberDocRef, memberData);
  console.log(
    `Family member ${memberId} added to user ${userId} successfully.`
  );
};

// Function to add a room to a user's 'rooms' subcollection
export const addRoomToUser = async (
  userId: string,
  roomId: string,
  roomData: object
) => {
  const roomDocRef = doc(db, "users", userId, "rooms", roomId);
  await setDoc(roomDocRef, roomData);
  console.log(`Room ${roomId} added to user ${userId} successfully.`);
};
