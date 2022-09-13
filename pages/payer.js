import Head from 'next/head'
import {cstoredet} from "../comps/cstoredetails";
import { motion } from 'framer-motion';
import {useState,useEffect } from 'react';
import { useRouter } from 'next/router'
import Footer from "./Footer";
import Navbar from "./Navbar";
import {cart} from "../comps/carter";
import https from 'https'
import Script from 'next/script'
import {merchantCheckoutFile} from '../comps/chkout'

import PaytmChecksum from '../comps/PaytmChecksum'
export var datag = { mid: '', amount: '', order: '', txntoken: '' }
export default function Home() {
  const router = useRouter()   
  const [paymentData,setPaymentData]= useState({
        token: "", 
        order: "", 
        mid: "",
        amount: ""
  })
  const [items,setitems]= useState(0)
  const [carter,setcarter]= useState(false)
  const [state, setstate] = useState(0)
  const [txn, settxn] = useState('')
  const [purch,setpurch]=useState(false)
  const firster=()=>{
    
    merchantCheckoutFile();
    console.log(cstoredet.total)
    let orderId = "ORD" + new Date().getTime();
   // Sandbox Credentials
   let mid = "VhbDgR06153110234284"; // Merchant ID
   let mkey = "sqH%hL3TWRgaua30"; // Merchant Key
   var paytmParams = {};
 
   paytmParams.body = {
     requestType: "Payment",
     mid: "VhbDgR06153110234284",
     websiteName: "WEBSTAGING",
     orderId: orderId,
     callbackUrl: "http://localhost:3000/",
     txnAmount: {
       value: cstoredet.total,
       currency: "INR",
     },
     userInfo: {
       custId: "CUS" + new Date().getTime(),
     },
   };
 
   PaytmChecksum.generateSignature(
     JSON.stringify(paytmParams.body),
     mkey
   ).then(function (checksum) {
     console.log(checksum);
     paytmParams.head = {
       signature: checksum,
     };
 
     var post_data = JSON.stringify(paytmParams);
 
     var options = {
       /* for Staging */
       // hostname: "securegw-stage.paytm.in" /* for Production */,
 
       hostname: "securegw-stage.paytm.in",
 
       port: 443,
       path: `/theia/api/v1/initiateTransaction?mid=VhbDgR06153110234284&orderId=${orderId}`,
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         "Content-Length": post_data.length,
       },
     };
 
     var response = "";
     var post_req = https.request(options, function (post_res) {
       post_res.on("data", function (chunk) {
         response += chunk;
       });
       post_res.on("end", function () {
         console.log("Response: ", response);
         // res.json({data: JSON.parse(response), orderId: orderId, mid: mid, amount: amount});
         
           datag.txntoken= JSON.parse(response).body.txnToken
           datag.order= orderId
           datag.mid= mid
           datag.amount= 
           setPaymentData({
            ...paymentData,
            token: JSON.parse(response).body.txnToken, 
            order: orderId, 
            mid: mid,
            amount: cstoredet.total
        })
       });
     });
     console.log(paymentData);
     post_req.write(post_data);
     post_req.end();
   });
   
  } 
  useEffect( firster,[])
  
  const previouspager=()=> {
    console.log(cart)
    router.back()
  }
  const order=()=> {
    var config = {
        "root":"",
        "style": {
          "bodyBackgroundColor": "#fafafb",
          "bodyColor": "",
          "themeBackgroundColor": "#0FB8C9",
          "themeColor": "#ffffff",
          "headerBackgroundColor": "#284055",
          "headerColor": "#ffffff",
          "errorColor": "",
          "successColor": "",
          "card": {
            "padding": "",
            "backgroundColor": ""
          }
        },
        "data": {
          "orderId": paymentData.order ,
          "token": paymentData.token,
          "tokenType": "TXN_TOKEN",
          "amount": paymentData.amount /* update amount */
        },
        "payMode": {
          "labels": {},
          "filter": {
            "exclude": []
          },
          "order": [
              "CC",
              "DC",
              "NB",
              "UPI",
              "PPBL",
              "PPI",
              "BALANCE"
          ]
        },
        "website": "WEBSTAGING",
        "flow": "DEFAULT",
        "merchant": {
          "mid": "VhbDgR06153110234284",
          "redirect": false
        },
        "handler": {
          "transactionStatus":
function transactionStatus(paymentStatus){
            console.log(paymentStatus);
            settxn(paymentStatus.STATUS)
            if (txn=="TXN_FAILURE")
            router.reload('/payer')
            if(txn=="TXN_SUCCESS"){
                cart.purch=true
                setpurch(true)
                setstate(0)
            }
            else{
                cart.purch=false
                setpurch(false)
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
            }
          },
          "notifyMerchant":
function notifyMerchant(eventName,data){
    console.log("notifyMerchant handler function called");
    console.log("eventName => ",eventName);
    console.log("data => ",data);
          }
        }
    };
   console.log(config.data)
    if (Paytm && Paytm.CheckoutJS) {
        Paytm.CheckoutJS.init(config).
then(function onSuccess() {
    Paytm.CheckoutJS.invoke();
    console.log('Server communicated successfully')
}).catch(function onError(error) {
  console.log("Error => ", error);
  //router.reload('/payer')
});
}

  }
  
 

  return (
    
    <div class=" dark:bg-gray-800 text-gray-900 dark:text-white">
              <Script src="https://securegw-stage.paytm.in/merchantpgpui/checkoutjs/merchants/.js" />

      <Head>
        <title>Products</title>
        
        <link rel="icon" href="/mistore.png" />
      </Head>   
      <Navbar data={state}/>
{txn=="" && <div class="p-5">
<h1 class="p-5 mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Payment Gateway</span></h1>
      <button onClick={order} type="button" 
    class=" text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg 
    text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">
        Proceed to pay</button>
    
    </div>}
      
      {txn=="TXN_FAILURE" && 
      <div class="p-5">
      <h1 class="p-5 mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">There was an error in the payment server</span></h1>
      <button onClick={order} type="button" 
      class=" text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg 
      text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">
          Try Again</button>
          </div>
          }      
{txn=="TXN_SUCCESS" && 
<h1 class="p-5 mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Your Order has been purchased</span></h1>

        }


      
<div class="px-5 justify-between ">
      <button onClick={previouspager} type="button" class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg></button>
      

      </div>    
      <Footer/>
    
    </div>
    
  )
}