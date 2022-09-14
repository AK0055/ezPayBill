import Head from 'next/head'
import {storedet} from "../comps/storedetails";
import { motion } from 'framer-motion';
import {useState,useEffect } from 'react';
import { useRouter } from 'next/router'
import Footer from "./Footer";
import Navbar from "./Navbar";
import {cart} from "../comps/carter";
import {paydetails} from "../comps/paymentdet";

export default function Home() {
  
  
  const router = useRouter()   
  const [total,settotal]= useState(0)
  const [items,setitems]= useState(0)
  const [carter,setcarter]= useState(false)
  
  const [state, setstate] = useState(0)
  
  const firster=()=>{
    console.log(cart.det)
        try{
          if(cart.purch==false){
            settotal(cart.det.map(item => item.details.price).reduce((prev, next) => prev + next))
            setitems(cart.det.length)
          }
          else{
            settotal(0)
            setitems(0)       
          }
        }
        catch(err){
            console.log(err)
        } 
  } 
  useEffect( firster,[])
  
  const previouspager=()=> {
    console.log(paymentdetails)
    router.back()
  }
  const checkouter=()=> {
    router.push('/checkout')
  }
  
  return (
    <div class="w-screen h-screen dark:bg-gray-800 text-gray-900 dark:text-white">
      <Head>
        <title>Products</title>
        
        <link rel="icon" href="/mistore.png" />
      </Head>
      <Navbar data={state}/>
      <div >

      <h1 class="p-5 mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Your Orders</span></h1>
      </div>
      <div class="p-5">
      <div class="p-5 w-full max-w-md bg-white rounded border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
    <div class="flex justify-between items-center mb-4">
        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white sdark:text-white">Orders</h5>
        
            <div>
   <span class="text-lg font-bold text-blue-600  dark:text-blue-500 ">
            
            Amount
            </span>
</div>
   </div>
   <div class="flow-root">
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
        {console.log(cart)}
        { paydetails.map(data => (
            data.order && 
         <li class="py-3 sm:py-4">
        <div class="flex items-center space-x-4">
            
        <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                {data.order} 
                </p>
                <p class="text-sm font-bold text-gray-500 truncate dark:text-gray-400">
                Time: {data.time}
                </p>
                <p class="text-sm font-bold text-gray-500 truncate dark:text-gray-400">
                Customer: {data.cust}
                </p>
                <p class="text-sm font-bold text-gray-500 truncate dark:text-gray-400">
                POS ID: {data.pos}
                </p>
            </div>
            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            ₹ {data.amount}
            </div>
           {/*  <button  type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
             focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Remove</button> */}

        </div>
    </li>
      ))}
            
           
        </ul>
   </div>

</div>
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