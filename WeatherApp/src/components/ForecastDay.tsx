import "./ForecastDay.css"

interface SearchResultProps {
  forecastDay: any;
  index: number;
  degreeUnit: string;
}

export const ForecastDay = ({forecastDay, index, degreeUnit}:SearchResultProps) => {
  
    const getDayLabel = (index: number) => {
      if (index === 0) return "Today";
      if (index === 1) return "Tomorrow";
      const options: Intl.DateTimeFormatOptions = { weekday: "long" };
      return new Date(forecastDay.date).toLocaleDateString(undefined, options);
    };

    return (
      <div className="forecast-day">
        <strong>{getDayLabel(index)}</strong><br/>
        <img src={forecastDay.day.condition.icon} alt={forecastDay.day.condition.text}></img><br/>
        {degreeUnit === "celsius" && (<>
          {forecastDay.day.mintemp_c}°C - {forecastDay.day.maxtemp_c}°C
        </>)}
        {degreeUnit === "fahrenheit" && (<>
          {forecastDay.day.mintemp_f}°F - {forecastDay.day.maxtemp_f}°F
        </>)}
      </div>
    )
}
