/* eslint-disable prefer-const */
import { NextResponse } from 'next/server'
import axios from 'axios'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const city = searchParams.get('city')
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')
  let url = process.env.NEXT_PUBLIC_WEATHER_API_URL || ''
  let params: Record<string, string> = {
    appid: process.env.NEXT_PUBLIC_WEATHER_API_KEY || '',
    units: 'metric'
  }

  if (city) {
    params.q = city
  } else if (lat && lon) {
    params.lat = lat
    params.lon = lon
  } else {
    return NextResponse.json(
      { error: 'city or location required' },
      { status: 400 }
    )
  }

  try {
    const response = await axios.get(url, {
      params
    })
    return NextResponse.json(response.data)
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching weather data.', error },
      { status: 500 }
    )
  }
}
