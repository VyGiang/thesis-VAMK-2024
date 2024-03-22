import React, { useState } from "react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css" // default styles
import "./tailwindCalendar.css" // your custom styles

const MyCalendar = () => {
  const [value, setValue] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState("")

  const handleDayClick = (value: Date) => {
    setValue(value)
    setSelectedDay(value.toDateString()) // Store the day as a string
    console.log(selectedDay)
    console.log(value.getDate())
  }

  return (
    <div className="calendar-container">
      {/* Display the selected day */}
      {/* <div>Selected Day: {selectedDay}</div> */}
      <Calendar
        onChange={handleDayClick}
        value={value}
        calendarType="gregory"
      />
    </div>
  )
}

export default MyCalendar
