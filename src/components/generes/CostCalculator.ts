import axios from "axios"

// Function to fetch cost data for a given time range
const fetchHourlyCosts = async (startTime, endTime) => {
  const url = `http://localhost:5000/api/datasets/317/data`
  try {
    const response = await axios.get(url, {
      params: { startTime, endTime },
    })
    return response.data.map((entry) => ({
      startTime: entry.startTime,
      endTime: entry.endTime,
      costPerKWh: entry.value / 1000, // Convert MWh to kWh
    }))
  } catch (error) {
    console.error("Error fetching hourly costs:", error)
    return []
  }
}

// Main function to calculate total cost for all devices
export const calculateTotalCost = async (devices) => {
  if (devices.length === 0) return 0

  // Determine the broadest time range to fetch cost data
  const earliestStart = new Date(
    Math.min(
      ...devices.map((device) => new Date(device.preTimestamp).getTime())
    )
  )
  const latestEnd = new Date(
    Math.max(
      ...devices.map((device) => new Date(device.postTimestamp).getTime())
    )
  )

  const hourlyCosts = await fetchHourlyCosts(
    earliestStart.toISOString(),
    latestEnd.toISOString()
  )
  let totalCost = 0

  devices.forEach((device) => {
    if (device.usageDuration && device.powerConsumption) {
      totalCost += calculateDeviceCost(device, hourlyCosts)
    }
  })

  return totalCost
}

// Calculate cost for a single device
const calculateDeviceCost = (device, hourlyCosts) => {
  let cost = 0
  hourlyCosts.forEach((rate) => {
    if (
      overlaps(
        device.preTimestamp,
        device.postTimestamp,
        rate.startTime,
        rate.endTime
      )
    ) {
      const durationHours = getOverlapDuration(
        device.preTimestamp,
        device.postTimestamp,
        rate.startTime,
        rate.endTime
      )
      cost += durationHours * device.powerConsumption * rate.costPerKWh
    }
  })
  return cost
}

// Utility to check overlaps and calculate duration
const overlaps = (start1, end1, start2, end2) => {
  return new Date(start1) < new Date(end2) && new Date(end1) > new Date(start2)
}

const getOverlapDuration = (start1, end1, start2, end2) => {
  const start = new Date(
    Math.max(new Date(start1).getTime(), new Date(start2).getTime())
  )
  const end = new Date(
    Math.min(new Date(end1).getTime(), new Date(end2).getTime())
  )
  return (end - start) / (1000 * 60 * 60) // Convert milliseconds to hours
}
