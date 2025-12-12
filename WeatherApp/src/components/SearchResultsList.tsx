import { SearchResult } from './SearchResult';

import './SearchResultsList.css'

interface SearchResultsListProps {
  results: any[];
  setSelectedId: (id: string) => void;
  setCityName: (name: string) => void;
}

export const SearchResultsList = ({results, setSelectedId, setCityName}:SearchResultsListProps) => {
  return (
    <div className="results-list">
      {results.map((result, id) => {
        return <div key={id}><SearchResult result={result} key={id} setSelectedId={setSelectedId} setCityName={setCityName} /></div>
      })}
    </div>
  )
}
