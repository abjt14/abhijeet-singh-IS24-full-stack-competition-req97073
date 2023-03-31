import AddProductButton from "@/components/index-components/AddProductButton";
import Heading from "@/components/index-components/Heading";
import Search from "@/components/index-components/Search";
import Table from "@/components/index-components/Table";
import { Product } from "@/types/types";
import Head from "next/head";
import { useEffect, useReducer, useState } from "react";
import { Toaster, toast } from 'sonner';

export default function Home() {
  // usestate for product count to be displayed in heading
  const [productCount, setProductCount] = useState<string | number>('...');
  // useReducer for product data
  const [state, dispatch] = useReducer(productReducer, []);

  // fetch product data on mount
  useEffect(() => {
    fetchProductData();
  }, []);

  // update product count on state change
  useEffect(() => {
    setProductCount(state.length);
  }, [state]);

  // fetch product data from server
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

  // defines the fetch helper function props
  interface FetchHelperProps {
    method: 'POST' | 'PUT' | 'DELETE';
    productId: string;
    data: string | Product;
  }
  // fetch helper function for adding, updating, and deleting products
  async function fetchHelper({ method, data, productId }: FetchHelperProps) {
    const url = 'http://localhost:3000/api/product/' + productId.toLowerCase();

    // headers for fetch
    const headers = {
      'Content-Type': 'application/json'
    };

    // switch statement for fetch method
    switch (method) {
      case 'POST':

        await fetch(url, {
          method: method,
          headers: headers,
          body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(payload => {
          // if error, display error message
          if (payload.status === 'error') {
            // display error message as a toast
            toast.error(payload.message);
          } else {
            // if no error, add product to state using dispatch
            dispatch({
              type: 'add',
              payload: data as Product
            });
            // display success message as a toast
            toast.success(payload.message);
          }
        })
        .catch(err => {
          // if error, display error message in console
          console.error(err);
          // display error message as a toast
          toast.error("Trouble contacting server.");
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
          // if error, display error message
          if (payload.status === 'error') {
            // display error message as a toast
            toast.error(payload.message);
          } else {
            // if no error, update product in state using dispatch
            dispatch({
              type: 'update',
              payload: data as Product
            });
            // display success message as a toast
            toast.success(payload.message);
          }
        })
        .catch(err =>{
          // if error, display error message in console
          console.error(err)
          // display error message as a toast
          toast.error("Trouble contacting server.");
        });

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
          // dispatch delete action to remove product from state
          dispatch({
            type: 'delete',
            payload: data as string
          });
          // display success message as a toast
          toast.success(payload.message);
        })
        .catch(err => {
          // if error, display error message in console
          console.error(err);
          // display error message as a toast
          toast.error("Trouble contacting server.");
        });

        break;
      default:
        break;
    }
  }

  // defines the product reducer actions
  interface ReducerActions {
    type: 'set' | 'add' | 'update' | 'delete';
    payload: any;
  }
  // product reducer function
  function productReducer(state: Product[], action: ReducerActions) : Product[] {
    switch (action.type) {
      case 'set':
        // set state to payload
        return action.payload;
        break;
      case 'add':
        // add payload to state
        return [...state, action.payload];
        break;
      case 'update':
        // find index of product to update
        let index = state.findIndex(product => product.productId === action.payload.productId);
        // update product in state
        state[index] = action.payload;
        // return state
        return state;
        break;
      case 'delete':
        // filter out product to delete
        let newState = state.filter(product => product.productId !== action.payload);
        // return state
        return newState;
        break;
      default:
        // if action type is not defined, display error message in console
        console.error(`Unhandled action type ${action.type}`);
        // return state
        return state;
        break;
    }
  }

  return (
    <div
      className="content max-w-screen-lg w-full mx-auto">
      <Head>
        <title>BC | IMB | Project Catalog</title>
        <meta name="title" content="BC | IMB | Project Catalog" />
        <meta name="description" content="An app that allows the BC Government Ministry of Citizen's Information Management Branch to manage their Product catalog of modern web applications." />
      </Head>
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
