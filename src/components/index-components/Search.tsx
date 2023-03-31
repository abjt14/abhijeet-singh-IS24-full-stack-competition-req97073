import { useState } from "react";
import ListBoxTwo from "./FormElements/ListBoxTwo";
import { toast } from "sonner";

// defines the type of the props for the Search component
interface SearchProps {
  dispatch: Function;
  fetchProductData: Function;
}

export default function Search({ dispatch, fetchProductData }: SearchProps) {
  // types for the filter options
  type filterLabels = 'Scrum Master' | 'Developer';
  type filterValues = 'scrummaster' | 'developer';

  // defines the filter options interface for the search
  interface filterOptions {
    label: filterLabels;
    value: filterValues;
  }

  // defines the filter options for the search
  const filterOptions: filterOptions[] = [
    {
      label: 'Scrum Master',
      value: 'scrummaster'
    },
    {
      label: 'Developer',
      value: 'developer'
    }
  ];

  // state variable for the search query
  const [query, setQuery] = useState<string>('');

  // state variable for the search filter
  const [searchFilter, setSearchFilter] = useState<filterValues>(filterOptions[0].value);

  // handle the search query
  function handleSearch() {
    if (query.length > 0) {
      fetchSearchData(searchFilter);
    }
  }

  // fetch the search data from the server dispatching the data to the reducer
  async function fetchSearchData(filter: filterValues) {
    await fetch(`http://localhost:3000/api/search/${filter}/${query}`)
    .then(res => res.json())
    .then(payload => {
      // dispatch the data to the reducer
      dispatch({
        type: 'set',
        payload: payload.data
      });
      if(payload.data.length === 0) {
        // if no results found, display error toast
        toast.error("No results found.");
      } else {
        // if results found, display success toast with number of results
        toast.success(`${payload.data.length} results found.`);
      }
    })
    .catch(err => {
      // if error, display error message in console
      console.error(err);
      // if error, display error toast
      toast.error("Trouble contacting server.");
    });
  }

  return (
    <>
      <div className="flex justify-between items-end gap-2">
        <div className="relative xl:w-96">
          <label htmlFor="search" className="text-xs font-semibold text-green-kelp-900">Search</label>
          <input
            type="search"
            name="search"
            id="search"
            className="w-full h-9 pl-2 pr-4 text-md text-green-kelp-900 placeholder-neutral-400 bg-white border border border-green-kelp-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-kelp-700 focus:border-transparent"
            placeholder="filter results using this search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onBlur={() => query.length === 0 ? fetchProductData() : null}
            onKeyDown={(e) => (e.key === 'Enter') ? handleSearch() : null}
          />
        </div>
        <div className="relative xl:w-48 flex flex-col">
          <ListBoxTwo
            label="Filter By"
            options={filterOptions}
            selected={searchFilter}
            setSelected={setSearchFilter}
          />
        </div>
        <button
          aria-label="search-button"
          className="flex items-center justify-center w-9 h-9 text-white bg-green-kelp-800 rounded-md focus:outline-none focus:ring-2 focus:ring-green-kelp-700 focus:ring-opacity-50 hover:bg-green-kelp-600 transition-all duration-75"
          onClick={() => handleSearch()}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
      </div>
    </>
  )
}