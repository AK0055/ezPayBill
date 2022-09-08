import Head from 'next/head'
import Image from 'next/image'
import scam from '../public/cam.jpg'
import ap from '../public/ap.jpg'
import sl from '../public/sl.jpg'
import sc from '../public/sc.jpg'
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
  const prodhandler1=()=> {
    prodType.prodtype='Smart Camera'
    router.push('/scam')
  }
  const prodhandler2=()=> {
    prodType.prodtype='Smart Purifiers'
    router.push('/airp')
  }
  const prodhandler3=()=> {
    prodType.prodtype='Smart lights'
    router.push('/tv')
  }
  const prodhandler4=()=> {
    prodType.prodtype='Smart cleaners'
    router.push('/laptop')
  }
  const prodhandler5=()=> {
    prodType.prodtype='Accessory'
    router.push('/accy')
  }
  return (
    <div class="dark:bg-gray-800 text-gray-900 dark:text-white">
      <Head>
        <title>Products</title>
        {console.log(storedet.name)}
        <link rel="icon" href="/mistore.png" />
      </Head>
      <Navbar/>
      <div >

      <h1 class="p-5 mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">Choose a <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Smart product</span> Type</h1>


        {/* <p className="description">
          Get started by choosing your store type 
        </p> */}

<div className={styles.grid}>
          <a  onClick={prodhandler2} className={styles.card}>
            <h3>Smart Cameras</h3>
            <Image
            src={scam}
            alt="Smartcam"
            width={225} 
            height={225} 
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
          />
  
          </a>
          
          
          <a onClick={prodhandler3} className={styles.card}>
            <h3>Smart Purifiers</h3>
            <Image
            src={ap}
            alt="Smart Purifiers"
            width={225} 
            height={225}
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
          />
  
          </a>
          <a onClick={prodhandler4} className={styles.card}>
            <h3>Smart Lights</h3>
            <Image
            src={sl}
            alt="Smart Lights"
            width={225} 
            height={225}
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
          />
  
          </a>
          <a onClick={prodhandler5} className={styles.card}>
            <h3>Smart Cleaners</h3>
            <Image
            src={sc}
            alt="Smart Cleaners"
            width={225} 
            height={225}
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
          />
  
          </a>
        </div>
      </div>

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
