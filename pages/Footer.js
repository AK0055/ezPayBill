import Link from 'next/link'
import { useRouter } from 'next/router'
import {cart} from '../comps/carter'
import {paydetails} from "../comps/paymentdet";

import useDarkMode from "../comps/useDarkMode";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../comps/firebaseconfig";
import {
  auth,
  db
} from "../comps/firebaser"; 
 import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, signOut,onAuthStateChanged } from "firebase/auth";
export default function Footer() {
  const [colorTheme, setTheme] = useDarkMode();
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
    console.log(paydetails)
    const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    signOut(auth);

    router.push('/login');
  
  };
return(
    <div>
        
  
<footer className="px-3
             inset-x-0
             bottom-0 bg-white shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
    
    <ul class="flex flex-wrap items-center mt-3 text-lg text-gray-500 dark:text-gray-400 sm:mt-0">
    <li class="px-3">
    <Link href='/yourorders'>Your Orders</Link>
    </li>
    <li class="px-3">
    <Link href='/page2home'>Mi Home</Link>
    </li>
    <li class="px-3 md:items-end">
    <Link href='/page2'>Mi Store</Link>
    </li>
    
    </ul>
    <div class="grid p-3 grid-cols-3 gap-y-5 gap-x-5 justify-between items-center">
    <span class=" text-base justify-between text-gray-500 sm:text-center dark:text-gray-400">
     <Link href='/page0'>  ezPayBill</Link>
    </span>
    <span onClick={logout} class=" text-base justify-between text-gray-500 dark:text-gray-400 md:items-end sm:text-center lg-hidden">
    Logout
    </span>
    {colorTheme === "light" ? (
             
             <button type="button" class=" text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
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
    
    
    </div>
    </footer>
    </div>
    
);

}
