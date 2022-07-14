import React from 'react'
import { useContext } from 'react'
import { ImageName } from './context-image'

export default function Cover() {
  let { image }=useContext(ImageName)

  return (
    <div className='cover-image' >
      <img style={{width:"100%",height:"100%"}} src={image} />
    </div>
  )
}
