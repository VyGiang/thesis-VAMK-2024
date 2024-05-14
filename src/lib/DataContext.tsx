import React, { createContext, useState, useContext, useCallback } from "react"
import axios from "axios"
import { set } from "firebase/database"

const DataContext = createContext({})

export const DataProvider = ({ children }) => {
  const [chartData, setChartData] = useState([])
  const [chartOptions, setChartOptions] = useState({
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
        text: "Value (c/kWh)",
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
      text: "Household electricity usage cost (c/kWh)",
      align: "center",
    },
  })
  const [chartSeries, setChartSeries] = useState([])

  const fetchAllPages = async (startTime, endTime) => {
    let currentPage = 1
    const allFetchedData = []
    const url = `http://localhost:5000/api/datasets/317/data`
    let response

    do {
      response = await axios.get(url, {
        params: {
          startTime,
          endTime,
          page: currentPage,
        },
      })
      allFetchedData.push(...response.data.data)
      currentPage += 1
    } while (response.data.data.length) // Adjust perPage condition as needed

    setChartData(allFetchedData)
    updateChartSeries(allFetchedData)
  }

  const updateChartSeries = useCallback((data) => {
    const series = [
      {
        name: "Actual Value",
        data: data.map((item) => ({
          x: new Date(item.endTime).toLocaleString(),
          y: ((item.value / 10) * 0.22).toFixed(4),
        })),
        color: "#008FFB",
      },
    ]
    setChartSeries(series)
  }, [])

  return (
    <DataContext.Provider
      value={{ chartData, chartOptions, chartSeries, fetchAllPages }}
    >
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => useContext(DataContext)
