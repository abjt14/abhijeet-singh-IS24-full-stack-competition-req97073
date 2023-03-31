import Link from "next/link"

export default function Navbar() {
  return (
    <nav
      className="
        bg-green-kelp-900
        p-4
        flex
        justify-center
      "
    >
      <div
        className="
          content
          max-w-screen-lg
          w-full
          flex
          justify-between
          items-center
          text-green-kelp-50
        "
      >
        <Link href="/" className="text-lg flex justify-start items-center gap-1">
          BC Gov
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
          Ministry of Citizens
        </Link>
        <Link href="/api/api-doc" className="text-lg flex gap-2 justify-center items-center px-2 py-1 rounded-md hover:bg-green-kelp-700 transition-all duration-75">
          API
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
          </svg>
        </Link>
      </div>
    </nav>
  )
}