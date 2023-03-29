export default function Search() {
  return (
    <div className="flex justify-center">
      <div className="relative mb-3 xl:w-96" data-te-input-wrapper-init>
        <input
          type="search"
          className="peer block min-h-[auto] w-full rounded border-0 bg-pampas-50 py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
          id="exampleSearch2"
          placeholder="Type query" />
        <label
          htmlFor="exampleSearch2"
          className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-green-kelp-900 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none"
          >Search
        </label>
      </div>
    </div>
  )
}