// defines the type of the props for the Heading component
interface HeadingProps {
  productCount: number | string
}

export default function Heading({ productCount = '...' }: HeadingProps) {
  return (
    <div className="content py-8 flex justify-start gap-5 items-start flex-col sm:flex-row sm:justify-between sm:items-center">
      <div className=" title max-w-full grid text-left text-green-kelp-800 gap-1">
        <h2 className="text-green-kelp-600 text-sm">
          Information Management Branch (IMB)
        </h2>
        <h1 className=" text-4xl font-bold relative text-green-kelp-900 -left-[1px]">Product Catalog</h1>
      </div>
      <div className="total-count grid gap-1 sm:text-right">
        <span className="text-green-kelp-600 text-sm">Total Products</span>
        <span className="text-green-kelp-900 text-4xl font-bold">{productCount}</span>
      </div>
    </div>
  )
}
