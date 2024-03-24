import React, { useState, useEffect } from "react"

// Define types for the component props and state
type WeatherComponentProps = {
  city: string
}

type WeatherData = {
  temperature: number
  humidity: number
}

const WeatherComponent: React.FC<WeatherComponentProps> = ({ city }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null)

  useEffect(() => {
    const apiKey = "33eec1bcabd74a29792145a5971cd485" // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

    fetch(url)
      .then((response) => response.json())
      .then((data: any) => {
        // Assuming the API response format is known and consistent
        setWeather({
          temperature: data.main.temp,
          humidity: data.main.humidity,
        })
      })
      .catch((error: Error) =>
        console.error("Failed to fetch weather data", error)
      )
  }, [city])

  if (!weather) {
    return <p>Loading weather...</p>
  }

  return (
    <div className=" col-span-5 sm:col-span-12 md:col-span-12 lg:col-span-5 grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
      {/* Indoor Temperature */}
      <div className=" bg-white rounded-xl px-5 py-5 h-auto flex items-center">
        <div className="flex flex-wrap justify-between items-center">
          <div className=" flex h-20 w-20 shrink-0 grow-0 items-center justify-center rounded-full bg-white shadow-md shadow-slate-500">
            <img src="/images/temp.png" alt="temp" className=" w-5/12"></img>
          </div>
          <div className=" pl-5">
            <p className=" text-sm font-semibold">Indoor Temperature</p>
            <h3 className=" text-4xl">
              {weather.temperature} <span className=" text-xl">&#8451;</span>
            </h3>
          </div>
        </div>
      </div>
      {/* Humidity */}
      <div className=" bg-white rounded-xl px-5 py-5 h-auto flex items-center">
        <div className="flex flex-wrap justify-between items-center">
          <div className=" flex h-20 w-20 shrink-0 grow-0 items-center justify-center rounded-full bg-white shadow-md shadow-slate-500">
            <img src="/images/percent.png" alt="temp" className=" w-5/12"></img>
          </div>
          <div className=" pl-5">
            <p className=" text-sm font-semibold">Humidity </p>
            <h3 className=" text-4xl">
              {weather.humidity} <span className=" text-xl">%</span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherComponent
