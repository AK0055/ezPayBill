import Head from 'next/head'
import Image from 'next/image'
import mihome from '../public/mihome.png'
import mistore from '../public/mistore.png'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useEffect,useState } from 'react';
import {storeType} from "./index";
import Footer from "./Footer";
import Navbar from "./Navbar";
import {storedet} from "../comps/storedetails";

export var moreStore = {
  name: 'Xcompany',
  pos:'x09203',
  street:'21 Jump Street',
  zip: 787843,
  city:'Oslo',
  country:'Norway'
};

export default function Home() {
  const router= useRouter()

  const [name,setname]= useState('')
  const [pos,setpos]= useState('')
  const [street,setstreet]= useState('')
  const [zip,setzip]= useState(0)
  const [city,setcity]= useState('')
  const [country,setcountry]= useState('')
  const addstore=()=> {
    moreStore.name = name
    moreStore.pos= pos
    moreStore.street=street
    moreStore.zip=zip
    moreStore.city=city
    moreStore.country=country
    console.log(moreStore)
    const returnedclient = Object.assign(storedet,moreStore);
    console.log(moreStore)
  }
  const previouspager=()=> {
    //addlook();
    router.push('/')
  }
  const prodpager=()=> {
    addstore();
    if (storeType.storetype=='Mi Store') var goto='/page2'
  else var goto='/page2home'
    router.push(goto)
  }
  return (
    <div class="p-5 dark:bg-gray-800 text-gray-900 dark:text-white">
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
        <input onChange={(e) => setname(e.target.value)} type="text" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Store Name" required/>
        <label for="POS ID" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">POS ID</label>
        <input onChange={(e) => setpos(e.target.value)} type="text" id="pos" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="POS ID" required/>
          <label for="caddress" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Street</label>
          <input onChange={(e) => setstreet(e.target.value)} type="text" id="caddress" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="21 Jump Street" required/>
      
          <label for="czip" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Zip</label>
          <input onChange={(e) => setzip(e.target.value)} type="number" id="czip" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=" 9990"  required/>
      
      
          <label for="ccity" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">City</label>
          <input onChange={(e) => setcity(e.target.value)} type="text" id="ccity" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Oslo" required/>
        
      
          <label for="ccountry" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Country</label>
          <input onChange={(e) => setcountry(e.target.value)} type="text" id="ccountry" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Norway" required/>
        
        </div>
      </div>
      <div class="px-5">
      <button onClick={previouspager} type="button" class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg></button>
      <button onClick={prodpager} type="button" class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></button>

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

    </div>
  )
}
