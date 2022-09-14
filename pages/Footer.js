import Link from 'next/link'

export default function Footer() {
return(
    <div>
        {/* <nav class='content-center'>
  <ul class="place-content-center p-5 inline-flex -space-x-px">
    
    <li>
        <Link href='/mainpage'>
      <a  class="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Sender</a>
      </Link>
    </li>
    <li>
    <Link href='/main2page'>
      <a  class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Client</a>
      </Link>    </li>
    <li>
    <Link href='/products'>
      <a  class="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Products</a>
      </Link>    </li>
    
    </ul>
</nav>
<nav>
  <ul class="p-5 inline-flex -space-x-px">
  <li>
    <Link href='/invodetails'>
      <a  class="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Details</a>
      </Link>    </li>
    <li>
        <Link href='/invodetails'>
      <a  class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Details</a>
      </Link>    </li>
    <li>
    <Link href='/involook'>
      <a  class="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Appearance</a>
      </Link>    </li>
      </ul>
</nav> */}
  
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
    <div class="grid p-3 grid-cols-2 gap-y-5 gap-x-5 justify-between">
    <span class=" text-lg justify-between text-gray-500 sm:text-center dark:text-gray-400">
      © 2022 <Link href='/'>  ezPayBill</Link>
    </span>
    <span class=" text-lg justify-between text-gray-500 dark:text-gray-400 md:items-end sm:text-center lg-hidden">
    <Link href='/'>Logout</Link>
    </span>
    </div>
    </footer>
    </div>
    
);

}
