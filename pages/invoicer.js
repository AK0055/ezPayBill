import Head from 'next/head'
import {storedet} from "../comps/storedetails";
import { motion } from 'framer-motion';
import {useState,useEffect } from 'react';
import { useRouter } from 'next/router'
import Footer from "./Footer";
import Navbar from "./Navbar";
import {cart} from "../comps/carter";
import {invos} from "../comps/invos";
import {tarprodarr} from "../comps/invoprod";
import {miscinvo} from "../comps/miscinvo";
import { ref, getDownloadURL, uploadBytesResumable,uploadString } from "firebase/storage";
import nodemailer from 'nodemailer'
import {cstoredet} from "../comps/cstoredetails";
import {paydetails} from "../comps/paymentdet";
import easyinvoice from "easyinvoice";
import { storage } from '../comps/firebaser';
import {setImmediate} from 'timers'
import { SMTPClient } from 'emailjs';
import {status} from "../comps/status";

import {
    
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
    TimeStamp,doc, setDoc
  } from "firebase/firestore";
  import {
    auth,db,
  } from "../comps/firebaser";
  export var pdfurl='';
export default function Home() {
  
  
  const router = useRouter()   
  const [total,settotal]= useState(0)
  const [items,setitems]= useState(0)
  const [carter,setcarter]= useState(false)
  const [dup,setdup]= useState(false)
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const [clicked, setclicked]=useState(false);
  const [usern,setUsern]=useState('User')
  const [state, setstate] = useState(0)
  const [sent, setsent] = useState(false)
  const [email, setemail] = useState('')
  var arr=[]
  var arr1=[]
  var vals=[]
  var set;
  const getemail=(user)=>{
    try{
      console.log(user)
      if(user.email!=null){
        const emailarr = user.email.split("@");
        var curruser= emailarr[0];
        setUsern(curruser)
        console.log(usern)
      }

    }

    catch (TypeError) {
      const user =  auth.currentUser;
      console.log(user)
     
    }
  }
  const mailer=(url)=>{
    var e= cstoredet.em==''? email : cstoredet.em
    let data1 = {
        name:'ezPayBill',
        email:e,
        message: url,
        order: miscinvo.order
    }
    fetch('/api/email', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data1)
      }).then((res) => {
          console.log('Response received')
          if (res.status === 200) {
              console.log('Response succeeded!')
              setsent(true)
              /* setSubmitted(true) 
              setName('')
              setEmail('')
              setMessage('') */
          }
          else{setsent(false)}
      })
  }
  const firster=()=>{
    const user =  auth.currentUser;
        getemail(user);
    console.log(tarprodarr)
    console.log(cstoredet)
    console.log(storedet)
    console.log(paydetails)
    

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
  const checkouter=()=> {
    router.push('/checkout')
  }
  var data = {
    // Customize enables you to provide your own templates
    // Please review the documentation for instructions and examples
    "customize": {
        //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html 
    },
    "images": {
        // The logo on top of your invoice
        "logo": "https://content3.jdmagicbox.com/comp/kolkata/t4/033pxx33.xx33.160906105605.s6t4/catalogue/qdigi-services-ltd-chandni-chowk-kolkata-mobile-phone-repair-and-services-z6urqcxe7z-250.jpg",
        // The invoice background
       
    },
    // Your own data
    "sender": {
        "company": storedet.name,
        "address": storedet.street,
        "zip": storedet.zip.toString(),
        "city": storedet.city,
        "country": storedet.country

    },
    // Your recipient
    "client": {
        "company": cstoredet.name,
        "address": cstoredet.street,
        "zip": cstoredet.zip,
        "city": cstoredet.city,
        "country": cstoredet.country
    },
    "information": {
        // Invoice number
        "number": miscinvo.order,
        // Invoice date
        "date": miscinvo.time,
        // Invoice due date
        "due-date": "-",
        "tax":0
    },
    // The products you would like to see on your invoice
    // Total values are being calculated automatically
    "products": arr1,
    // The message you would like to display on the bottom of your invoice
    "bottom-notice": "Your order is purchased via "+cstoredet.del+" mode",
    // Settings to customize your invoice
    "settings": {
        "currency": "INR", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
        // "locale": "nl-NL", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')
        "tax-notation": 'gst', // Defaults to 'vat'
        // "margin-top": 25, // Defaults to '25'
        // "margin-right": 25, // Defaults to '25'
        // "margin-left": 25, // Defaults to '25'
        // "margin-bottom": 25, // Defaults to '25'
         "format": "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
        // "height": "1000px", // allowed units: mm, cm, in, px
        // "width": "500px", // allowed units: mm, cm, in, px
         "orientation": "portrait", // portrait or landscape, defaults to portrait
    },
    
};

const runez=()=>{
    arr = tarprodarr.filter((x)=> {
        return x.oid ==miscinvo.order
      });
      console.log('inputer',arr)
      arr.map(data => {
        var temp = {
            "quantity": data.items.quantity,
            "description": data.items.description,
            "price": data.items.price
          }
          //console.log(data)
          arr1.push(temp)
      })
      //var set = new Set(arr1);
      //vals=set.entries
      console.log(arr1)
    easyinvoice.createInvoice(data, function (result) {
        try{
        //The response will contain a base64 encoded PDF file
        console.log('downloading');
        result.calculations.total=result.calculations.subtotal
        console.log(result.calculations.total,result.calculations.subtotal)

        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+time;
        var filename='invo'+dateTime+'.pdf'
        easyinvoice.download(filename, result.pdf);
        if(status.online){
        const file=result.pdf
        
        const storageRef = ref(storage, `${usern}/${filename}`);
        var dataurl = 'data:application/pdf;base64,'+file
        const createdAt = dateTime;
           console.log('inside adddoc') 
           
           
            
        uploadString(storageRef, dataurl, 'data_url').then((snapshot) => {
            console.log('Uploaded a data url');
            getDownloadURL(snapshot.ref).then((downloadURL) => {
                setImgUrl(downloadURL);pdfurl=downloadURL
                console.log(pdfurl)
                window.open( 
                    downloadURL, "_blank"); 
                mailer(downloadURL)
                try {
                    const usernow=auth.currentUser.uid
                    const collectionRef = collection(db, usernow);
    
                    addDoc(collectionRef, {
                    url: pdfurl, 
                    time: createdAt
                    });
                    
                  } catch (e) {
                    console.error("Error adding document: ", e);
                  }

          });
    });
}
    }
        catch(err) {console.log(err)}
    
    }); 
}
  return (
    <div class="w-screen h-screen dark:bg-gray-800 text-gray-900 dark:text-white">
      <Head>
        <title>Invoices</title>
        
        <link rel="icon" href="/mistore.png" />
      </Head>
      <Navbar data={state}/>
      <div >

      <h1 class="p-5 mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-3xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Invoice for {miscinvo.order} {sent && email && `has been sent to `+email}</span></h1>
      {status.online && cstoredet.em=='' && <div class="p-5">
    <label for="em" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email ID to send Invoice</label>
    <input onChange={(e) => setemail(e.target.value)} type="text" id="em" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="someone@example.com" required/>
    </div>}
      </div>
      <div class="p-7">
        <button onClick={runez} type="button" class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300
         font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none
          dark:focus:ring-blue-800">
    Get invoice
</button>


     </div>

       <Footer/>
   
    </div>
    
  )
}