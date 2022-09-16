import useDarkMode from "../comps/useDarkMode";
import Link from 'next/link'
import { initializeApp } from "firebase/app";
import firebaseConfig from "../comps/firebaseconfig";
import { useRouter } from 'next/router'
import { motion } from 'framer-motion';
import {storeType} from "./page0";
import { useEffect,useState } from 'react';
import {paydetails} from "../comps/paymentdet";
import {tarprodarr} from "../comps/invoprod";

import {cart} from '../comps/carter'
import {
  auth,
  db
} from "../comps/firebaser"; 
 import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, signOut,onAuthStateChanged } from "firebase/auth";
export default function Navbar(props) {
  if (storeType.storetype=='Mi Store') var name='/mistore.png'
  else var name='/mihome.png'
    const [colorTheme, setTheme] = useDarkMode();
    const [carter, setcarter] = useState(0)
    const [carth, setcarth] = useState(false)
    const [online, setonline] = useState(false)

   const [user, loading, error] = useAuthState(auth); 
    const router = useRouter();
    const logout = () => {
      var cart1 = {
        count: 0,
        added:[''],
        det:[{
            name:'demo', 
            details:{
                img:'/mihome.png',
                price:100,
                qty:1,
                col:'Red'
            }
        }],
        purch: false
      };
      const returnedclient = Object.assign(cart,cart1);
      paydetails.length=1
      tarprodarr.length=1
    console.log(paydetails)
        const app = initializeApp(firebaseConfig);
        const auth = getAuth();
        signOut(auth);
        router.push('/login');
      };
      const order=()=> {
        router.push('/order')
      }
      const cartpage = () => {
         cart.det = cart.det.filter(check);

        function check(x) {
          return x.name != 'demo'
        }  
        router.push('/cart'); 
      };
      const cartadd = () => {
        setcarter(carter+props.data)
      };
      const cartrem = () => {
        setcarter(carter-props.data)
      };
      
    return(
        
        <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
        <div class="container flex flex-wrap justify-between items-center ">
      <button onClick={()=>router.back()} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg></button>
            
            
            <Link href="/page0">
            <a class="flex items-center">
              <motion.img src={name} class="mr-3 h-6 sm:h-9" alt="MiLogo" whileHover={{ scale: 1.2, rotate: 180 }}
                whileTap={{
                  scale: 1.2,
                  rotate: -40,
                  borderRadius: "100%"

              }}/>
          
                  <h1 class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">ezPayBill</h1>
            </a>
            </Link>
            
                <div class="flex md:order-3 ">
                <button onClick={cartpage} type="button" class="flex flex-row text-lg text-black bg-green-200 hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg  px-2.5 py-2.5 text-center mr-3 md:mr-0 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                  {/* <img src="https://img.icons8.com/material-rounded/24/000000/shopping-cart.png"/>({cart.count}) */}
                  <svg class="px-1 flex-1 w-8 h-7 fill-current" viewbox="0 0 24 24">
      <path d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z"/>
      </svg>
      <span class=" rounded bg-red-600 w-5 h-6  right p-0 m-0 text-white text-lg  leading-tight text-center">{cart.count}
    </span>
                  </button>
                </div>    
                <div class="md:order-3 hidden lg:block"> 
                <button onClick={logout} type="button" class=" text-main text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Logout</button>
                
            </div>
            
   
            <div class="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-4">
              <ul class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                <li>
                  <Link href='/page0'>
                  <a  class="block py-2 pr-4 pl-3 text-lg text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Home</a>
                  </Link>
                </li>
                <li>
                    <Link href='/yourorders'>
                  <a  class="block py-2 pr-4 pl-3 text-lg text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Your Orders</a>
                      </Link>
                </li>
                
                
              </ul>
            </div>
            </div>
            
          </nav>
          
    );

}