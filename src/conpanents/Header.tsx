import React from 'react'
import user from '../assets/header/user.png'
import map from '../assets/header/map.png'
import orderiCON from '../assets/header/savat.png'
import type { JSX } from 'react'
function Header(): JSX.Element {
  return (
    <header className='w-full h-[60px] border-2 border-[#B1BDC5] flex  justify-between items-center rounded-[20px] pr-6 pl-3'>
        <span className='w-[40px] cursor-pointer'>
          <img className='w-full' src={user} alt={user} />
        </span>
        <span className='flex gap-2 cursor-pointer'>
          <img className='w-[20px]' src={map} alt={map} />
          <h2 className='text-[15px] font-medium'>Manzilingizni Kiriting</h2>
        </span>
        <span className='w-[23px] cursor-pointer'>
          <img className='w-full' src={orderiCON} alt={orderiCON} />
        </span>
    </header>
  )
}
export default Header