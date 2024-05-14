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
  addDoc,
} from "firebase/firestore"
import { IDevice, IRoom, Status, Task } from "./DataInterfaces"
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
  try {
    const roomDocRef = doc(db, "users", userId, "rooms", roomId.toString())
    await setDoc(roomDocRef, {
      ...roomData,
    })
    console.log(`Room ${roomId} added to user ${userId} successfully.`)
  } catch (error) {
    console.error("Error adding room to user: ", error)
  }
}
// Function to add a single device to a user's 'devices' subcollection
export const addDeviceToUser = async (
  userId: string,
  deviceId: number,
  deviceData: IDevice
) => {
  const deviceDocRef = doc(db, "users", userId, "devices", `device_${deviceId}`)
  await setDoc(deviceDocRef, {
    ...deviceData,
    preTimestamp: Timestamp.fromDate(new Date()),
    postTimestamp: Timestamp.fromDate(new Date()),
  })
  console.log(`Device ${deviceId} added to user ${userId} successfully.`)
}

// Updating the addTaskToFirestore to handle date correctly
export const addTaskToFirestore = async (userId: string, task: Task) => {
  const taskCollectionRef = collection(db, "users", userId, "tasks")
  const docRef = await addDoc(taskCollectionRef, {
    ...task,
    createdAt: Timestamp.now(),
  })
  const docSnap = await getDoc(docRef) // Retrieve the document snapshot
  return {
    id: docRef.id,
    ...task,
    createdAt: docSnap.get("createdAt").toDate(), // Use get method to retrieve the createdAt field
  }
}
/********************************************************* UPDATE *********************************************************/

// Function to update device usage details (timestamps and duration)
export const updateDeviceUsage = async (
  userId: string,
  deviceId: number,
  status: Status
) => {
  const deviceDocRef = doc(db, "users", userId, "devices", `device_${deviceId}`)

  // Fetch the current status and timestamps from Firestore
  const docSnap = await getDoc(deviceDocRef)
  if (!docSnap.exists()) {
    throw new Error(`No device found with ID ${deviceId}`)
  }

  const deviceData = docSnap.data()
  const currentStatus = deviceData.status

  // Prepare updates based on the current and new status
  if (status === Status.ON && currentStatus === Status.OFF) {
    // Device is being turned ON: Set preTimestamp
    await updateDoc(deviceDocRef, {
      status: Status.ON,
      preTimestamp: Timestamp.now(),
    })
    console.log(`Device ${deviceId} turned ON at ${Timestamp.now().toDate()}.`)
  } else if (status === Status.OFF && currentStatus === Status.ON) {
    // Device is being turned OFF: Calculate duration and set postTimestamp
    const preTimestamp = deviceData.preTimestamp?.toDate()
    const postTimestamp = new Date()
    const duration = preTimestamp
      ? (postTimestamp.getTime() - preTimestamp.getTime()) / 3600000
      : 0 // Convert ms to hours

    await updateDoc(deviceDocRef, {
      status: Status.OFF,
      postTimestamp: Timestamp.fromDate(postTimestamp),
      usageDuration: duration,
    })
    console.log(
      `Device ${deviceId} turned OFF. Usage duration: ${duration} hours recorded.`
    )
  }
}

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
  const newStatus = currentStatus === Status.OFF ? Status.ON : Status.OFF

  await updateDoc(deviceDocRef, {
    status: newStatus,
  })
  console.log(
    `Device status for device_${deviceId} updated to ${
      newStatus == Status.OFF ? Status.OFF : Status.ON
    }.`
  )
}

//Update room to user
export const updateRoomToUser = async (
  userId: string,
  roomId: number,
  roomData: IRoom
) => {
  try {
    const roomDocRef = doc(db, "users", userId, "rooms", roomId.toString())
    await setDoc(roomDocRef, {
      ...roomData,
      timestamp: Timestamp.now(),
    })
    console.log(`Room ${roomId} updated successfully for user ${userId}.`)
  } catch (error) {
    console.error("Error updating room:", error)
  }
}

export const updateDeviceToUser = async (
  userId: string,
  deviceId: number,
  deviceData: Partial<IDevice> // Use Partial to allow updating any subset of IDevice properties
) => {
  try {
    const deviceDocRef = doc(
      db,
      "users",
      userId,
      "devices",
      `device_${deviceId}`
    )

    // If updating timestamps manually, ensure they are converted to Firestore Timestamp if not already
    const updates = {
      ...deviceData,
      updatedTimestamp: Timestamp.now(), // Optionally set a last updated timestamp
    }

    if (deviceData.preTimestamp) {
      updates.preTimestamp = Timestamp.fromDate(
        new Date(deviceData.preTimestamp.toDate())
      ) // Convert Date back to Timestamp if needed
    }
    if (deviceData.postTimestamp) {
      updates.postTimestamp = Timestamp.fromDate(
        new Date(deviceData.postTimestamp.toDate())
      ) // Convert Date back to Timestamp if needed
    }

    await updateDoc(deviceDocRef, updates) // Perform the update
    console.log(`Device ${deviceId} updated successfully for user ${userId}.`)
  } catch (error) {
    console.error("Error updating device:", error)
  }
}

// Update Task
export const updateTaskInFirestore = async (
  userId: string,
  taskId: string,
  taskUpdate: Partial<Task>
) => {
  const taskDocRef = doc(db, "users", userId, "tasks", taskId)
  await updateDoc(taskDocRef, {
    ...taskUpdate,
    updatedAt: Timestamp.now(),
  })
  console.log(`Task ${taskId} updated for user ${userId} successfully.`)
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

// Fetch All Tasks for a User
export const getAllTasksFromFirestore = async (userId: string) => {
  const taskCollectionRef = collection(db, "users", userId, "tasks")
  const snapshot = await getDocs(taskCollectionRef)
  const tasks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  console.log(`Tasks retrieved for user ${userId}.`)
  return tasks
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

// Delete Task
export const deleteTaskFromFirestore = async (
  userId: string,
  taskId: string
) => {
  const taskDocRef = doc(db, "users", userId, "tasks", taskId)
  await deleteDoc(taskDocRef)
  console.log(`Task ${taskId} deleted for user ${userId} successfully.`)
}

// Calculate total household cost
export const calculateHouseholdCost = async (userId: string) => {
  const roomsRef = collection(db, "users", userId, "rooms")
  const snapshot = await getDocs(roomsRef)
  const totalCost = snapshot.docs.reduce((total, doc) => {
    const weeklyCosts = doc.data().weeklyCosts || []
    return total + weeklyCosts.reduce((sum, cost) => sum + cost, 0)
  }, 0)

  console.log(`Total household cost: ${totalCost}`)
  return totalCost
}
