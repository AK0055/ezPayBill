import Head from 'next/head'
import {storedet} from "../comps/storedetails";
import { motion } from 'framer-motion';
import {useState,useEffect } from 'react';
import { useRouter } from 'next/router'
import Footer from "./Footer";
import Navbar from "./Navbar";
import {cart} from "../comps/carter";
import { doc, setDoc,getDoc, deleteDoc ,Timestamp } from "firebase/firestore"; 
import {status} from "../comps/status";

import {
  auth,db,
} from "../comps/firebaser";
export default function Home() {
  
  
  const router = useRouter()   
  const [total,settotal]= useState(0)
  const [items,setitems]= useState(0)
  const [carter,setcarter]= useState(false)
  const [usern,setUsern]=useState('User')

  const [state, setstate] = useState(0)
  const getemail=(user)=>{
    var uname;
    try{
      console.log(user)
      if(user.email!=null){
        const emailarr = user.email.split("@");
        var curruser= emailarr[0];
        console.log(curruser)
        setUsern(curruser)
        uname=curruser
        console.log(usern)
        return uname
      }

    }

    catch (TypeError) {
      const user =  auth.currentUser;
      console.log(user)
     
    }
  }

  const firster=()=>{
    const user =  auth.currentUser;
   var uname=getemail(user)
    console.log(cart.det)
    console.log(uname)
    if(status.online){
    getDoc(doc(db, uname, "cart")).then(docSnap => {
      if (docSnap.exists() && docSnap.data().count==0) {
        console.log("Document data:", docSnap.data());
        setDoc(doc(db, uname, "cart"), cart);
        //const returnedclient = Object.assign(cart,docSnap.data());
        console.log("Document data:", docSnap.data());
        setitems(cart.count)
      } 
      else if(docSnap.exists() && cart.count==0){
        const returnedclient = Object.assign(cart,docSnap.data());
        console.log("Document data:", docSnap.data());
        console.log(cart)
        setitems(cart.count)

      }
      else {
        console.log("No such document!");
        console.log("Document data:", docSnap.data());
        setDoc(doc(db, uname, "cart"), cart);
        console.log("Document data:", docSnap.data());
        setitems(cart.count)
      }
    })
  }
        try{
          if(cart.purch==false){
            settotal(cart.det.map(item => item.details.price).reduce((prev, next) => prev + next))
            setitems(cart.det.length)
            
            

          }
          else{
            settotal(0)
            setitems(0)       
          }
        }
        catch(err){
            console.log(err)
        } 
  } 
  useEffect( firster,[])
  
  const previouspager=()=> {
    console.log(cart)
    router.back()
  }
  const removeall=()=> {
    const user =  auth.currentUser;
   var uname=getemail(user)
    console.log(cart)
    settotal(0)
    setitems(0)
    deleteDoc(doc(db, uname, "cart"));  
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
    //router.back()
  }
  const checkouter=()=> {
    cart.det = cart.det.filter((x)=>{return x.name != ''});

    function check(x) {
      return x['description'] != ''
    }
    if(total>0)
    router.push('/checkout')
  }
  
  return (
    <div class=" h-screen dark:bg-gray-800 text-gray-900 dark:text-white">
      <Head>
        <title>Products</title>
        
        <link rel="icon" href="/mistore.png" />
      </Head>
      <Navbar data={state}/>
      

      {items==0 ? 
      <div>
      <h1 class="p-5 mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Your Cart is empty</span>
        </h1>
        <p class="px-5 max-w-3xl text-lg lg:text-xl font-semibold leading-loose text-gray-900 dark:text-white">
      Explore products and Add to Cart
        </p> 
      </div>
      :
      <div > 
      <h1 class="p-5 mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Your Cart</span></h1>
      <div class="p-7">
      <div class="p-4 w-full max-w-md bg-white rounded border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
    <div class="flex justify-between items-center mb-4">
        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Items ({cart.count})</h5>
        
            <motion.div whileTap={{
                  scale: 0.9,
                  borderRadius: "100%"

              }}>
   <button onClick={checkouter} class="text-lg font-bold text-blue-600  dark:text-blue-500 hover:underline">
            
            Checkout (₹ {total})
            </button>
</motion.div>
   </div>
   <div class="flow-root">
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
        {console.log(cart)}
        { cart.det.map(data => (
            data && 
         <li class="py-3 sm:py-4">
        <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
                <img class="w-12 h-12 rounded" src={data.details.img} alt="Product"/>
            </div>
            <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 break-words dark:text-white">
                {data.name} ({data.details.col})
                </p>
                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                Quantity: {data.details.qty}
                </p>
            </div>
            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            ₹ {data.details.price}
            </div>
           {/*  <button  type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
             focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Remove</button> */}

        </div>
    </li>
      ))}
            
           
        </ul>
   </div>
   {items>0 && <button onClick={removeall} type="button" class="p-5 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">Remove all</button>}

</div>
</div>
      </div>}

<div class=" grid p-5 grid-cols-2 gap-y-5 gap-x-5">
{/* <button onClick={previouspager} type="button" class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg></button>
 */}
<button onClick={()=>router.push('/page2home')} type="button" class="text-white bg-green-700 hover:bg-green-800 focus:ring-4
 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 
 focus:outline-none dark:focus:ring-green-800">
  Mi Home products
 </button>
 <button onClick={()=>router.push('/page2')} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 
 focus:outline-none dark:focus:ring-blue-800">
  Mi Store products
 </button>
 </div>
 
       <Footer/> 
  </div> 
    
  )
}