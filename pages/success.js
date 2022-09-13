import Head from 'next/head'
import {storedet} from "../comps/storedetails";
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
    console.log(cart)
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

      <h1 class="p-5 mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Your payment was successful</span></h1>
      </div>
      <p class="p-5 max-w-lg text-2xl font-semibold leading-loose text-gray-900">
      You can now close this page
        </p> 

       {/* <Footer>
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/mihome.png" alt="mi" className="logo" />
        </a>
      </Footer>  */}
   
    </div>
    
  )
}