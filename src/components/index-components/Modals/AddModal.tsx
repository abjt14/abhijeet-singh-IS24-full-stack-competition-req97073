import { Product } from '@/types/types';
import { Dialog } from '@headlessui/react';
import { FormEvent, useEffect, useState } from 'react';
import { productOwners } from "@/static-data/productOwners";
import { scrumMasters } from '@/static-data/scrumMasters';
import { developers as developersData } from '@/static-data/developers';
import InputText from '../FormElements/InputText';
import InputDate from '../FormElements/InputDate';
import { generateID } from '@/helpers/utils';
import ListBox from '../FormElements/ListBox';

// defines the type of the props for the AddModal component
interface AddModalProps {
  fetchHelper: Function;
  isOpen: boolean;
  setIsOpen: (args: boolean) => void;
}

export default function AddModal({ fetchHelper, isOpen, setIsOpen }: AddModalProps) {
  // state variables for the product data
  const [productName, setProductName] = useState<string>('');
  const [productOwnerName, setProductOwnerName] = useState<string>(productOwners[0]);
  const [developers, setDevelopers] = useState<string[]>([developersData[0]]);
  const [scrumMasterName, setScrumMasterName] = useState<string>(scrumMasters[0]);
  const [startDate, setStartDate] = useState<string>('');
  const [methodology, setMethodology] = useState<'Agile' | 'Waterfall'>('Agile');

  // defines the methodology options for the listbox
  const methodologyList = ['Agile', 'Waterfall'];

  // sets the developers value if the length is less than 5
  function handleSetDeveloper(value: string[]) {
    if (value.length <= 5) {
      setDevelopers(value);
    }
  }

  // handle the save product
  async function saveProduct(e: FormEvent) {
    // prevent the default form submission
    e.preventDefault();

    // define the body of the request
    const body: Product = {
      productId: generateID(productName),
      productName: productName,
      productOwnerName: productOwnerName,
      developers: developers,
      scrumMasterName: scrumMasterName,
      startDate: startDate,
      methodology: methodology
    }

    // call the handleSaveProduct function
    await handleSaveProduct(body);

    // close the modal
    setIsOpen(false);
  }

  // reset the state variables when the modal is closed
  useEffect(() => {
    if (!isOpen) {
      setProductName('');
      setProductOwnerName(productOwners[0]);
      setDevelopers([developersData[0]]);
      setScrumMasterName(scrumMasters[0]);
      setStartDate('');
      setMethodology('Agile');
    }
  }, [isOpen]);

  // handle the save product request
  async function handleSaveProduct(body: Product) {
    await fetchHelper({
      method: 'POST',
      data: body,
      productId: body.productId
    });
  }

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <div className="fixed inset-0 bg-green-kelp-900/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-lg rounded-md bg-green-kelp-50 p-4">
          <Dialog.Title className="flex gap-2 justify-start text-3xl font-semibold mb-6 items-center text-green-kelp-900">
            Add Product
            <svg className="w-7 h-7 mt-[.125rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </Dialog.Title>
          <p className="text-xs text-red-700 mb-4">All fields are required.</p>
          <form onSubmit={(e) => saveProduct(e)}>
            <InputText
              value={productName}
              setter={setProductName}
              label="Name"
            />
            <div className="flex gap-2">
              <ListBox
                multiple={false}
                label="Owner"
                options={productOwners}
                selected={productOwnerName}
                setSelected={setProductOwnerName}
              />
              <ListBox
                multiple={false}
                label="Scrum Master"
                options={scrumMasters}
                selected={scrumMasterName}
                setSelected={setScrumMasterName}
              />
            </div>
            <ListBox
              multiple={true}
              label="Developers"
              options={developersData}
              selected={developers}
              setSelected={handleSetDeveloper}
            />
            <p className="text-xs text-neutral-700 mb-4 -mt-5">You can assign 1 to 5 developers per product.</p>
            <div className="flex gap-2">
              <ListBox
                multiple={false}
                label="Methodology"
                options={methodologyList}
                selected={methodology}
                setSelected={setMethodology}
              />
              <InputDate
                value={startDate}
                setter={setStartDate}
                label="Start Date"
              />
            </div>
            <Dialog.Description className="text-xs text-green-kelp-700">
              This will add a new the product to your catalog.
            </Dialog.Description>
            <div
              className="flex gap-4 justify-end mt-8"
            >
              <button
                type="submit"
                className="inline-block rounded-md flex-1 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white bg-green-kelp-700"
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
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}