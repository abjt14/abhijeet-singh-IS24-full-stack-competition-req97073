import { useState } from "react";

interface SearchProps {
  dispatch: Function;
  fetchProductData: Function;
}

export default function Search({ dispatch, fetchProductData }: SearchProps) {
  type filterLabels = 'Scrum Master' | 'Developer';
  type filterValues = 'scrummaster' | 'developer';
  interface filterOptions {
    label: filterLabels;
    value: filterValues;
  }
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

  const [query, setQuery] = useState<string>('');
  const [searchFilter, setSearchFilter] = useState<filterValues>(filterOptions[0].value);

  function handleSearch() {
    if (query.length > 0) {
      fetchSearchData(searchFilter);
    }
  }

  async function fetchSearchData(filter: filterValues) {
    await fetch(`http://localhost:3000/api/search/${filter}/${query}`)
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: 'set',
        payload: data.data
      });
    })
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
            className="w-full h-9 pl-2 pr-4 text-md text-green-kelp-900 placeholder-neutral-400 bg-pampas-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-kelp-700 focus:border-transparent"
            placeholder="filter results using this search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onBlur={() => query.length === 0 ? fetchProductData() : null}
            onKeyDown={(e) => (e.key === 'Enter') ? handleSearch() : null}
          />
        </div>
        <div className="relative xl:w-48 flex flex-col">
          <label htmlFor="filterBy" className="text-xs font-semibold text-green-kelp-900">Filter By</label>
          <select
            name="filterBy"
            id="filterBy"
            className="rounded-md px-4 py-2 text-sm text-green-kelp-900 bg-pampas-50 border border-gray-300 outline-green-kelp-900"
            required={true}
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value as filterValues)}
          >
            {filterOptions.map((v, index) => (
              <option key={index} value={v.value}>{v.label}</option>
            ))}
          </select>
        </div>
        <button
          className="flex items-center justify-center w-9 h-9 text-white bg-green-kelp-800 rounded-md focus:outline-none focus:ring-2 focus:ring-green-kelp-700 focus:ring-opacity-50 hover:bg-green-kelp-700 transition-all duration-75"
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