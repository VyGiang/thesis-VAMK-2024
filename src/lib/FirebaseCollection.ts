import { auth, db } from "@/firebase"
import {
  setDoc,
  doc,
  Timestamp,
  updateDoc,
  getDoc,
  getDocs,
  collection,
  deleteDoc,
} from "firebase/firestore"
import { IDevice, Status, parseDeviceStatus } from "./DataInterfaces"
import { devices, fams, rooms } from "@/data/data"

/********************************************************* ADD *********************************************************/

export const addDevicesToFirestore = async () => {
  const userId = auth.currentUser?.uid
  if (!userId) {
    console.error("No user is currently signed in.")
    return
  }
  for (const device of devices) {
    await addAllDevicesToUser(userId, device)
  }
}

export const addFamilyMembersToFirestore = async () => {
  const userId = auth.currentUser?.uid
  if (!userId) {
    console.error("No user is currently signed in.")
    return
  }
  for (const fam of fams) {
    await addFamilyMemberToUser(userId, fam.memberId, fam)
  }
}

export const addRoomsToFirestore = async () => {
  const userId = auth.currentUser?.uid
  if (!userId) {
    console.error("No user is currently signed in.")
    return
  }
  for (const room of rooms) {
    await addRoomToUser(userId, room.roomId, room)
  }
}
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
    )

    await setDoc(deviceDocRef, {
      ...device,
      preTimestamp: Timestamp.fromDate(new Date()),
      postTimestamp: Timestamp.fromDate(new Date()),
    })

    console.log(
      `Device ${device.idDevice} for user ${userId} added/updated successfully.`
    )
  } catch (error) {
    console.error(
      "Error adding/updating devices in user's subcollection: ",
      error
    )
  }
}

// Function to add a family member to a user's 'familyMembers' subcollection
export const addFamilyMemberToUser = async (
  userId: string,
  memberId: number,
  memberData: object
) => {
  const memberDocRef = doc(
    db,
    "users",
    userId,
    "familyMembers",
    memberId.toString()
  )
  await setDoc(memberDocRef, {
    ...memberData,
  })
  console.log(`Family member ${memberId} added to user ${userId} successfully.`)
}

// Function to add a room to a user's 'rooms' subcollection
export const addRoomToUser = async (
  userId: string,
  roomId: number,
  roomData: object
) => {
  const roomDocRef = doc(db, "users", userId, "rooms", roomId.toString())
  await setDoc(roomDocRef, {
    ...roomData,
  })
  console.log(`Room ${roomId} added to user ${userId} successfully.`)
}

/********************************************************* UPDATE *********************************************************/

// Function to update the status of a specific device in a user's 'devices' subcollection
export const updateDeviceStatus = async (userId: string, deviceId: number) => {
  const deviceDocRef = doc(db, "users", userId, "devices", `device_${deviceId}`)

  // Fetch the current status from Firestore
  const docSnap = await getDoc(deviceDocRef)
  if (!docSnap.exists()) {
    throw new Error(`No device found with ID ${deviceId}`)
  }

  // Determine the new status
  const currentStatus = docSnap.data().status
  const newStatus = currentStatus === Status.ON ? Status.OFF : Status.ON

  await updateDoc(deviceDocRef, {
    status: newStatus,
  })
  console.log(
    `Device status for device_${deviceId} updated to ${
      newStatus ? parseDeviceStatus(Status.ON) : parseDeviceStatus(Status.OFF)
    }.`
  )
}

/********************************************************* READ *********************************************************/

export const getAllDevicesFromUser = async (userId: string) => {
  try {
    const devicesCollectionRef = collection(db, "users", userId, "devices")
    const snapshot = await getDocs(devicesCollectionRef)
    const devicesList = snapshot.docs.map((doc) => doc.data())
    return devicesList // This returns an array of device objects
  } catch (error) {
    console.error("Error retrieving devices: ", error)
  }
}

export const getAllFamilyMembersFromUser = async (userId: string) => {
  try {
    const familyMembersCollectionRef = collection(
      db,
      "users",
      userId,
      "familyMembers"
    )
    const snapshot = await getDocs(familyMembersCollectionRef)
    const familyMembersList = snapshot.docs.map((doc) => doc.data())
    return familyMembersList // This returns an array of family member objects
  } catch (error) {
    console.error("Error retrieving family members: ", error)
  }
}

export const getAllRoomsFromUser = async (userId: string) => {
  try {
    const roomsCollectionRef = collection(db, "users", userId, "rooms")
    const snapshot = await getDocs(roomsCollectionRef)
    const roomsList = snapshot.docs.map((doc) => doc.data())
    return roomsList // This returns an array of room objects
  } catch (error) {
    console.error("Error retrieving rooms: ", error)
  }
}

/********************************************************* DELETE *********************************************************/
export const deleteDeviceFromUser = async (
  userId: string,
  deviceId: number
) => {
  try {
    const deviceDocRef = doc(
      db,
      "users",
      userId,
      "devices",
      `device_${deviceId}`
    )
    await deleteDoc(deviceDocRef)
    console.log(`Device ${deviceId} for user ${userId} deleted successfully.`)
  } catch (error) {
    console.error("Error deleting device: ", error)
  }
}

export const deleteFamilyMemberFromUser = async (
  userId: string,
  memberId: number
) => {
  try {
    const memberDocRef = doc(
      db,
      "users",
      userId,
      "familyMembers",
      memberId.toString()
    )
    await deleteDoc(memberDocRef)
    console.log(
      `Family member ${memberId} for user ${userId} deleted successfully.`
    )
  } catch (error) {
    console.error("Error deleting family member: ", error)
  }
}

export const deleteRoomFromUser = async (userId: string, roomId: number) => {
  try {
    const roomDocRef = doc(db, "users", userId, "rooms", roomId.toString())
    await deleteDoc(roomDocRef)
    console.log(`Room ${roomId} for user ${userId} deleted successfully.`)
  } catch (error) {
    console.error("Error deleting room: ", error)
  }
}
