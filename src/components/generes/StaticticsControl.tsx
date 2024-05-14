// StaticControl.tsx

// Todo: Try CRUD operations with Firebase Firestore (update, delete, read)
// For example, find how many devices which type is Bulb are in the Firestore
// Add dummy data for family member and room

// Todo: Try to make a form to add a device to Firestore
// Design the form with Tailwind CSS
// Add the form to the StaticControl component

// Todo: Implement state machine for the app. Handle auto reload and error handling

// Todo: I want to update to Firestore every 1 minute to update the status of devices
// to firestore
// Use setInterval to update the status of devices every 1 minute

// Todo: Implement the feature to add a family member to Firestore
// Add a button to add a family member to Firestore
// Add a form to add a family member to Firestore

// Todo: Implement the feature to add a room to Firestore
// Add a button to add a room to Firestore
// Add a form to add a room to Firestore

// Todo: Add error handling. Like global error handling. This will be displayed in the UI
// on top right corner?

import React, { useState } from "react"
import Navbar from "./Navbar"
import axios from "axios"
import { Card, CardBody, CardHeader } from "@material-tailwind/react"
import Chart from "react-apexcharts"
import CustomChart from "./CustomChart"
import { useData } from "@/lib/DataContext"

export interface Dataset {
  datasetId: number
  startTime: string
  endTime: string
  value: number
  value2?: number // Optional new value
}

export interface Pagination {
  total: number
  lastPage: number
  prevPage: number | null
  nextPage: number | null
  perPage: number
  currentPage: number
  from: number
  to: number
}

export interface FingridResponse {
  data: Dataset[]
  pagination: Pagination
}

const StaticControl: React.FC = () => {
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")

  const { fetchAllPages, chartData, chartOptions, chartSeries } = useData()

  const handleFetchData = () => {
    if (startTime && endTime) {
      fetchAllPages(startTime, endTime)
    }
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5 ">
        {/* Navbar */}
        <Navbar />
        <div className="flex items-center justify-end">
          <p className="text-right text-sm font-bold">Thursday, 9 May 2024</p>
        </div>

        {/* Main */}
        <div className="bg-[#F0F0F0] sm:col-span-1 md:col-span-1 lg:col-span-2 rounded-xl p-5 dark:bg-[#66676d]">
          <div className="col-span-4">
            <h1 className="lg:text-5xl sm:text-lg md:text-lg font-bold mb-3">
              Statistics
            </h1>
          </div>
          <div className="col-span-4 flex flex-col gap-4">
            <label className="text-sm font-bold">
              Start Time
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded dark:bg-[#b5b6b9]"
              />
            </label>
            <label className="text-sm font-bold">
              End Time
              <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded dark:bg-[#b5b6b9]"
              />
            </label>
            <button
              onClick={handleFetchData}
              className="bg-blue-700 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-5  dark:bg-[#2e537a]"
            >
              Fetch Data
            </button>
          </div>
          <Card placeholder="">
            <CardHeader
              placeholder=""
              className="bg-blue-200 text-xl "
            ></CardHeader>
            <CardBody placeholder="">
              <CustomChart
                chartOptions={chartOptions}
                chartSeries={chartSeries}
              />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default StaticControl
