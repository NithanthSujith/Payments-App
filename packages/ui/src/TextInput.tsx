"use client"
interface TextInputProps{
    placeholder : string;
    onChange : (value:string)=>void;
    label :string,
    value?: string|number
}

const TextInput = ({placeholder, onChange, label, value} : TextInputProps) => {
  return (
    <div className="pt-2">
      <label className="block mb-2 text-sm font-medium text-nuetral-500">{label}</label>
      <input value={value} type="text" placeholder={placeholder} id="first_name" className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-violet-500 focus:border-violet-500 w-full p-2.5 block" onChange={(e)=>onChange(e.target.value)} />
    </div>
  )
}

export default TextInput
