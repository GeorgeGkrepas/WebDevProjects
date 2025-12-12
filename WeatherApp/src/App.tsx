import { useState } from 'react'
import './App.css'
import { SearchBar } from './components/SearchBar'
import { SearchResultsList } from './components/SearchResultsList'
import { Forecast } from './components/Forecast'

function App() {

  const [results, setResults] = useState<any[]>([])
  const [selectedId, setSelectedId] = useState<string>("")
  const [cityName, setCityName] = useState<string>("")

  return (
    <>
      <div className="app">
        <h1>Weather App</h1>
        <div className="search-bar-container">
          <SearchBar setResults={setResults}/>
          <SearchResultsList results={results} setSelectedId={setSelectedId} setCityName={setCityName}/>
        </div>
        <div className="data-visual">
          <Forecast CityId={selectedId} CityName={cityName} />
        </div>
      </div>
    </>
  )
}

export default App
