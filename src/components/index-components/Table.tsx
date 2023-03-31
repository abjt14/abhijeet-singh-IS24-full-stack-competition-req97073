import { useEffect, useState } from "react";
import { Product } from "@/types/types";
import DeleteModal from "@/components/index-components/Modals/DeleteModal";
import EditModal from "./Modals/EditModal";

// defines the type of the props for the Table component
interface TableProps {
  state: Product[];
  fetchHelper: Function;
}

export default function Table({ state, fetchHelper}: TableProps) {
  // state variable for opening and closing the edit modal
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  // state variable for opening and closing the delete modal
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  // state variable for the product id
  const [productId, setProductId] = useState('');
  // state variable for the product name
  const [productName, setProductname] = useState('');
  // state variable for the product data for edit modal
  const [product, setProduct] = useState<Product>();

  // handle deleting a product
  function handleDeleteProduct(productId: string, productName: string) {
    setProductId(productId);
    setIsOpenDelete(true);
    setProductname(productName);
  }

  // handle editing a product
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
                    state.length > 0 ? state.map((product, index) => (
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
                          <div className="flex items-center gap-3 text-sm">
                            <button
                              className="py-1 px-2 rounded-md bg-pampas-200 text-green-kelp-700 transition-all duration-75 hover:text-green-kelp-900 hover:bg-pampas-300"
                              onClick={() => handleEditProduct(product)}
                            >
                              Edit
                            </button>
                            <button
                              className="py-1 px-2 rounded-md bg-red-200 text-red-700 hover:text-red-900 hover:bg-red-300"
                              onClick={() => handleDeleteProduct(product.productId, product.productName)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td
                          colSpan={columns.length + 1}
                          className="px-3 py-2 align-top border-[0.5px] first:border-l last:border-r border-neutral-300 rounded-b-md"
                        >
                          <div className="flex items-center justify-center space-x-2">
                            <span className="text-sm text-neutral-500">no products found</span>
                          </div>
                        </td>
                      </tr>
                    )
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
