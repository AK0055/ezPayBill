import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect,useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { initializeApp } from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, signInAnonymously, signInWithPopup, GoogleAuthProvider,createUserWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";
import firebaseConfig from "../comps/firebaseconfig";
import { getDatabase, ref, onValue } from "firebase/database";
import {status} from "../comps/status";

import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import {
  auth,
  db
} from "../comps/firebaser";
import { motion } from 'framer-motion';

export default function Home() {
  {var [autho,setAutho]=useState('logged out');     var [email,setEmail]=useState('');  var [pwd,setPwd]=useState('');  
  
  const router = useRouter();
  var [strong,setstrong]=useState(true);
  const [user, loading, error] = useAuthState(auth);
  var [online,setonline]=useState(false);
  var [alredy,setalredy]=useState('');
  var [load,setload]=useState(false)


  useEffect(() => {
    
    if (loading) return;
    
  }, [user, loading]);  }
  const router = useRouter();
  
  
 const register = async () => {
  
//console.log(online)
  
    try {
      setload(true)
      if(pwd && pwd.length>=6){
        const res = await createUserWithEmailAndPassword(auth, email, pwd);
      const user = res.user;
      
  
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        authProvider: "local",
        email,
      });
      setalredy('')
      

      setonline(true)
      status.online=true
      router.push('/page0');
      setstrong(true)
      }
      else{
        setstrong(false)
      }
      
    } catch (err) {
      console.error(err.name);
      
      var error=err.message
      console.log(error)
      if(error=='Firebase: Error (auth/network-request-failed).'){
      setonline(false)
      setload(true)

      status.online=false
      console.log(online)
      router.push('/page0')}
        else if(error=='Firebase: Error (auth/email-already-in-use).'){
          setalredy('User exists already')
          console.log(alredy)
        }
    }
  
  
};
 
 
 
  return (
    
    <div className={styles.container}>
      
      <Head>
        <title>ezPayBill</title>
        <meta name="description" content="signuppage" />
        <link rel="icon" href="/mistore.png" />
      </Head>

      <main className={styles.main}>
      <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">

      <motion.span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400"
                whileTap={{
                  scale: 0.9,
                  

              }}>
              ezPayBill</motion.span></h1>
        
              {alredy=='' ?
        <p className={styles.description}>
           Get started by Signing up!
        </p>:
        <p className={styles.description}>
        {alredy}
     </p>
      }
        <div className={styles.grid}>
        <div class="p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div class="space-y-6">
        <h5 class="text-xl font-medium text-gray-900 dark:text-white text-center">Create an account</h5>
        <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
            <input type="email"   onChange={(e) => setEmail(e.target.value)} name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com"/>
        </div>
        <div>
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{!strong ? 'Weak password' : 'Your password'}</label>
            <input type="password" onChange={(e) => {setPwd(e.target.value); if(e.target.value.length<6 && e.target.value.length>0) setstrong(false); else if(e.target.value.length>=6 || e.target.value.length==0) setstrong(true);}} name="password" id="password" placeholder={!strong ? 'Min. 6 length needed' : '••••••••'} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"/>
        </div><br/>

        
            {/* <div class="flex items-center p-5">
                
                  
                  <button className="login-provider-button 	translate-x-10	" onClick={anonysignhandler}>
                  <motion.img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/48/undefined/external-person-100-most-used-icons-flaticons-lineal-color-flat-icons.png" alt="user icon"
                whileTap={{
                  scale: 0.7,
                  borderRadius: "100%"

              }}/>
                  </button>
                
            </div> */}
        
        <button onClick={register} class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{!load? `Sign Up` : `Loading..`}</button>
{/*         <button onClick={anonysignhandler} class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Anonymous Sign Up</button>
 */}
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
        Already a Member? 
        <Link href="/login">
        <a class="text-blue-700 hover:underline dark:text-blue-500"> Log In</a>
        </Link>
        
        </div>
        
    </div>
</div>
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
