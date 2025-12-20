import { useState } from 'react'
import './App.css'
import { SearchBar } from './components/SearchBar'
import { SearchResultsList } from './components/SearchResultsList'
import { Forecast } from './components/Forecast'
import { HourlyWeather } from './components/HourlyWeather'
import { MiscData } from './components/MiscData'

function App() {

  const [results, setResults] = useState<any[]>([])
  const [selectedId, setSelectedId] = useState<string>("")
  const [cityName, setCityName] = useState<string>("")

  return (
    <>
      <div className="app">
        <div className="misc-data">
          <h2>Misc Data</h2>
          <MiscData cityId={selectedId}/>
        </div>
        <div className="middle-section">
          <h1>Weather App</h1>
          <div className="search-bar-container">
            <SearchBar setResults={setResults}/>
            <SearchResultsList results={results} setSelectedId={setSelectedId} setCityName={setCityName}/>
          </div>
          <div className="data-visual">
            <Forecast CityId={selectedId} CityName={cityName} />
          </div>
        </div>
        <div className="hourly-weather">
          <h2>Next 24 hrs</h2>
          <HourlyWeather cityId={selectedId}/>
        </div>
      </div>
    </>
  )
}

export default App
