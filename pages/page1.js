import Head from 'next/head'
import Image from 'next/image'
import mihome from '../public/mihome.png'
import mistore from '../public/mistore.png'
import Link from 'next/link'
import { useEffect,useState } from 'react';
import {storeType} from "./index";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Home() {

  return (
    <div class="dark:bg-gray-800 text-gray-900 dark:text-white">
      <Head>
        <title>{storeType.storetype}</title>
        <link rel="icon" href="/mistore.png" />
      </Head>
      <Navbar/>
      <div >

      <h1 class="p-5 mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">More about your <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Store</span></h1>


        {/* <p className="description">
          Get started by choosing your store type 
        </p> */}

        <div className="p-10 grid gap-6 mb-6 lg:grid-cols-2  text-gray-900 dark:text-white">
        <label for="Store Name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Store Name</label>
        <input onChange={(e) => setcompany(e.target.value)} type="text" id="ccompany" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Store Name" required/>
        <label for="POS ID" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">POS ID</label>
        <input onChange={(e) => setcompany(e.target.value)} type="text" id="ccompany" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="POS ID" required/>
         
        </div>
      </div>

      <Footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel" className="logo" />
        </a>
      </Footer>

    </div>
  )
}
