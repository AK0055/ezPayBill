import Head from 'next/head'

import {storedet} from "../comps/storedetails";


import Link from 'next/link'
import { useEffect,useState } from 'react';
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'
import Footer from "./Footer";
import Navbar from "./Navbar";
export var prodType = {
  prodtype: '',
  
};
export default function Home() {
  const router = useRouter() 
  const previouspager=()=> {
    router.back()
  }  
  const prodhandler1=()=> {
    prodType.prodtype='Smart Camera'
    router.push('/products/scam')
  }
  const prodhandler4=()=> {
    prodType.prodtype='Smart cleaners'
    router.push('/products/sc')
  }
  return (
    <div class=" dark:bg-gray-800 text-gray-900 dark:text-white">
      <Head>
        <title>Products</title>
        {console.log(storedet.name)}
        <link rel="icon" href="/mistore.png" />
      </Head>
      <Navbar/>
      <div >

      <h1 class="p-5 mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">Choose a <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Smart product</span> Type</h1>


<div className={styles.grid}>
          <a  onClick={prodhandler1} className={styles.card}>
            <h3>Smart Cameras</h3>
            <img src='/cam.jpg' alt="Smartcam" width="225" height="225"/>

            
          </a>
  
          <a onClick={prodhandler4} className={styles.card}>
            <h3>Smart Cleaners</h3>
            <img src='/sc.jpg'  alt="Smart Cleaners" width="225" height="225"/>

           
  
          </a>
        </div>
      </div>
      <div class="p-5">
{/* <button onClick={previouspager} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg></button>
 */}</div>

      <Footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/mistore.png" alt="Vercel" className="logo" />
        </a>
      </Footer>
        
    </div>
    
  )
}
