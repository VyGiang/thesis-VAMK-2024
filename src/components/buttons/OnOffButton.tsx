import React, { useState, useEffect } from "react";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { updateDeviceStatus } from "@/lib/FirebaseCollection";
import { Status } from "@/lib/DataInterfaces";

const OnOffButton = ({ userId, deviceId }) => {
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    // Fetch the initial status from Firestore
    const fetchInitialStatus = async () => {
      const deviceRef = doc(
        db,
        "users",
        userId,
        "devices",
        `device_${deviceId}`
      );
      const docSnap = await getDoc(deviceRef);
      if (docSnap.exists() && docSnap.data().status !== undefined) {
        setIsOn(docSnap.data().status === Status.OFF);
      }
    };

    fetchInitialStatus();
  }, [userId, deviceId]);

  const toggle = async () => {
    const newStatus = isOn ? Status.OFF : Status.ON;
    setIsOn(!isOn);

    try {
      // Call Firestore to update the status
      await updateDeviceStatus(userId, deviceId);
    } catch (error) {
      console.error("Failed to update device status:", error);
      // Optionally revert the UI toggle if the Firestore update fails
      setIsOn(!newStatus);
    }
  };

  return (
    <button
      onClick={toggle}
      className={`w-20 h-10 flex items-center rounded-full p-1 m-2 transition-colors ${
        isOn ? "bg-blue-200" : "bg-pink-200"
      }`}
    >
      {/* The toggle switch */}
      <div
        className={`w-8 h-8 rounded-full shadow-md transform duration-300 ease-in-out ${
          isOn ? "translate-x-10 bg-blue-400" : "translate-x-0 bg-red-400"
        }`}
      >
        <span className="flex items-center justify-center h-full text-sm text-gray-700">
          {isOn ? "On" : "Off"}
        </span>
      </div>
    </button>
  );
};

export default OnOffButton;
