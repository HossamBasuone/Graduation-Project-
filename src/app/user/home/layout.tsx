import React from 'react'
import Pfooter from '../../_Components/pfooter/pfooter'
import Unavbar from '../../_Components/unavbar/page'

export default function layout({children}:any) {
  return (<>
  <Unavbar/>
  <div className=''>
<div className=' min-h-lvh '>  
  {children}
</div>
  </div>
  <Pfooter/>  
  </>
  )
}
