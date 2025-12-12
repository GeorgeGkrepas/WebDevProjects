import './SearchResult.css'

interface SearchResultProps {
  result: any;
  setSelectedId: (id: string) => void;
  setCityName: (name: string) => void;
}

export const SearchResult = ({result, setSelectedId, setCityName}:SearchResultProps) => {
  return (
    <div className="search-result" onClick={(e) => {setSelectedId(result.id); 
      setCityName(`${result.name}, ${result.region && result.region !== "" ? result.region + ', ' : ''}${result.country}`)}}>
        {result.name}
        {result.region && `, ${result.region}`}
        {`, ${result.country}`}
    </div>
  )
}
