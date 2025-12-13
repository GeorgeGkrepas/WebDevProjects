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
    const [currentWeather, setCurrentWeather] = useState<any>()

    if (CityId !== "") {
        axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=id:${CityId}&days=3&lang=en`)
      .then(response => {
        setResults(response.data.forecast.forecastday);
      })
      .catch(error => {console.error('Error fetching forecast data:', error)})
    }

    if (CityId !== "") {
        axios.get(`http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=id:${CityId}&lang=en`)
      .then(response => {
        setCurrentWeather(response.data);
      })
      .catch(error => {console.error('Error fetching current weather data:', error)})
    }


    return (
      <>
        <h2>Forecast</h2>
        <h4>{CityName}</h4>
        {currentWeather && (
          <div className="current-weather">
            <u><strong>Current Weather</strong></u><br/>
            <img
              src={currentWeather.current.condition.icon}
              alt={currentWeather.current.condition.text}
            /><br/>
            {currentWeather.current.temp_c}°C, feels like {currentWeather.current.feelslike_c}°C
          </div>
        )}
        <div className="forecast-list">
          {results.map((result, day) => {
              return <div key={day}><ForecastDay forecastDay={result} index={day} key={day} /></div>
          })}
        </div>
      </>
    )
}
