import Head from 'next/head'
import Image from 'next/image'
import mihome from '../public/mihome.png'
import mistore from '../public/mistore.png'
import Link from 'next/link'
import { useEffect,useState } from 'react';
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'
export var storeType = {
  storetype: '',
  
};
export default function Home() {
  const router = useRouter()   

  const [store,setstore]= useState('')
  const storehandler1=()=> {
    storeType.storetype='Mi Home'
    router.push('/page1')
  }
  const storehandler2=()=> {
    storeType.storetype='Mi Store'
    router.push('/page1')
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>ezpaybill</title>
        <link rel="icon" href="/mistore.png" />
      </Head>

      <main className={styles.main}>
      <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">ezPayBill</span></h1>


        <p class="max-w-lg text-2xl font-semibold leading-loose text-gray-900">
          Choose your Store type 
        </p>

        <div className={styles.grid}>
          <a  onClick={storehandler1} className={styles.card}>
            <h3 class="font-semibold">Mi Home</h3>
            <Image
            src={mihome}
            alt="Mi home"
            width={225} 
            height={225} 
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
          />
        
          </a>
          
          
          <a onClick={storehandler2} className={styles.card}>
            <h3 class="font-semibold">Mi Store</h3>
            <Image
            src={mistore}
            alt="Mi store"
            width={225} 
            height={225}
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
          />
  
          </a>
          
         
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://www.mi.com/in/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/mistore.png" alt="Mi" className={styles.logo}/>
        </a>
      </footer>

      
    </div>
  )
}
