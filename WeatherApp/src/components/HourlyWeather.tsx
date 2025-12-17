  import axios from "axios";
  import { useState } from "react";

  import "./HourlyWeather.css"
  import { ForecastDay } from "./ForecastDay";

  interface HourlyWeatherProps {
    cityId: string;
  }

  export const HourlyWeather = ({cityId}: HourlyWeatherProps) => {

    const [results, setResults] = useState<any[]>([])

    if (cityId !== "") {
          axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=id:${cityId}&days=3&lang=en`)
        .then(response => {
          setResults(response.data.forecast.forecastday[0].hour);
        })
        .catch(error => {console.error('Error fetching forecast data:', error)})
    }

    return (
      <>
          <div className="hourly-list">
            <ul>
              {results.map((result, hour) => {
                  return <li key={hour}><strong>{result.time}</strong><br/>
                    <img src={result.condition.icon} alt={result.condition.text}></img><br/>
                    {result.temp_c}°C</li>
              })}
            </ul>
          </div>
      </>
    )
  }
