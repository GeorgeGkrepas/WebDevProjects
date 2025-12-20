import axios from "axios";
import { ForecastDay } from "./ForecastDay";
import { useState, useEffect } from "react";

import "./Forecast.css"

interface ForecastProps {
  CityId: string;
  CityName: string;
}

export const Forecast = ({CityId, CityName}:ForecastProps) => {

    const [results, setResults] = useState<any[]>([])
    const [currentWeather, setCurrentWeather] = useState<any>()

    useEffect(() => {
      if (!CityId) return;

      const fetchData = async () => {
        try {
          const [forecastRes, currentRes] = await Promise.all([
            axios.get(
              `http://api.weatherapi.com/v1/forecast.json?key=${
                import.meta.env.VITE_WEATHER_API_KEY
              }&q=id:${CityId}&days=3&lang=en`
            ),
            axios.get(
              `http://api.weatherapi.com/v1/current.json?key=${
                import.meta.env.VITE_WEATHER_API_KEY
              }&q=id:${CityId}&lang=en`
            ),
          ]);

          setResults(forecastRes.data.forecast.forecastday);
          setCurrentWeather(currentRes.data);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
    };

    fetchData();
  }, [CityId]);

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
