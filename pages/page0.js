import Head from 'next/head'
import Image from 'next/image'
import mihome from '../public/mihome.png'
import mistore from '../public/mistore.png'
import Link from 'next/link'
import { useEffect,useState } from 'react';
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'
import {status} from "../comps/status";
import {paydetails} from "../comps/paymentdet";
import {cart} from "../comps/carter";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../comps/firebaseconfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, signOut,onAuthStateChanged } from "firebase/auth";
import {tarprodarr} from "../comps/invoprod";

import {
    auth,db,
  } from "../comps/firebaser";
  import { doc, setDoc,getDoc, deleteDoc ,Timestamp } from "firebase/firestore"; 
export var storeType = {
  storetype: '',
  
};
export default function Home() {
  const router = useRouter()   

  const [store,setstore]= useState('')
  const [user,setuser]= useState('Guest')

  const storehandler1=()=> {
    storeType.storetype='Mi Home'
    router.push('/page1')
  }
  const storehandler2=()=> {
    storeType.storetype='Mi Store'
    router.push('/page1')
  }
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
  const firster=()=>{
    const user =  auth.currentUser;
    console.log(user)
    try{
    if(user.email!=null){
    const emailarr = user.email.split("@");
    var uname= emailarr[0];}
    }catch (TypeError) {
      const user =  auth.currentUser;
      console.log(user)
     
    }
    
    
    console.log(uname)
    setuser(uname)
    if(status.online){
      var payob={
        vals:paydetails
      }
      var len=paydetails.length
      console.log(len)
      getDoc(doc(db, uname, "cart")).then(docSnap => {
        if (docSnap.exists() && docSnap.data().count==0) {
          console.log("Document data:", docSnap.data());
          setDoc(doc(db, uname, "cart"), cart);
          //const returnedclient = Object.assign(cart,docSnap.data());
          console.log("Document data:", docSnap.data());
          //setitems(cart.count)
        } 
        else if(docSnap.exists() && cart.count==0){
          const returnedclient = Object.assign(cart,docSnap.data());
          console.log("Document data:", docSnap.data());
          console.log(cart)
          //setitems(cart.count)
  
        }
        else {
          console.log("No such document!");
          console.log("Document data:", docSnap.data());
          setDoc(doc(db, uname, "cart"), cart);
          console.log("Document data:", docSnap.data());
          //setitems(cart.count)
        }
      })
    getDoc(doc(db, uname, "orders")).then(docSnap => {
      if (docSnap.exists() && docSnap.data().vals.length==1) {
        console.log("Document data:", docSnap.data());
        setDoc(doc(db, uname, "orders"), payob);
        //const returnedclient = Object.assign(cart,docSnap.data());
        console.log("Document data:", docSnap.data());
      } 
      else if(docSnap.exists() && len==1){
        const returnedclient = Object.assign(paydetails,docSnap.data().vals);
        console.log("Document data:", docSnap.data());
        console.log(paydetails)

      }
      else {
        console.log("No such document!");
        console.log("Document data:", docSnap.data());
        setDoc(doc(db, uname, "orders"), payob);
        console.log("Document data:", docSnap.data());
      }
    })
    var itob={
        vals:tarprodarr
      }
      var len=tarprodarr.length
      console.log(len)
    getDoc(doc(db, uname, "prods")).then(docSnap => {
      if (docSnap.exists() && docSnap.data().vals.length==1) {
        console.log("Document data:", docSnap.data());
        setDoc(doc(db, uname, "prods"), itob);
        //const returnedclient = Object.assign(cart,docSnap.data());
        console.log("Document data:", docSnap.data());
      } 
      else if(docSnap.exists() && len==1){
        const returnedclient = Object.assign(tarprodarr,docSnap.data().vals);
        console.log("Document data:", docSnap.data());
        console.log(tarprodarr)
  
      }
      else {
        console.log("No such document!");
        console.log("Document data:", docSnap.data());
        setDoc(doc(db, uname, "prods"), itob);
        console.log("Document data:", docSnap.data());
      }
    })
  }
}
useEffect( firster,[])
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
        {status.online ? 
        <a
          href="https://www.mi.com/in/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {user && <span>{user} is {status.online ?`Online`:`Offline`}</span>}
          <img src="/mistore.png" alt="Mi" className={styles.logo}/>
        </a>
        : <span>Offline Mode</span>
    }
        <span onClick={logout} class=" px-5 text-base justify-between text-gray-500 dark:text-gray-400 md:items-end sm:text-center lg-hidden">
    Logout
    </span>
      </footer>

      
    </div>
  )
}
