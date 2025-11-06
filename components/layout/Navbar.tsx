import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center absolute top-0 left-0 right-0 text-white  z-10'>
      <span>logo</span>
      <ul className='flex gap-5'>
        {[1,2,3].map((item, i)=><li key={i} className=''>{item}</li>)}
      </ul>
    </nav>
  )
}

export default Navbar