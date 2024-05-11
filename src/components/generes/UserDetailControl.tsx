// UserDetailControl.tsx
import React, { useEffect, useState } from "react"
import Navbar from "./Navbar"
import CurrentTime from "./CurrentTime"
import { IoReturnDownBack } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import { auth, db } from "@/firebase"
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { updateProfile, updateEmail, updatePassword } from "firebase/auth"
import { IUserLogin } from "@/lib/DataInterfaces"
import Reauthentication from "./Reauthentication"

const UserDetailControl = () => {
  const navigate = useNavigate()
  const userId = auth.currentUser?.uid ?? ""
  const navigateToSetting = () => navigate("/setting")

  const [avatar, setAvatar] = useState("/images/avatar.png")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [isReauthOpen, setIsReauthOpen] = useState(false)
  const [needsUpdate, setNeedsUpdate] = useState(false)

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        const userDocRef = doc(db, "users", userId)
        const userDoc = await getDoc(userDocRef)
        if (userDoc.exists()) {
          const userData = userDoc.data() as IUserLogin
          setName(userData.name)
          setAvatar(userData.avatar)
          setEmail(auth.currentUser?.email || "")
        } else {
          // Create user document if it doesn't exist
          await setDoc(userDocRef, {
            name: auth.currentUser?.displayName || "Unknown User",
            avatar: "/images/avatar.png",
            email: auth.currentUser?.email || "",
            id: userId,
          })
          setName(auth.currentUser?.displayName || "Unknown User")
          setAvatar("/images/avatar.png")
          setEmail(auth.currentUser?.email || "")
        }
      }
    }
    fetchUserData()
  }, [userId])

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setAvatar(reader.result as string)
      }
      reader.readAsDataURL(file) // Converts the image file to a Base64 string
    }
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      if (auth.currentUser) {
        const userDocRef = doc(db, "users", userId)
        if (name) {
          await updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: avatar,
          })
          await updateDoc(userDocRef, { name, avatar })
        }
        if (email) {
          await updateEmail(auth.currentUser, email)
        }
        if (newPassword === confirmPassword && newPassword) {
          await updatePassword(auth.currentUser, newPassword)
        }
        // Clear input fields after saving
        setNewPassword("")
        setConfirmPassword("")
      }
    } catch (error: any) {
      if (error.code === "auth/requires-recent-login") {
        setIsReauthOpen(true)
        setNeedsUpdate(true)
      } else {
        console.error("Error updating user details:", error)
      }
    } finally {
      setLoading(false)
    }
  }

  const onReauthenticate = () => {
    setIsReauthOpen(false)
    if (needsUpdate) {
      handleSave()
    }
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Navbar */}
        <Navbar />
        <div className="flex items-center justify-end transform duration-500 hover:scale-105">
          <CurrentTime />
        </div>

        {/* main */}
        <div className="bg-[#F0F0F0] sm:col-span-1 md:col-span-1 lg:col-span-2 rounded-xl p-10 dark:bg-[#66676d]">
          <div className="flex justify-between mb-5">
            <h1 className="lg:text-5xl sm:text-xl md:text-xl font-bold">
              User Detail
            </h1>
            <button
              onClick={navigateToSetting}
              className="flex items-center text-xl font-semibold transition duration-200"
            >
              <IoReturnDownBack
                className="mr-2 hidden sm:block lg:hidden"
                size={20}
              />
              <IoReturnDownBack className="mr-2 hidden lg:block" size={40} />
              <span className="lg:text-2xl sm:text-lg md:text-lg">Back</span>
            </button>
          </div>

          {/* User Detail */}
          <div className="flex flex-col pb-4 border-b">
            {/* Avatar upload and preview */}
            <div className="lg:w-32 lg:h-32 md:w-24 md:h-24 sm:w-20 sm:h-20 rounded-full mt-4 mb-3 overflow-hidden bg-white">
              <div className="flex items-center justify-center h-full">
                <img
                  src={avatar}
                  className="lg:w-12/12 sm:w-10/12 md:w-10/12"
                  alt="Avatar"
                />
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="avatarInput"
              onChange={handleAvatarChange}
            />
            <label
              htmlFor="avatarInput"
              className="cursor-pointer text-blue-600 hover:text-blue-800 transition duration-200 dark:text-[#ee6464]"
            >
              Change Avatar
            </label>
            <h2 className="text-lg font-semibold">Welcome, {name}!</h2>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className="block font-semibold mb-2">Change name</label>
              <input
                type="text"
                className="lg:w-1/2 md:w-1/2 sm:w-3/2 p-2 border rounded-lg"
                placeholder="Enter new name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Change password
              </label>
              <div className="mb-2">
                <input
                  type="password"
                  className="lg:w-1/2 md:w-1/2 sm:w-3/2 p-2 border rounded-lg"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="password"
                  className="lg/w-1/2 md/w-1/2 sm/w-3/2 p-2 border rounded-lg"
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-2">Change email</label>
              <input
                type="email"
                className="lg:w-1/2 md:w-1/2 sm:w-3/2 p-2 border rounded-lg"
                placeholder="Enter new email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              className={`bg-blue-400 text-white lg:w-1/6 sm:w-1/4 py-2 px-4 rounded-lg mt-4 mb-20 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleSave}
              disabled={loading}
            >
              Save
            </button>
          </div>
        </div>
      </div>
      <Reauthentication
        isOpen={isReauthOpen}
        setIsOpen={setIsReauthOpen}
        onReauthenticate={onReauthenticate}
      />
    </div>
  )
}

export default UserDetailControl
