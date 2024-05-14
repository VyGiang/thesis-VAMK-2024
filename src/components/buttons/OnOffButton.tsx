import React, { useState, useEffect } from "react"
import { db } from "@/firebase"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { updateDeviceStatus, updateDeviceUsage } from "@/lib/FirebaseCollection"
import { Status } from "@/lib/DataInterfaces"

const OnOffButton = ({ userId, deviceId }) => {
  const [isOn, setIsOn] = useState(false)

  useEffect(() => {
    // Fetch the initial status from Firestore
    const fetchInitialStatus = async () => {
      const deviceRef = doc(
        db,
        "users",
        userId,
        "devices",
        `device_${deviceId}`
      )
      const docSnap = await getDoc(deviceRef)
      if (docSnap.exists() && docSnap.data().status !== undefined) {
        setIsOn(docSnap.data().status === Status.ON)
      }
    }

    fetchInitialStatus()
  }, [userId, deviceId])

  const toggle = async () => {
    try {
      const newStatus = isOn ? Status.OFF : Status.ON
      await updateDeviceUsage(userId, deviceId, newStatus)
      setIsOn(!isOn)
    } catch (error) {
      console.error("Failed to update device status:", error)
      // Optionally revert the UI toggle if the Firestore update fails
      setIsOn(isOn)
    }
  }

  return (
    <button
      onClick={toggle}
      className={`lg:w-20 lg:h-10 sm:w-16 sm:h-6 flex items-center rounded-full p-1 m-2 transition-colors ${
        isOn ? "bg-blue-200" : "bg-red-200"
      }`}
    >
      {/* The toggle switch */}
      <div
        className={`lg:w-8 lg:h-8 sm:w-6 rounded-full shadow-md transform duration-300 ease-in-out ${
          isOn ? "translate-x-10 bg-blue-400" : "translate-x-0 bg-red-400"
        }`}
      >
        <span className="flex items-center justify-center h-full text-sm text-gray-700">
          {isOn ? "On" : "Off"}
        </span>
      </div>
    </button>
  )
}

export default OnOffButton
