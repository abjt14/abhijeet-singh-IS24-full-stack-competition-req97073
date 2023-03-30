import AddProductButton from "@/components/index-components/AddProductButton";
import Heading from "@/components/index-components/Heading";
import Search from "@/components/index-components/Search";
import Table from "@/components/index-components/Table";
import { Product } from "@/types/types";
import { useEffect, useReducer, useState } from "react";
import { Toaster, toast } from 'sonner';

export default function Home() {
  const [productCount, setProductCount] = useState<string | number>('...');
  const [state, dispatch] = useReducer(productReducer, []);

  useEffect(() => {
    fetchProductData();
  }, []);

  useEffect(() => {
    setProductCount(state.length);
  }, [state]);

  async function fetchProductData() {
    await fetch('http://localhost:3000/api/products')
      .then(res => res.json())
      .then(data => {
        setProductCount(data.data.length);
        dispatch({
          type: 'set',
          payload: data.data
        });
      })
  }

  interface FetchHelperProps {
    method: 'POST' | 'PUT' | 'DELETE';
    productId: string;
    data: string | Product;
  }
  async function fetchHelper({ method, data, productId }: FetchHelperProps) {
    const url = 'http://localhost:3000/api/product/' + productId.toLowerCase();

    const headers = {
      'Content-Type': 'application/json'
    };

    switch (method) {
      case 'POST':

        await fetch(url, {
          method: method,
          headers: headers,
          body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(payload => {
          if (payload.status === 'error') {
            toast.error(payload.message);
          } else {
            dispatch({
              type: 'add',
              payload: data as Product
            });
            toast.success(payload.message);
          }
        })
        .catch(err => {
          console.error(err);
          toast.error(err.message);
        });

        break;
      case 'PUT':

        await fetch(url, {
          method: method,
          headers: headers,
          body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(payload => {
          if (payload.status === 'error') {
            toast.error(payload.message);
          } else {
            dispatch({
              type: 'update',
              payload: data as Product
            });
            toast.success(payload.message);
          }
        })
        .catch(err => console.error(err));

        break;
      case 'DELETE':

        await fetch(url, {
          method: method,
          headers: headers,
          body: JSON.stringify({
            productId: data
          })
        })
        .then(res => res.json())
        .then(payload => {
          dispatch({
            type: 'delete',
            payload: data as string
          });
          toast.success(payload.message);
        })
        .catch(err => console.error(err));

        break;
      default:
        break;
    }
  }

  interface ReducerActions {
    type: 'set' | 'add' | 'update' | 'delete';
    payload: any;
  }
  function productReducer(state: Product[], action: ReducerActions) : Product[] {
    switch (action.type) {
      case 'set':
        return action.payload;
        break;
      case 'add':
        return [...state, action.payload];
        break;
      case 'update':
        let index = state.findIndex(product => product.productId === action.payload.productId);
        state[index] = action.payload;
        return state;
        break;
      case 'delete':
        let newState = state.filter(product => product.productId !== action.payload);
        return newState;
        break;
      default:
        console.error(`Unhandled action type ${action.type}`);
        return state;
        break;
    }
  }

  return (
    <div
      className="content max-w-screen-lg w-full mx-auto">
      <Heading productCount={productCount} />
      <div className="flex justify-between gap-2 items-end flex-col sm:flex-row">
        <Search
          dispatch={dispatch}
          fetchProductData={fetchProductData}
        />
        <AddProductButton fetchHelper={fetchHelper} />
      </div>
      <Table
        state={state}
        fetchHelper={fetchHelper}
      />
      <Toaster richColors closeButton expand={true} />
    </div>
  )
}
