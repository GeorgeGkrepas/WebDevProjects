import {useState} from 'react'
import {FaSearch} from 'react-icons/fa'
import axios from 'axios'

import './SearchBar.css'

interface SearchBarProps {
  setResults: (results: any[]) => void;
}

export const SearchBar = ({setResults}:SearchBarProps) => {
  
  const [input, setInput] = useState("")
  
  const fetchData = (value: any) => {
    if (value !== "") {
      axios.get(`http://api.weatherapi.com/v1/search.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${value}&lang=en`)
      .then(response => {
        const results = response.data.filter((location: any) => {
          return value && location.name.toLowerCase().includes(value.toLowerCase())
        })
        setResults(results)
      })
      .catch(error => {console.error('Error fetching search data:', error)})
    }
  }

  const handleChange = (value: string) => {
    setInput(value)
    fetchData(value)
  }

  return (
    <div className="input-wrapper">
        <FaSearch id="search-icon" />
        <input placeholder="Type to search..." value={input} onChange={(e) => handleChange(e.target.value)}/>
    </div>
  )
}
