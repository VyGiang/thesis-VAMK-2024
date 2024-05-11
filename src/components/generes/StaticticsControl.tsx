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

import React, { useEffect, useState } from "react"
import Navbar from "./Navbar"
import axios from "axios"
// import FileSaver from "file-saver"
import { fingridData } from "@/data/data.ts"
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react"
import Chart from "react-apexcharts"
import { BarChart } from "lucide-react"

interface Dataset {
  datasetId: number
  startTime: string
  endTime: string
  value: number
  value2?: number // Optional new value
}

interface Pagination {
  total: number
  lastPage: number
  prevPage: number | null
  nextPage: number | null
  perPage: number
  currentPage: number
  from: number
  to: number
}

interface FingridResponse {
  data: Dataset[]
  pagination: Pagination
}

const StaticControl: React.FC = () => {
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [page, setPage] = useState(1)
  const [dataset, setDataset] = useState<Dataset[]>([])
  const [allData, setAllData] = useState<Dataset[]>([])
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const perPage = 10 // Default perPage is 10
  const [enhancedData, setEnhancedData] = useState<Dataset[]>([])

  const saveDataAsJSON = (data: Dataset[]) => {
    // const jsonBlob = new Blob([JSON.stringify(data, null, 2)], {
    //   type: "application/json",
    // })
    // FileSaver.saveAs(jsonBlob, "all_dataset_data.json")
  }

  const fetchDataPage = async (
    currentPage: number
  ): Promise<FingridResponse> => {
    const url = `http://localhost:5000/api/datasets/317/data`

    const response = await axios.get<FingridResponse>(url, {
      params: {
        startTime,
        endTime,
        page: currentPage,
      },
    })

    return response.data
  }

  const fetchData = async (currentPage: number) => {
    const response = await fetchDataPage(currentPage)
    setDataset(response.data)
    setPagination(response.pagination)
    setPage(currentPage)
  }

  const fetchAllPages = async () => {
    let currentPage = 1
    const allFetchedData: Dataset[] = []
    let response: FingridResponse

    do {
      response = await fetchDataPage(currentPage)
      allFetchedData.push(...response.data)
      currentPage += 1
    } while (response.data.length === perPage) // Stop when the last page is reached

    setAllData(allFetchedData)
    console.log(allFetchedData)
    saveDataAsJSON(allFetchedData)
    fetchData(1) // Display the first page
  }

  const handlePrevPage = () => {
    if (pagination && page > 1) {
      const prevPage = page - 1
      fetchData(prevPage)
    }
  }

  const handleNextPage = () => {
    if (pagination && dataset.length === perPage) {
      const nextPage = page + 1
      fetchData(nextPage)
    }
  }

  const mergeDataWithValues = (): Dataset[] => {
    const newValues2 = [80, 82, 70]

    if (fingridData.length !== newValues2.length) {
      throw new Error(
        "The length of fingridData and newValues2 must be the same"
      )
    }

    return fingridData.map((item, index) => ({
      ...item,
      value2: newValues2[index], // Adds a new `value2` property to each item
    }))
  }

  useEffect(() => {
    try {
      const updatedData = mergeDataWithValues()
      setEnhancedData(updatedData)
    } catch (error: any) {
      // Typing the error as 'any' is a quick solution; better type definition might be needed based on usage.
      console.error(error.message)
    }
  }, [])

  const chartSeries = [
    {
      name: "Actual Value",
      data: enhancedData.map((item) => ({
        x: new Date(item.endTime).toLocaleString(),
        y: item.value,
      })),
      color: "#008FFB", // Blue for actual values
    },
    {
      name: "Forecast Value",
      data: enhancedData.map((item) => ({
        x: new Date(item.endTime).toLocaleString(),
        y: item.value2,
      })),
      color: "#00E396", // Green for forecast values
    },
  ]
  const chartOptions = {
    chart: {
      type: "line",
      height: 500,
      toolbar: {
        show: true,
      },
    },
    colors: ["#008FFB", "#00E396"],
    stroke: {
      curve: "smooth",
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 5,
    },
    xaxis: {
      type: "datetime",
      title: {
        text: "Time",
      },
    },
    yaxis: {
      title: {
        text: "Value (kWh)",
      },
    },
    tooltip: {
      x: {
        format: "dd MMM yyyy HH:mm",
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "center",
      floating: false,
      fontSize: "14px",
      fontFamily: "Helvetica, Arial",
      fontWeight: 400,
      offsetX: 0,
      offsetY: 0,
    },
    title: {
      text: "Energy Consumption Over Time",
      align: "left",
    },
  }
  useEffect(() => {
    try {
      const updatedData = mergeDataWithValues()
      setEnhancedData(updatedData)
      console.log("Enhanced Data:", updatedData) // Log the updated data to the console
    } catch (error) {
      console.error("Error updating data:", error)
    }
  }, [])

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Navbar */}
        <Navbar />
        <div className="flex items-center justify-end">
          <p className="text-right text-sm font-bold">Thursday, 9 May 2024</p>
        </div>

        {/* Main */}
        <div className="bg-[#F0F0F0] sm:col-span-1 md:col-span-1 lg:col-span-2 rounded-xl p-5">
          <div className="col-span-4">
            <h1 className="lg:text-5xl sm:text-lg md:text-lg font-bold mb-3">
              Statictics
            </h1>
          </div>
          <div className="col-span-4 flex flex-col gap-4">
            <label className="text-sm font-bold">
              Start Time
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </label>
            <label className="text-sm font-bold">
              End Time
              <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </label>
            <button
              onClick={fetchAllPages}
              className="bg-blue-700 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-5  dark:bg-[#2e537a]"
            >
              Fetch All Pages
            </button>
          </div>
          <Card placeholder="">
            <CardHeader
              placeholder=""
              className="bg-blue-200 text-xl "
            ></CardHeader>
            <CardBody placeholder="">
              <Chart
                options={chartOptions}
                series={chartSeries}
                type="line"
                height={500}
              />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default StaticControl
