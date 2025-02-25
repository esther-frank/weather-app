import Image from 'next/image'

interface WeatherCardProps {
  city: string
  temperature: number
  description: string
  icon: string
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  city,
  temperature,
  description,
  icon
}) => {
  const capitalise = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
  return (
    <div>
      <div>
        <div>
          <h2>{city}</h2>
          <p>{temperature}°C</p>
        </div>
        <Image
          src={`http://openweathermap.org/img/w/${icon}.png`}
          width={100}
          height={100}
          alt="weather icon"
        />
      </div>
      <p>{capitalise(description)}</p>
    </div>
  )
}

export default WeatherCard
