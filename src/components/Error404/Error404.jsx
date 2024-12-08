import React from 'react'
import notFound from '../../assets/images/error.svg'
export default function Error404() {
  return (
    <>
      <img src={notFound} className='mx-auto' alt="notFound" />
    </>
  )
}
