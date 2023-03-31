import { useState } from "react";
import AddModal from "./Modals/AddModal";

// defines the type of the props for the AddProductButton component
interface AddProjectProps {
  fetchHelper: Function;
}

export default function AddProductButton({ fetchHelper }: AddProjectProps) {
  // state variable for the modal to open or close
  const [isOpen, setIsOpen] = useState(false);

  // handle the add product button click
  function handleAddProduct() {
    setIsOpen(true);
  }

  return (
    <>
      <button
        className="h-fit text-green-kelp-50 bg-green-kelp-800 hover:bg-green-kelp-600 transition-all duration-75 pl-2 pr-4 py-2 text-sm flex items-center justify-between gap-1 rounded-md focus:outline-none focus:ring-2 focus:ring-green-kelp-700 focus:ring-opacity-50"
        onClick={() => handleAddProduct()}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        <span className="pointer-events-none whitespace-nowrap">Add Product</span>
      </button>
      <AddModal
        fetchHelper={fetchHelper}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  )
}