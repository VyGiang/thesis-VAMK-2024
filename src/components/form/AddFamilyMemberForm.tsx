import React, { useState } from "react"
import { IFamilyMember, Relationship } from "@/lib/DataInterfaces"
import { addFamilyMemberToUser } from "@/lib/FirebaseCollection"
import { auth } from "@/firebase"

interface Props {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const AddFamilyMemberForm: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [relationship, setRelationship] = useState<Relationship | "">("")
  const [avatarUrl, setAvatarUrl] = useState("")
  const [birthday, setBirthday] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    switch (name) {
      case "name":
        setName(value)
        break
      case "age":
        setAge(value)
        break
      case "relationship":
        setRelationship(value as Relationship)
        break
      case "avatarUrl":
        setAvatarUrl(value)
        break
      case "birthday":
        setBirthday(value)
        break
    }
  }

  const handleFormSubmit = async () => {
    if (!name || !age || !relationship || !birthday) {
      setErrorMessage("Please fill in all required fields.")
      return
    }

    const memberData: IFamilyMember = {
      name,
      memberId: Date.now(),
      age: parseInt(age),
      relationship,
      avatarUrl,
      birthday: new Date(birthday),
    }

    const userId = auth.currentUser?.uid
    if (userId) {
      try {
        await addFamilyMemberToUser(userId, memberData.memberId, memberData)
        setIsOpen(false) // Close the form upon successful addition
        setErrorMessage("") // Clear any error messages
      } catch (error) {
        setErrorMessage("Failed to add family member. Please try again.")
        console.error("Error adding family member:", error)
      }
    } else {
      setErrorMessage("User not logged in.")
    }
  }

  // Apply the overlay style conditionally based on isOpen
  const overlayStyle = isOpen
    ? {
        opacity: 1,
        visibility: "visible" as const,
      }
    : {
        opacity: 0,
        visibility: "hidden" as const,
      }

  return (
    <div
      style={overlayStyle}
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-40 transition-opacity duration-500"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-full px-4 py-6 sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl mx-auto bg-white border-0 shadow-lg sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()} // Prevent click from closing form
      >
        <h1 className="text-2xl font-bold mb-8">Add Family Member</h1>
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}
        <form id="form" noValidate>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={name}
            onChange={handleInputChange}
            className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 focus:outline-none"
          />
          <input
            type="number"
            name="age"
            placeholder="Enter Age"
            value={age}
            onChange={handleInputChange}
            className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 focus:outline-none"
          />
          <select
            name="relationship"
            value={relationship}
            onChange={handleInputChange}
            className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 focus:outline-none"
          >
            <option value="">Select Relationship</option>
            {Object.values(Relationship).map((rel) => (
              <option key={rel} value={rel}>
                {rel}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="avatarUrl"
            placeholder="Avatar URL (optional)"
            value={avatarUrl}
            onChange={handleInputChange}
            className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 focus:outline-none"
          />
          <input
            type="date"
            name="birthday"
            value={birthday}
            onChange={handleInputChange}
            className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 focus:outline-none"
          />
          <button
            type="button"
            className="w-full px-6 py-3 mt-3 text-lg text-white rounded-lg shadow bg-pink-500 hover:bg-pink-600 focus:outline-none"
            onClick={handleFormSubmit}
          >
            Add Member
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddFamilyMemberForm
