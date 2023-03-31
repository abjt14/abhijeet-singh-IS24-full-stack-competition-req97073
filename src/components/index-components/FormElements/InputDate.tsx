// defines the props for the InputDate component
interface InputDateProps {
  value: string;
  setter: Function;
  label: string;
}

export default function InputDate({ value, setter, label }: InputDateProps) {
  return (
    <div className="flex flex-col gap-2 mb-6">
      <label htmlFor="productName" className="text-xs font-semibold text-green-kelp-900">{label}</label>
      <input
        type="date"
        name="productName"
        id="productName"
        className="mt-1 rounded-md px-4 py-[.45rem] text-sm text-green-kelp-900 bg-white border border-green-kelp-700 outline-green-kelp-900"
        required={true}
        value={value}
        onChange={(e) => setter(e.target.value)}
        max={new Date().toISOString().split('T')[0]}
      />
  </div>
  )
}