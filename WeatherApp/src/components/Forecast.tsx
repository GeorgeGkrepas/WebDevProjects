import axios from "axios";
import { ForecastDay } from "./ForecastDay";
import { useState } from "react";

import "./Forecast.css"

interface ForecastProps {
  CityId: string;
  CityName: string;
}

export const Forecast = ({CityId, CityName}:ForecastProps) => {

    const [results, setResults] = useState<any[]>([])

    if (CityId !== "") {
        axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=id:${CityId}&days=3&lang=en`)
      .then(response => {
        setResults(response.data.forecast.forecastday);
      })
      .catch(error => {console.error('Error fetching forecast data:', error)})
    }

    return (
      <>
        <h2>Forecast</h2>
        <h4>{CityName}</h4>
        <div className="forecast-list">
          {results.map((result, day) => {
              return <div key={day}><ForecastDay forecastDay={result} index={day} key={day} /></div>
          })}
        </div>
      </>
    )
}
