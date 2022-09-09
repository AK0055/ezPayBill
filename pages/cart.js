import Head from 'next/head'
import {storedet} from "../comps/storedetails";
import { Menu } from '@headlessui/react'
import {Transition } from '@headlessui/react'
import { Fragment,useRef} from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { motion } from 'framer-motion';
import {useState,useEffect } from 'react';
import { useRouter } from 'next/router'
import Footer from "./Footer";
import Navbar from "./Navbar";
import {cart} from "../comps/carter";

export default function Home() {
  
  
  const router = useRouter()   
  const [total,settotal]= useState(0)
  const [items,setitems]= useState(0)
  const [carter,setcarter]= useState(false)
  
  const [state, setstate] = useState(0)
  
  const firster=()=>{
    console.log(cart.det)
    //if (cart.det.price){
        try{
            settotal(cart.det.map(item => item.details.price).reduce((prev, next) => prev + next))
        setitems(cart.det.length)
        }
        catch(err){
            console.log(err)
        }
        
   // }
    
  } 
  useEffect( firster,[])
  
  const previouspager=()=> {
    console.log(cart)
    router.back()
  }
  
  return (
    <div class="dark:bg-gray-800 text-gray-900 dark:text-white">
      <Head>
        <title>Products</title>
        
        <link rel="icon" href="/mistore.png" />
      </Head>
      <Navbar data={state}/>
      <div >

      <h1 class="p-5 mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Your Cart</span></h1>
      </div>
<div class="p-7">
      <div class="p-4 w-full max-w-md bg-white rounded border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
    <div class="flex justify-between items-center mb-4">
        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Items ({cart.count})</h5>
        
            <motion.div whileTap={{
                  scale: 0.9,
                  borderRadius: "100%"

              }}>
   <button class="text-lg font-bold text-blue-600  dark:text-blue-500">
            
            Checkout (₹ {total})
            </button>
</motion.div>
   </div>
   <div class="flow-root">
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
        {console.log(cart)}
        { cart.det.map(data => (
            data && 
         <li class="py-3 sm:py-4">
        <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
                <img class="w-12 h-12 rounded" src={data.details.img} alt="Product"/>
            </div>
            <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                {data.name} ({data.details.col})
                </p>
                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                Quantity: {data.details.qty}
                </p>
            </div>
            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            ₹ {data.details.price}
            </div>
        </div>
    </li>
      ))}
            
           
        </ul>
   </div>
</div>
</div>
<div class="p-5">
<button onClick={previouspager} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg></button>
</div>
      <Footer>
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/mihome.png" alt="mi" className="logo" />
        </a>
      </Footer>
    
    </div>
    
  )
}