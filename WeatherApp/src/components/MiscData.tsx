import axios from 'axios'
import { useState, useEffect } from 'react'

import "./MiscData.css"

interface MiscDataProps {
    cityId: string;
  }

export const MiscData = ({cityId}: MiscDataProps) => {

    const [currentWeather, setCurrentWeather] = useState<any>()

    useEffect(() => {
      if (!cityId) return;

      axios
        .get(
          `http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=id:${cityId}&lang=en`
        )
        .then(response => {
            setCurrentWeather(response.data.current);
        })
        .catch(error => {
          console.error("Error fetching forecast data:", error);
        });
    }, [cityId]);

  return (
    <>
        {currentWeather && (
            <div className="misc-data-list">
                <ul>
                    <li>
                        <div className="title">Wind</div>
                        <div className="data">{currentWeather.wind_kph} kph {currentWeather.wind_dir}</div>
                    </li>
                    <li>
                        <div className="title">Humidity</div>
                        <div className="data">{currentWeather.humidity} %</div>
                    </li>
                    <li>
                        <div className="title">UV Index</div>
                        <div className="data">{currentWeather.uv}</div>
                        <div className="note">On a scale of 1-11</div>
                        <div className="note">while 0 means night</div>
                    </li>
                </ul>
            </div>
        )}
    </>
  )
}
