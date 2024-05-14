import { useState, useEffect } from "react"
import { getAllFamilyMembersFromUser } from "@/lib/FirebaseCollection"
import { auth } from "@/firebase"

export const useBirthday = () => {
  const [highlightDays, setHighlightDays] = useState([])
  const userId = auth.currentUser?.uid ?? ""

  useEffect(() => {
    const fetchBirthdays = async () => {
      if (userId) {
        const members = await getAllFamilyMembersFromUser(userId)
        const birthdays = members.map((member) => {
          const date = new Date(member.birthday.seconds * 1000)
          return `${date.getMonth() + 1}-${date.getDate()}`
        })
        setHighlightDays(birthdays)
        console.log("Birthdays:", birthdays)
      }
    }

    fetchBirthdays()
  }, [userId])

  return highlightDays
}
