import Beams from '@/components/Beams'
import React from 'react'

const page = () => {
  
  return (
    <div className='h-screen bg-black '>
         <div className="absolute w-full h-full -top-52">
        <Beams
          rotation={35}
          lightColor={"#a0a0a0"}
          beamHeight={35}
          beamWidth={1.3}
          speed={.8}
        />
      </div>

    </div>
  )
}

export default page