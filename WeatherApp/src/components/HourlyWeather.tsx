  import axios from "axios";
  import { useState, useEffect } from "react";

  import "./HourlyWeather.css"

  interface HourlyWeatherProps {
    cityId: string;
  }

  export const HourlyWeather = ({cityId}: HourlyWeatherProps) => {

    const [results, setResults] = useState<any[]>([])

    useEffect(() => {
      if (!cityId) return;

      axios
        .get(
          `http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=id:${cityId}&days=3&lang=en`
        )
        .then(response => {
          const currentHour = new Date().getHours();

          const todayHours = response.data.forecast.forecastday[0].hour;
          const tomorrowHours = response.data.forecast.forecastday[1].hour;

          const next24Hours = [...todayHours, ...tomorrowHours]
            .slice(currentHour, currentHour + 24);

          setResults(next24Hours);
        })
        .catch(error => {
          console.error("Error fetching forecast data:", error);
        });
    }, [cityId]);


    return (
      <>
          <div className="hourly-list">
            <ul>
                {results.map(result => (
                  <li key={result.time}>
                    <strong>{result.time}</strong><br />
                    <img src={result.condition.icon} alt={result.condition.text} /><br/>
                    {result.temp_c}°C
                  </li>
                ))}
              </ul>
          </div>
      </>
    )
  }
