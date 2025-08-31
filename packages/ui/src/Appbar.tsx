import React from 'react'
import { Button } from './button'

interface AppbarProps {
    user? : {
        name? : string | null
    },
    onSignin : any,
    onSignout : any
}

export function Appbar({user, onSignin, onSignout} : AppbarProps)  {

  return (
    <div className="border-b border-neutral-300 flex w-full px-4 py-3 items-center justify-between">
      <div className="text-xl font-bold text-neutral-900">
        Paytm
      </div>
      <div className='flex justify-center pt-2 gap-4 items-center'>
        <div className='text-lg font-semibold text-neutral-500'>
          Hi {user?.name} !
        </div>
        <Button onclick={user ? onSignout : onSignin}>
            {user ? "Logout" : "Login"}
        </Button>
      </div>
    </div>
  )
}



