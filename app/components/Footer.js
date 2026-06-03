import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div  className='bg-[#04041D] text-white flex justify-center h-12 items-center min-[500px]:text-lg text-sm text-center'> &copy; 2023–{currentYear} Pawan Dhaka. All rights reserved.</div>
  )
}

export default Footer