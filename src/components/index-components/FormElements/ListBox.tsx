import { Listbox } from "@headlessui/react";

// defines the type of the props for the ListBox component
interface SelectListBoxProps {
  label: string;
  options: string[];
  selected: string | string[];
  setSelected: (value: any) => void;
  multiple: boolean;
}

export default function ListBox({ label, options, selected, setSelected, multiple }: SelectListBoxProps) {
  return (
    <div className="flex-1 flex flex-col gap-2 mb-6">
      <label htmlFor="productOwnerName" className="text-xs font-semibold text-green-kelp-900">{label}</label>
      <Listbox value={selected} onChange={setSelected} multiple={multiple}>
        <div className="relative mt-1">
          <Listbox.Button className="rounded-md px-4 py-2 text-sm text-green-kelp-900 bg-white border border-green-kelp-700 outline-green-kelp-900 w-full">
          <span className="block truncate text-left">{Array.isArray(selected) ? selected.join(', ') : selected}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
              </svg>
            </span>
          </Listbox.Button>
            <Listbox.Options className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-green-kelp-100 text-green-kelp-900' : 'text-gray-900'
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {option}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-kelp-600">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
        </div>
      </Listbox>
    </div>
  )
}