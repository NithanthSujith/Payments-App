"use client"
import React from 'react'

interface SelectProps {
    onSelect : (value:string)=>void
    options : {
        key:string ,
        value : string
    }[]
}

const Select = ({onSelect, options}:SelectProps) => {
  return (
    <select onChange={(e)=>onSelect(e.target.value)} className='bg-gray-50 border border-gray-300 text-sm rounded-lg outline-none block w-full p-2.5 text-neutral-500 focus:ring-violet-500 focus:border-violet-500'>
        {
            options.map(option => <option key={option.key} value={option.key}>{option.value}</option>)
        }

    </select>
  )
}

export default Select
