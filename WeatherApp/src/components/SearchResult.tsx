import './SearchResult.css'

interface SearchResultProps {
  result: any;
}

export const SearchResult = ({result}:SearchResultProps) => {
  return (
    <div className="search-result" onClick={(e) => alert("You clicked on " + result.name + ", " + result.region + ", " + result.country)}>
      {result.name}, {result.region}, {result.country}
      </div>
  )
}
