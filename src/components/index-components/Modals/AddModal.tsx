import { Product } from '@/types/types';
import { Dialog } from '@headlessui/react';
import { FormEvent, useEffect, useState } from 'react';
import { productOwners } from "@/static-data/productOwners";
import { scrumMasters } from '@/static-data/scrumMasters';
import { developers as developersData } from '@/static-data/developers';
import InputText from '../FormElements/InputText';
import Select from '../FormElements/Select';
import InputDate from '../FormElements/InputDate';
import { generateID } from '@/helpers/utils';
import SelectListBox from '../FormElements/SelectListBox';

interface AddModalProps {
  fetchHelper: Function;
  isOpen: boolean;
  setIsOpen: (args: boolean) => void;
}

export default function AddModal({ fetchHelper, isOpen, setIsOpen }: AddModalProps) {
  const [productName, setProductName] = useState<string>('');
  const [productOwnerName, setProductOwnerName] = useState<string>(productOwners[0]);
  const [developers, setDevelopers] = useState<string[]>([]);
  const [scrumMasterName, setScrumMasterName] = useState<string>(scrumMasters[0]);
  const [startDate, setStartDate] = useState<string>('');
  const [methodology, setMethodology] = useState<'Agile' | 'Waterfall'>('Agile');

  const methodologyList = ['Agile', 'Waterfall'];

  function handleSetDeveloper(value: string[]) {
    if (value.length <= 5) {
      setDevelopers(value);
    }
  }

  async function saveProduct(e: FormEvent) {
    e.preventDefault();

    const body: Product = {
      productId: generateID(productName),
      productName: productName,
      productOwnerName: productOwnerName,
      developers: developers,
      scrumMasterName: scrumMasterName,
      startDate: startDate,
      methodology: methodology
    }

    await handleSaveProduct(body);
    setIsOpen(false);
  }

  useEffect(() => {
    if (!isOpen) {
      setProductName('');
      setProductOwnerName(productOwners[0]);
      setDevelopers([]);
      setScrumMasterName(scrumMasters[0]);
      setStartDate('');
      setMethodology('Agile');
    }
  }, [isOpen]);

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
          <form onSubmit={(e) => saveProduct(e)}>
            <InputText
              value={productName}
              setter={setProductName}
              label="Name"
            />
            <div className="flex gap-2">
              <Select
                selected={productOwnerName}
                setter={setProductOwnerName}
                label="Owner"
                options={productOwners}
              />
              <Select
                selected={scrumMasterName}
                setter={setScrumMasterName}
                label="Scrum Master"
                options={scrumMasters}
              />
            </div>
            {/* <div className="flex-1 flex flex-col gap-2 mb-6">
              <label htmlFor="developers" className="text-xs font-semibold text-green-kelp-900">Developers</label>
              <select
                name="developers"
                id="developers"
                className="rounded-md px-4 py-2 text-sm text-green-kelp-900 bg-white border border-green-kelp-700 outline-green-kelp-900"
                required={true}
                multiple
                value={developers}
                onChange={(e) => developers.length < 5 ? setDevelopers(Array.from(e.target.selectedOptions, (option) => option.value)) : null}
              >
                {developersData.map((developer, index) => (
                  <option key={index} value={developer}>{developer}</option>
                ))}
              </select>
            </div> */}
            <div className="flex-1 flex flex-col gap-2 mb-6">
              <SelectListBox
                options={developersData}
                selected={developers.length === 0 ? [developersData[0]] : developers}
                setSelected={handleSetDeveloper}
              />
            </div>
            <div className="flex gap-2">
              <Select
                selected={methodology}
                setter={setMethodology}
                label="Methodology"
                options={methodologyList}
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