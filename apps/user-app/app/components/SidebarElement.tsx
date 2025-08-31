"use client"

import { usePathname, useRouter } from "next/navigation"

interface SidebarElementProps{
    href : string
    title :String
    icon : React.ReactNode
}


export default function SidebarElement({href, title, icon}:SidebarElementProps){
    const router = useRouter()
    const pathName = usePathname()
    const selected = pathName === href

    return <div className={`flex cursor-pointer p-2 pl-8  hover:text-[#6a51a6] gap-2 items-center group` } onClick={()=>router.push(href)}>
        <div className={`pr-2 ${selected ? "text-[#6a51a6]" : "text-slate-500"} group-hover:text-[#6a51a6]`}>
            {icon}
        </div>
        <div className={`font-bold ${selected ? "text-[#6a51a6]" : "text-slate-500"}   group-hover:text-[#6a51a6]`}>
            {title}
        </div>
    </div>
}