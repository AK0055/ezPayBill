import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect,useState } from 'react';
import {storeType} from "./index";
import Footer from "./Footer";
import Navbar from "./Navbar";
import {paytype} from "../comps/paytype";

export var paytype1 = {
    paytype: '',
    Upi: '',
    cardno: '',
  };

  export default function Home() {
    const router= useRouter()
    const [pt,setpt]= useState('')
    const [upi,setupi]= useState('')
    const [card,setcard]= useState('')
    const payt=()=> {
      paytype1.paytype=pt
      paytype1.Upi=upi
      paytype1.cardno=card
      console.log(paytype1);
      const returnedclient = Object.assign(paytype,paytype1);
    }

    const previouspager=()=> {
        //addlook();
        router.back()
      }
      const nextpager=()=> {
        payt();
        console.log(paytype1);
        if(paytype1.paytype=='Cash')
          router.push('/ordersucc')
        else
          router.push('/payer')
      }
      return (
        <div class="p-5  dark:bg-gray-800 text-gray-900 dark:text-white">
          <Head>
            <title>{storeType.storetype}</title>
            <link rel="icon" href="/mistore.png" />
          </Head>
          <Navbar/>
          <div >
    
          <h1 class="p-5 mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Choose Your Payment Mode</span></h1>
        
          <div className="p-10 grid gap-6 mb-6 lg:grid-cols-2  text-gray-900 dark:text-white">
          <div>
          <label for="comm" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Paytype</label>
            <select onChange={(e) => setpt(e.target.value)} id="comm" class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>Choose a mode of contact</option>
            <option value="UPI">UPI</option>
            <option value="Card">Card</option>
            <option value="Cash">Cash</option>
            </select>
            {pt=='UPI' && 
            <div>
            <label for="wap" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">UPI ID</label>
            <input onChange={(e) => setupi(e.target.value)} type="text" id="wap" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="xxx@paytm" required/>
            </div>
           }
           {pt=='Card' && 
            <div>
            <label for="em" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Card No.</label>
            <input onChange={(e) => setcard(e.target.value)} type="text" id="em" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="5555 5555 5555 4444" required/>
            </div>
           }
           </div>
        </div>
      </div>
      <div class="px-5">
      <button onClick={previouspager} type="button" class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg></button>
      <button onClick={nextpager} type="button" class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></button>

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
