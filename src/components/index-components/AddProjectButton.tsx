import { Product } from "@/types/types";
import { useState } from "react";
import AddModel from "./Modals/AddModal";

interface AddProjectProps {
  state: Product[];
  fetchHelper: Function;
}

export default function AddProjectButton({ state, fetchHelper }: AddProjectProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleAddProduct() {
    setIsOpen(true);
  }

  return (
    <>
      <button
        className="text-green-kelp-50 bg-green-kelp-800 hover:bg-green-kelp-700 duration-75 pl-2 pr-4 py-1 text-sm flex items-center justify-between gap-1 rounded-md"
        onClick={() => handleAddProduct()}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        <span className="pointer-events-none">Add Product</span>
      </button>
      <AddModel
        type="add"
        fetchHelper={fetchHelper}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  )
}