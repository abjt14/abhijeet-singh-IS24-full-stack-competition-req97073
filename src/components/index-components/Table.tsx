import { useEffect, useState } from "react";
import { Product } from "@/types/types";
import DeleteModal from "@/components/index-components/Modals/DeleteModal";
import EditModal from "./Modals/EditModal";

interface TableProps {
  state: Product[];
  fetchHelper: Function;
}

export default function Table({ state, fetchHelper}: TableProps) {
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [productId, setProductId] = useState('');
  const [productName, setProductname] = useState('');
  const [product, setProduct] = useState<Product>();

  function handleDeleteProduct(productId: string, productName: string) {
    setProductId(productId);
    setIsOpenDelete(true);
    setProductname(productName);
  }

  function handleEditProduct(data: Product) {
    setProduct(data);
    setIsOpenEdit(true);
  }

  return (
    <>
      <div className="flex flex-col overflow-x-auto my-2 rounded-md border-x border-neutral-300 md:border-0">
        <div className="">
          <div className="inline-block min-w-full">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm font-normal border-separate border-spacing-0">
                <thead className="font-semibold text-green-kelp-800">
                  <tr>
                    {
                      columns.map((column, index) => (
                        <th
                          key={index}
                          scope="col"
                          className="px-3 py-2 align-top border-[0.5px] first:border-l border-neutral-300 whitespace-nowrap bg-pampas-200 first:rounded-tl-md"
                        >
                          {column.header}
                        </th>
                      ))
                    }
                    <th
                      scope="col"
                      className="px-3 py-2 align-top border-[0.5px] border-r border-neutral-300 bg-pampas-200 rounded-tr-md"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    state.map((product, index) => (
                      <tr
                        key={index}
                        className="items-start"
                      >
                        {
                          columns.map((column, index) => (
                            <td
                              key={index}
                              className={`
                                px-3 py-2 align-top border-[0.5px] first:border-l border-neutral-300
                                ${
                                  (column.accessor === 'productId') ||
                                  (column.accessor === 'startDate') ||
                                  (column.accessor === 'productOwnerName') ?
                                  'whitespace-nowrap' : null
                                }
                              `}
                            >
                              {
                                (column.accessor === 'developers') ?
                                product[column.accessor].map((developer, indexAccessor) => (
                                  <div
                                    key={indexAccessor}
                                    className="flex items-center space-x-2"
                                  >
                                    <span className="whitespace-nowrap">{developer}</span>
                                  </div>
                                ))
                                : product[column.accessor as keyof Product]
                              }
                            </td>
                          ))
                        }
                        <td className="px-3 py-2 align-top border-[0.5px] first:border-l last:border-r border-neutral-300">
                          <div className="flex items-center space-x-4 text-sm">
                            <button
                              className="text-green-kelp-600 hover:text-green-kelp-900"
                              onClick={() => handleEditProduct(product)}
                            >
                              Edit
                            </button>
                            <button
                              className="text-red-600 hover:text-red-900"
                              onClick={() => handleDeleteProduct(product.productId, product.productName)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {
        productId && productName && (
          <DeleteModal
            productId={productId}
            productName={productName}
            fetchHelper={fetchHelper}
            isOpen={isOpenDelete}
            setIsOpen={setIsOpenDelete}
          />
        )
      }
      {
        product && (
          <EditModal
            data={product}
            fetchHelper={fetchHelper}
            isOpen={isOpenEdit}
            setIsOpen={setIsOpenEdit}
          />
        )
      }
    </>
  )
}

interface Column {
  header: string;
  accessor: string;
}

const columns: Column[] = [
  {
    header: 'ID',
    accessor: 'productId',
  },
  {
    header: 'Name',
    accessor: 'productName',
  },
  {
    header: 'Owner',
    accessor: 'productOwnerName',
  },
  {
    header: 'Developers',
    accessor: 'developers',
  },
  {
    header: 'Scrum Master',
    accessor: 'scrumMasterName',
  },
  {
    header: 'Start Date',
    accessor: 'startDate',
  },
  {
    header: 'Methodology',
    accessor: 'methodology',
  },
];
