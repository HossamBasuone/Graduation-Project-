import React from 'react'
import Pnavbar from '../../_Components/pnavbar/page'
import Pfooter from '../../_Components/pfooter/pfooter'

export default function layout({children}:any) {
  return (<>
  <Pnavbar/>
  <div className=''>
<div className=' min-h-lvh '>  
  {children}
</div>
  </div>
  <Pfooter/>  
  </>
  )
}
