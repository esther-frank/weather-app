'use client'
import { useState } from 'react'
import axios from 'axios'
import WeatherCard from '@/components/WeatherCard'

export default function WeatherPage() {
  const [city, setCity] = useState<string>('')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [weather, setWeather] = useState<any>(null)
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError('Please enter a valid city')
      return
    }
    setLoading(true)
    setError('')
    try {
      const response = await axios.get(`/api/weather?city=${city}`)
      setWeather(response.data)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Could not fetch weather data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // new function to fetch weather based on geolocation
  const fetchWeatherByGeolocation = () => {
    // make sure it's a supported geolocation
    if (!navigator.geolocation) {
      setError("We couldn't find your location.")
      return
    }
    // get the current position: to do that, we need latitude and longitude
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords
      try {
        const response = await axios.get(
          `/api/weather?lat=${latitude}&lon=${longitude}`
        )
        setWeather(response.data)
        setLoading(true)
        setError('')
      } catch (err) {
        setError(
          'Could not fetch weather data from geolocation. Please try again.'
        )
      } finally {
        setLoading(false)
      }
    })
    // try: to get the response, if it works then set weather to response data
    // catch: handle the error with a message
    // finally: setLoading(false)
    // error if can't retrieve location
  }

  return (
    <div className="flex flex-col justify-center items-center p-8">
      <div className="flex flex-col items-center gap-2 border border-solid-red rounded-md w-3/4 md:w-1/2 lg:w-1/3 bg-white p-4">
        <input
          type="text"
          placeholder="Enter a city"
          className="border-4 border-solid-black p-2 w-full"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className="bg-blue-900 text-white rounded-md p-2 w-1/2"
          onClick={fetchWeather}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Get weather'}
        </button>
        <button
          className="bg-blue-900 text-white rounded-md p-2 w-1/2"
          onClick={fetchWeatherByGeolocation}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Get weather from my location'}
        </button>
        {error && <p>{error}</p>}
        {!error && weather && (
          <WeatherCard
            city={weather.name}
            temperature={weather.main?.temp}
            description={weather.weather?.[0]?.description}
            icon={weather.weather?.[0]?.icon}
          />
        )}
      </div>
    </div>
  )
}
