'use client';
import Script from 'next/script';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className=" flex justify-center flex-col gap-5 items-center text-white h-[40vh] ">
        <div className="font-bold min-[500px]:text-5xl text-3xl flex items-center ">Buy me a Mango<span className="min-[500px]:w-20 w-12" ><img src="https://i.pinimg.com/originals/8e/cb/5b/8ecb5bda69e29eb348a04ad66077fac6.gif" alt="Mango" /></span></div>
        <p className='text-center px-2'>Get money to buy some Mongos by your followers and well wishers.</p>
        <div className="button flex gap-5">
          <Link href={"/login"}>
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl hover:ring-1 hover:ring-gray-700 font-medium rounded-xl text-sm px-4 py-2.5 text-center leading-5">Get Started</button>
          </Link>
          <Link href={"/arisepawan"}>
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl hover:ring-1 hover:ring-gray-700 font-medium rounded-xl text-sm px-4 py-2.5 text-center leading-5">Support Us ❤️</button>
          </Link>
        </div>
      </div>
      <div className="bg-white h-[1px] opacity-15">.</div>
      <div className="text-white container mx-auto py-16 ">
        <h2 className="text-2xl font-extrabold mb-8 text-center">
          Your fans can buy Mangos for you
        </h2>
        <div className="flex justify-around">
          <div className="space-y-2 flex flex-col justify-center items-center">
            <img className="w-[110px] item bg-slate-400 rounded-full p-2" src="/man.gif" alt="" />
            <p className="text-white font-bold text-xl text-center">Fund Yourself</p>
            <p className="text-white font-semibold text-lg hidden lg:flex">Let your supporters fund your journey.</p>
          </div>
          <div className="space-y-2 flex flex-col justify-center items-center ">
            <img className="w-[110px] item bg-slate-400 rounded-full p-2" src="/coin.gif" alt="" />
            <p className="text-white font-bold text-xl text-center">Send a Mango</p>
            <p className="text-white font-semibold text-lg hidden lg:flex">Receive small support from your fans.</p>
          </div>
          <div className="space-y-2  flex-col justify-center items-center hidden min-[500px]:flex">
            <img className="w-[110px] item bg-slate-400 rounded-full p-2" src="/group.gif" alt="" />
            <p className="text-white font-bold text-xl text-center">Community Support</p>
            <p className="text-white font-semibold text-lg hidden lg:flex">Your fans are willing to help you.</p>
          </div>
        </div>
      </div> 
      <div className="bg-white h-[1px] opacity-15">.</div>
      <div className="text-white container mx-auto py-16 ">
        <h2 className="text-2xl font-extrabold mb-8 text-center">
          Learn more about us
        </h2>
        <div className="flex justify-around">
          
        
          <div className="space-y-2 flex flex-col justify-center items-center ">
            <div className="hidden sm:flex">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/B7nEK1rE8uQ?si=t4UDkLFn-kHpg_X7" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>
            <div className="sm:hidden flex">
            <iframe width="300" height="168" src="https://www.youtube.com/embed/B7nEK1rE8uQ?si=t4UDkLFn-kHpg_X7" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>
            <p className="text-white font-bold text-xl">Our Social Media</p>
            <p className="text-white font-semibold text-lg text-center">Your can visit our Social media via YouTube.</p>
          </div>
        
        </div>
      </div>
       <div className="bg-white h-[1px] opacity-15">.</div>

    </>
  );
}
