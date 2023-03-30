import { Product } from '@/types/types';
import { Dialog } from '@headlessui/react';
import { FormEvent, useEffect, useState } from 'react';
import { productOwners } from "@/static-data/productOwners";
import { scrumMasters } from '@/static-data/scrumMasters';
import { developers as developersData } from '@/static-data/developers';
import InputText from '../FormElements/InputText';
import Select from '../FormElements/Select';
import InputDate from '../FormElements/InputDate';

interface EditModalProps {
  data: Product;
  fetchHelper: Function;
  isOpen: boolean;
  setIsOpen: (args: boolean) => void;
}

export default function EditModal({ data, fetchHelper, isOpen, setIsOpen }: EditModalProps) {
  const [productName, setProductName] = useState<string>(data.productName);
  const [productOwnerName, setProductOwnerName] = useState<string>(data.productOwnerName);
  const [developers, setDevelopers] = useState<string[]>(data.developers);
  const [scrumMasterName, setScrumMasterName] = useState<string>(data.scrumMasterName);
  const [startDate, setStartDate] = useState<string>(data.startDate);
  const [methodology, setMethodology] = useState<'Agile' | 'Waterfall'>(data.methodology);

  useEffect(() => {
    setProductName(data.productName);
    setProductOwnerName(data.productOwnerName);
    setDevelopers(data.developers);
    setScrumMasterName(data.scrumMasterName);
    setStartDate(data.startDate);
    setMethodology(data.methodology);
  }, [data]);

  const methodologyList = ['Agile', 'Waterfall'];

  async function saveProduct(e: FormEvent) {
    e.preventDefault();

    const body: Product = {
      productId: data.productId,
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

  async function handleSaveProduct(body: Product) {
    await fetchHelper({
      method: 'PUT',
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
            Edit Product
            <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
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
            <div className="flex-1 flex flex-col gap-2 mb-6">
              <label htmlFor="developers" className="text-xs font-semibold text-green-kelp-900">Developers</label>
              <select
                name="developers"
                id="developers"
                className="rounded-md px-4 py-2 text-sm text-green-kelp-900 bg-white border border-green-kelp-700 outline-green-kelp-900"
                required={true}
                multiple
                value={developers}
                onChange={(e) => setDevelopers(Array.from(e.target.selectedOptions, (option) => option.value))}
              >
                {developersData.map((person, index) => (
                  <option key={index} value={person}>{person}</option>
                ))}
              </select>
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