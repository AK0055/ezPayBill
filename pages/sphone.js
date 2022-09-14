import Head from 'next/head'
import {storedet} from "../comps/storedetails";
import { Menu } from '@headlessui/react'
import {Transition } from '@headlessui/react'
import { Fragment,useRef} from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { motion } from 'framer-motion';
import {useState,useEffect } from 'react';
import { useRouter } from 'next/router'
import Footer from "./Footer";
import Navbar from "./Navbar";
import {cart} from "../comps/carter";

export var product = {
    prodimg:'/sp.jpg',
    prodname:'Xiaomi 12 Pro 5G',
    prodcolor: 'Red',
    prodquan: 1,
    cart:false,
    price: 62999
    
};
export default function Home() {
  
  
  const router = useRouter()   
  const [qty,setqty]= useState(1)
  const [col,setcol]= useState('Red')
  const [carter,setcarter]= useState(false)
  const [status,setstatus]= useState('')
  const [price,setprice]= useState(product.price)
  const [state, setstate] = useState(0)
  
  const firster=()=>{
    console.log(cart.added, product.prodname)
    function check(x) {
      return x == product.prodname
    }
    if(cart.added.find(check)) {console.log('Already added');setstatus('Remove');setcarter(false)} 
    else {console.log('Not added');setstatus('Add to cart');setcarter(true)}
  } 
  useEffect( firster,[])
  const cartpage = () => {
    cart.det = cart.det.filter(check);

   function check(x) {
     return x.name != 'demo'
   }  
   router.push('/cart'); 
 };
  const previouspager=()=> {
    console.log(cart)
    router.back()
  }
  const colorsecred=()=>{
    product.prodcolor='Red'
    setcol('Red')
    console.log(product)
}
  const colorsecgreen=()=>{
    product.prodcolor='Green'
    setcol('Green')
  }
  const colorsecblue=()=>{
  product.prodcolor='Blue'
  setcol('Blue')
  }
  const togglecart=()=>{
    product.cart=carter
    console.log(carter)
    setcarter(!carter)
    
    if(carter) {addit();setstatus('Remove');
    cart.det.name = product.prodname
    cart.det.push({
      name: product.prodname,
      details:{
        img:product.prodimg,
        price:price,
        qty:qty,
        col:product.prodcolor
    }
    })

    cart.added.push(product.prodname);console.log(cart);cart.count=cart.added.length-1}

    else{remit();setstatus('Add to cart');
    cart.added = cart.added.filter(item => item !== product.prodname);cart.count=cart.added.length-1 
    console.log(cart)
    cart.det= cart.det.filter(item => item.name !== product.prodname);} 
    
    
    }
    
    const addit = () => {  
      setstate(state+1)
      
     }; 
     const remit = () => { 
      if(state>0)
      {
        setstate(state-1)
  
      } 
      
     }; 
  return (
    <div class="dark:bg-gray-800 text-gray-900 dark:text-white">
      <Head>
        <title>Products</title>
        {console.log(storedet.name)}
        <link rel="icon" href="/mistore.png" />
      </Head>
      <Navbar data={state}/>
      <div >

      <h1 class="p-5 mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Smartphones</span></h1>

<div class="p-10 w-full max-w-sm bg-white rounded-2xl shadow-md dark:bg-gray-800 dark:border-gray-700">
{status=="Remove" &&
<button onClick={cartpage} type="button" class="flex flex-row text-lg text-black dark:text-white bg-green-200 hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg  px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Go to Cart</button>
}
        <img class="p-8 rounded-t-lg" src={product.prodimg} alt="product image"/>
    

    <div class="px-5 pb-5">
        <a href="#">
            <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.prodname} ({col})</h5>
        	</a>
        <div class="flex flex-row items-center mt-2.5 mb-5">

        
        <a class = "p-2" onClick={colorsecred}>
        <svg height="20" width="20">
        <motion.circle cx="20" cy="20" r="20" stroke="black" stroke-width="1" fill="red"
                whileTap={{
                  scale: 0.7,
                  borderRadius: "100%"

              }}/>  
        
        
        </svg>
        </a>
        <a class = "p-2" onClick={colorsecgreen}>
        <svg height="20" width="20">
        <motion.circle cx="20" cy="20" r="20" stroke="black" stroke-width="1" fill="green"
                whileTap={{
                  scale: 0.7,
                  borderRadius: "100%"

              }}/>
        </svg>
        </a>
        <a class = "p-2" onClick={colorsecblue}>
        <svg height="20" width="20">
        <motion.circle cx="20" cy="20" r="20" stroke="black" stroke-width="1" fill="blue"
                whileTap={{
                  scale: 0.7,
                  borderRadius: "100%"

              }}/>
        </svg>
        </a>


<div class="p-2">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-100 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            
            {qty}
            <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button onClick={()=>{product.prodquan=1; setqty(1);setprice(1*product.price)}}
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    1
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button onClick={()=>{product.prodquan=2; setqty(2);setprice(2*product.price)}}
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    2
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button onClick={()=>{product.prodquan=3; setqty(3);setprice(3*product.price)}}
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                   3
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button onClick={()=>{product.prodquan=4; setqty(4);setprice(4*product.price)}}
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    4
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
        </div>
        <div class="flex justify-between items-center">
            <span class="text-3xl font-bold text-gray-900 dark:text-white">₹{price}</span>
            <a onClick={togglecart} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{status}</a>
        </div>
    </div>
</div>
      </div>
      <div class="p-5">
{/* <button onClick={previouspager} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg></button>
 */}</div>
      <Footer>
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/mihome.png" alt="mi" className="logo" />
        </a>
      </Footer>
    
    </div>
    
  )
}