import useDarkMode from "../comps/useDarkMode";
import Link from 'next/link'
/* import { initializeApp } from "firebase/app";
import firebaseConfig from "../comps/firebaseconfig"; */
import { useRouter } from 'next/router'
import { motion } from 'framer-motion';
import {storeType} from "./index";
import { useEffect,useState } from 'react';
import {cart} from '../comps/carter'
/* import {
  auth,
  db
} from "../comps/firebaser"; */
/* import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, signOut,onAuthStateChanged } from "firebase/auth"; */
export default function Navbar(props) {
  if (storeType.storetype=='Mi Store') var name='/mistore.png'
  else var name='/mihome.png'
    const [colorTheme, setTheme] = useDarkMode();
    const [carter, setcarter] = useState(0)
    const [carth, setcarth] = useState(false)
    /* const [user, loading, error] = useAuthState(auth); */
    const router = useRouter();
    const logout = () => {
        /* const app = initializeApp(firebaseConfig);
        const auth = getAuth();
        signOut(auth); */
        router.push('/');
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

            {colorTheme === "light" ? (
             
        <button type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
        <svg
          onClick={() => setTheme("light")}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg></button>
      ) : (
        <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">

        <svg
          onClick={() => setTheme("dark")}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg></button>
        
      )}
            
            <Link href="/">
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
            {/* {router.pathname=='/summary' &&
            <div class="flex flex-row md:order-3 ">
        
            <button onClick={order} type="button" 
              class=" text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg 
              text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">
                Place Order</button>
                </div> } */}
                <div class="flex md:order-3 ">
                <button onClick={cartpage} type="button" class="flex flex-row text-lg text-black bg-green-200 hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg  px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"><img src="https://img.icons8.com/material-rounded/24/000000/shopping-cart.png"/>({cart.count})</button>
                </div>    
                <div class="flex md:order-3 "> 
                <button onClick={logout} type="button" class="text-main text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Logout</button>
                
            </div>
            {/* <button data-collapse-toggle="mobile-menu" type="button" class="md:hidden ml-3 text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg inline-flex items-center justify-center" aria-controls="mobile-menu-2" aria-expanded="false">
      <span class="sr-only">Open main menu</span>
      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
      <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </button>
    <div class="hidden md:block w-full md:w-auto" id="mobile-menu">
      <ul class="flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium">
        <li>
          <a href="#" class="bg-blue-700 md:bg-transparent text-white block pl-3 pr-4 py-2 md:text-blue-700 md:p-0 rounded" aria-current="page">Home</a>
        </li>
        <li>
          <a href="#" class="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0">About</a>
        </li>
        
      </ul>
    </div> */}
   
            <div class="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-4">
              <ul class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                <li>
                  <Link href='/'>
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