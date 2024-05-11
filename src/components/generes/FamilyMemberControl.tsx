// FamilyMemberControl.tsx
import React, { useEffect, useState } from "react"
import Navbar from "./Navbar"
import CurrentTime from "./CurrentTime"
import { useNavigate } from "react-router-dom"
import { IoReturnDownBack } from "react-icons/io5"
import { FaPen, FaPlus, FaTrash } from "react-icons/fa"
import { auth } from "@/firebase"
import { IFamilyMember } from "@/lib/DataInterfaces"
import {
  getAllFamilyMembersFromUser,
  deleteFamilyMemberFromUser,
  addFamilyMembersToFirestore,
} from "@/lib/FirebaseCollection"

const FamilyMemberControl = () => {
  const navigate = useNavigate()
  const [familyMembers, setFamilyMembers] = useState<IFamilyMember[]>([])
  const userId = auth.currentUser?.uid ?? ""

  const sortFamilyMembersByName = (members: IFamilyMember[]) => {
    return members.sort((a, b) => a.name.localeCompare(b.name))
  }

  const fetchFamilyMembers = async () => {
    if (userId) {
      const members = await getAllFamilyMembersFromUser(userId)
      const sortedMembers = sortFamilyMembersByName(members as IFamilyMember[])
      setFamilyMembers(sortedMembers)
    }
  }

  const handleDelete = async (memberId: number) => {
    if (window.confirm("Are you sure you want to delete this family member?")) {
      await deleteFamilyMemberFromUser(userId, memberId)
      setFamilyMembers((prevMembers) =>
        prevMembers.filter((member) => member.memberId !== memberId)
      )
    }
  }

  const navigateToSetting = () => {
    navigate("/setting")
  }

  const handleAddMember = async () => {
    await addFamilyMembersToFirestore()
    fetchFamilyMembers()
  }

  useEffect(() => {
    fetchFamilyMembers()
  }, [userId])

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Navbar */}
        <Navbar />
        <div className="flex items-center justify-end transform duration-500 hover:scale-105">
          <CurrentTime />
        </div>

        {/* Main */}
        <div className="bg-[#F0F0F0] sm:col-span-1 md:col-span-1 lg:col-span-2 rounded-xl p-10 dark:bg-[#66676d]">
          <div className="flex justify-between mb-5">
            <h1 className="lg:text-5xl sm:text-xl md:text-xl font-bold">
              Family Member Detail
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

          {/* Family Member Details */}
          {familyMembers.map((member) => (
            <div
              key={member.memberId}
              className="flex items-center pb-4 border-b mb-5"
            >
              {/* Avatar */}
              <div className="lg:w-24 lg:h-24 md:w-24 md:h-24 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-white">
                <div className="flex items-center justify-center h-full">
                  <img
                    src={member.avatarUrl || "/images/member.png"}
                    className="lg:w-full sm:w-10/12 md:w-10/12"
                    alt="Family Member"
                  />
                </div>
              </div>
              {/* Member Info */}
              <div className="ml-5">
                <p>Name: {member.name}</p>
                <p>Age: {member.age}</p>
                <p>Relationship: {member.relationship}</p>
              </div>
              {/* Edit & Delete Icons */}
              <div className="flex ml-auto space-x-3">
                <FaPen className="text-xl cursor-pointer" />
                <FaTrash
                  className="text-xl cursor-pointer"
                  onClick={() => handleDelete(member.memberId)}
                />
              </div>
            </div>
          ))}

          {/* Add Member Button */}
          <div className="flex justify-center mt-5 sm:col-span-1 md:col-span-1 lg:col-span-2">
            <button
              className="flex items-center bg-blue-200 p-3 rounded-full text-blue-700 font-bold shadow-lg hover:scale-105 transition-transform"
              onClick={handleAddMember}
            >
              <FaPlus className="mr-2" />
              Add Member
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FamilyMemberControl
