import Head from 'next/head'
import Image from 'next/image'
import sp from '../public/sp.jpg'
import tv from '../public/tv.jpg'
import lap from '../public/lap.jpg'
import acc from '../public/acc.jpg'
import {storedet} from "../comps/storedetails";

import mistore from '../public/mistore.png'
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
  const prodhandler2=()=> {
    prodType.prodtype='Smartphone'
    router.push('/sphone')
  }
  const prodhandler3=()=> {
    prodType.prodtype='TV'
    router.push('/tv')
  }
  const prodhandler4=()=> {
    prodType.prodtype='Laptop'
    router.push('/laptop')
  }
  const prodhandler5=()=> {
    prodType.prodtype='Accessory'
    router.push('/accy')
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

      <h1 class="p-5 mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">Choose a <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Product</span> Type</h1>


        {/* <p className="description">
          Get started by choosing your store type 
        </p> */}

<div className={styles.grid}>
          <a  onClick={prodhandler2} className={styles.card}>
            <h3>Smartphones</h3>
            <Image
            src={sp}
            alt="Smartphones"
            width={225} 
            height={225} 
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
          />{/* <br/>
                  <button type="button" class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg></button>
                  <span class="text-lg font-medium text-gray-900 line-through dark:text-white">$109</span><span class="ml-3 text-lg font-medium">$79</span>
 */}
          </a>
          
          
          <a onClick={prodhandler3} className={styles.card}>
            <h3>TVs</h3>
            <Image
            src={tv}
            alt="TVs"
            width={225} 
            height={225}
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
          />
  
          </a>
          <a onClick={prodhandler4} className={styles.card}>
            <h3>Laptops</h3>
            <Image
            src={lap}
            alt="Laptops"
            width={225} 
            height={225}
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
          />
  
          </a>
          <a onClick={prodhandler5} className={styles.card}>
            <h3>Accessories</h3>
            <Image
            src={acc}
            alt="Accessories"
            width={225} 
            height={225}
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
          />
  
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
        {/* <div className={styles.container}>
      <Head>
        <title>ezPayBill</title>
        <link rel="icon" href="/mistore.png" />
      </Head>

      <main className={styles.main}>

        <p class="font-sans hover:font-serif">
          Choose product category
        </p>

        
      </main>
      
    </div> */}
    </div>
    
  )
}
