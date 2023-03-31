import Head from 'next/head'
import Navbar from './layout-components/Navbar'
import { ReactNode } from 'react'

// defines the type of the props for the Layout component
type LayoutProps = {
  children?: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <main className='px-4 pb-8'>{ children }</main>
    </>
  )
}
