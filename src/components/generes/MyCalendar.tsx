import React, { useState } from "react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css" // Default styles
import "./tailwindCalendar.css" // Your custom styles
import { useBirthday } from "./Birthday" // Updated import to use the hook

const MyCalendar = () => {
  const [value, setValue] = useState(new Date())
  const highlightDays = useBirthday() // Using the hook correctly

  const handleDayClick = (value) => {
    setValue(value)
    console.log("Selected Day:", value.toDateString())
    console.log("Day:", value.getDate())
  }

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const monthDayString = `${date.getMonth() + 1}-${date.getDate()}`
      if (highlightDays.includes(monthDayString)) {
        console.log("Highlighting:", monthDayString)
        return `bg-yellow-200 text-green-800` // Return the class name for styling
      }
    }
    return null // Return null when no styling is needed
  }

  return (
    <div className="calendar-container">
      <Calendar
        onChange={handleDayClick}
        value={value}
        tileClassName={tileContent}
        calendarType="gregory"
      />
    </div>
  )
}

export default MyCalendar
