// defines the type of the props for the InputText component
interface InputTextProps {
  value: string;
  setter: Function;
  label: string;
}

export default function InputText({ value, setter, label }: InputTextProps) {
  return (
    <div className="flex flex-col gap-2 mb-6">
      <label htmlFor="productName" className="text-xs font-semibold text-green-kelp-900">{label}</label>
      <input
        type="text"
        name="productName"
        id="productName"
        className="rounded-md px-4 py-2 text-sm text-green-kelp-900 bg-white border border-green-kelp-700 outline-green-kelp-900"
        pattern="^[a-zA-Z0-9 ]+$"
        required={true}
        value={value}
        onChange={(e) => setter(e.target.value)}
      />
  </div>
  )
}