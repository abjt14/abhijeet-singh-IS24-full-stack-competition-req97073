interface SelectProps {
  selected: string;
  options: string[];
  setter: Function;
  label: string;
}

export default function Select({ selected, options, setter, label }: SelectProps) {
  return (
    <div className="flex-1 flex flex-col gap-2 mb-6">
      <label htmlFor="productOwnerName" className="text-xs font-semibold text-green-kelp-900">{label}</label>
      <select
        name="productOwnerName"
        id="productOwnerName"
        className="rounded-md px-4 py-2 text-sm text-green-kelp-900 bg-white border border-green-kelp-700 outline-green-kelp-900"
        data-te-select-init
        required={true}
        value={selected}
        onChange={(e) => {
          console.log('e.target.value', e.target.value);

          setter(e.target.value);
        }}
      >
        {options.map((v, index) => (
          <option key={index} value={v}>{v}</option>
        ))}
      </select>
    </div>
  )
}