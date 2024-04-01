import React, { useState, useEffect } from "react"

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState<string>("")

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Get the current time
      const currentDateTime = new Date()

      // Use Intl.DateTimeFormat to format the time with the timezone
      const formatter = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        // timeZoneName: "short",
      })

      const formattedTimeWithZone = formatter.format(currentDateTime)

      setCurrentTime(formattedTimeWithZone)
    }, 1000) // Update every second

    return () => clearInterval(intervalId) // Cleanup interval on component unmount
  }, [])

  return (
    <div>
      <p className="text-right text-sm font-bold">Time: {currentTime}</p>
    </div>
  )
}

export default CurrentTime
