import { Dialog } from '@headlessui/react';

// defines the type of the props for the DeleteModal component
interface DeleteModalProps {
  productId: string;
  productName: string;
  fetchHelper: Function;
  isOpen: boolean;
  setIsOpen: (args: boolean) => void;
}

export default function DeleteModal({ productId, productName, fetchHelper, isOpen, setIsOpen }: DeleteModalProps) {

  // handle the delete product request
  function confirmDelete() {
    // send the delete request with the product id
    fetchHelper({
      method: 'DELETE',
      data: productId,
      productId: productId
    });

    // close the modal
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <div className="fixed inset-0 bg-green-kelp-900/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-lg rounded-md bg-green-kelp-50 p-4">
          <Dialog.Title className="flex gap-2 justify-start text-3xl font-semibold mb-6 items-center text-green-kelp-900">
            Delete Product
            <svg className="w-7 h-7 mt-[.125rem]"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </Dialog.Title>
          <p>
            Are you sure you want to delete the product "{productName}"?
          </p>
          <Dialog.Description className="text-xs text-red-700">
            This will permanently delete the product.
          </Dialog.Description>
          <div
            className="flex gap-4 justify-end mt-8"
          >
            <button
              type="button"
              className="inline-block rounded-md flex-1 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white bg-red-700"
              onClick={() => confirmDelete()}
            >
              Confirm
            </button>
            <button
              type="button"
              className="inline-block rounded-md flex-1 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-green-kelp-900 bg-pampas-200"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
    )
}