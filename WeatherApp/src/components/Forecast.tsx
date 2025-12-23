import axios from "axios";
import { ForecastDay } from "./ForecastDay";
import { useState, useEffect } from "react";

import "./Forecast.css"

interface ForecastProps {
  cityId: string;
  cityName: string;
  degreeUnit: string;
}

export const Forecast = ({cityId, cityName, degreeUnit}:ForecastProps) => {

    const [results, setResults] = useState<any[]>([])
    const [currentWeather, setCurrentWeather] = useState<any>()

    useEffect(() => {
      if (!cityId) return;

      const fetchData = async () => {
        try {
          const [forecastRes, currentRes] = await Promise.all([
            axios.get(
              `http://api.weatherapi.com/v1/forecast.json?key=${
                import.meta.env.VITE_WEATHER_API_KEY
              }&q=id:${cityId}&days=3&lang=en`
            ),
            axios.get(
              `http://api.weatherapi.com/v1/current.json?key=${
                import.meta.env.VITE_WEATHER_API_KEY
              }&q=id:${cityId}&lang=en`
            ),
          ]);

          setResults(forecastRes.data.forecast.forecastday);
          setCurrentWeather(currentRes.data);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
    };

    fetchData();
  }, [cityId]);

    return (
      <>
        <h2>Forecast</h2>
        <h4>{cityName}</h4>
        {currentWeather && (
          <div className="current-weather">
            <u><strong>Current Weather</strong></u><br/>
            <img
              src={currentWeather.current.condition.icon}
              alt={currentWeather.current.condition.text}
            /><br/>
            {degreeUnit === "celsius" && (<>
              {currentWeather.current.temp_c}°C, feels like {currentWeather.current.feelslike_c}°C
            </>)}
            {degreeUnit === "fahrenheit" && (<>
              {currentWeather.current.temp_f}°F, feels like {currentWeather.current.feelslike_f}°F
            </>)}
          </div>
        )}
        <div className="forecast-list">
          {results.map((result, day) => {
              return <div key={day}><ForecastDay forecastDay={result} index={day} degreeUnit={degreeUnit} key={day} /></div>
          })}
        </div>
      </>
    )
}
