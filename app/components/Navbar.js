"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"

const Navbar = () => {
  const { data: session } = useSession()
  const [showdropdown, setshowdropdown] = useState(false)

  return (
    <nav className='bg-[#04041D] text-white flex justify-between  items-center text-lg flex-col min-[500px]:flex-row gap-3 py-3' >
      <Link href={"/"}><div className="logo font-bold px-3 flex justify-center items-center "><span><img className='w-10' src="https://i.pinimg.com/originals/8e/cb/5b/8ecb5bda69e29eb348a04ad66077fac6.gif" alt="" /></span><span className=''>Get-Me-A-Mango</span></div></Link>
      {/* <ul className='flex justify-between gap-20 px-4' >
            <li>Home</li>
            <li>About</li>
            <li>Contact us</li>
            <li>Login</li> 
            <li>Sign up</li>
        </ul> */}
      <div className="pl-5">
        {session && <>
          <button onClick={() => { setshowdropdown(!showdropdown) }} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="inline-flex relative items-center justify-center text-white text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl hover:ring-1 hover:ring-blue-700 rounded-xl text-sm px-4 py-2 text-center leading-5 font-bold mr-5 focus:outline-none" type="button">
            Welcome {session.user.name}
            <svg className={` ${showdropdown ? "hidden" : ""} w-4 h-4 ms-1.5 -me-0.5`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" /></svg>
            <svg
              className={`${showdropdown ? "" : "hidden"} w-4 h-4 ms-1.5 -me-0.5`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m5 15 7-7 7 7"
              />
            </svg>
          </button>

          <div id="dropdown" className={`z-10 ${showdropdown ? "" : "hidden"} absolute mt-3 ml-5 bg-gray-900 border-[1px] border-gray-500 rounded-base shadow-lg min-[500px]:w-auto w-[100vw] right-0 min-[500px]:mr-10 `}>
            <ul className="p-2 text-sm text-body font-medium" aria-labelledby="dropdownDefaultButton">
              <li>
                <Link href="/" className="inline-flex items-center w-full p-2 hover:bg-gray-800 hover:text-heading rounded">Home</Link>
              </li>
              <li>
                <Link href="/dashboard" className="inline-flex items-center w-full p-2 hover:bg-gray-800 hover:text-heading rounded">Dashboard</Link>
              </li>
              <li>
                <Link href={`/${session.user.name}`} className="inline-flex items-center w-full p-2  hover:bg-gray-800  hover:text-heading rounded">Your Page</Link>
              </li>
              <li>
                <Link href="/help" className="inline-flex items-center w-full p-2  hover:bg-gray-800  hover:text-heading rounded">Help and Support</Link>
              </li>
              <li>
                <Link onClick={() => { signOut() }} href="#" className="inline-flex items-center w-full p-2  hover:bg-gray-800  hover:text-heading rounded">Logout</Link>
              </li>
            </ul>
          </div>
        </>}

        {!session && <><Link href={"/login"}>
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl hover:ring-1 hover:ring-blue-700 rounded-xl text-sm px-4 py-2 text-center leading-5 font-bold">Login</button>
        </Link></>}

      </div>
    </nav>
  )
}

export default Navbar