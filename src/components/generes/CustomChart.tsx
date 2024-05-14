import React from "react"
import Chart from "react-apexcharts"

const CustomChart = ({ chartOptions, chartSeries }) => {
  return (
    <Chart
      options={chartOptions}
      series={chartSeries}
      type="line"
      height={500}
    />
  )
}

export default CustomChart
