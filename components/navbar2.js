import { useEffect, useState } from "react";
import Link from 'next/link';

function getNavbarOpts()  {
    const registerBankAccount = {
        name:'Register Bank Ac',
        path:'/forms/register-bank-account'
    }
    const registerDematAccount = {
        name:'Register Demat Ac',
        path:'/forms/register-demat-account'
    }
    const registerStockTrade={
        name: 'Register Stock Trade',
        path: '/forms/create-stock-trade'
    }
    const registerMfTrade={
        name: 'Register MF Trade',
        path:'/forms/register-mf-trade'
    }
    const registerNcd= {
        name: 'Register NCD Trade',
        path: '/forms/register-ncd-trade'
    }
    const registerUncd= {
        name: 'Register UNCD Trade',
        path: '/forms/register-unlisted-trade'
    }
    const registerFd= {
        name: 'Register FD',
        path: '/forms/register-fd'
    }
    const bulkUpload= {
        name: 'Bulk Upload',
        path: '/forms/bulk-upload'
    }
    const viewHoldings = {
        name:'View Holdings',
        path:'/data/view-holdings'
    }

    
    return (
        [
            {name:'Register Account',
            isOpen:false,
            children:[registerBankAccount,registerDematAccount]},
            {name:'Register Trades',
            isOpen:false,
            children:[registerStockTrade,registerMfTrade,registerNcd,registerUncd,
                    registerFd,bulkUpload]},
            {
                name:'Portfolio',
                isOpen:false,
                children:[viewHoldings]
            }
        ]
    )
}

export default function Navbar() {
    const [navs,SetNavs] = useState(getNavbarOpts());
    const [openNavs,setOpenNavs] = useState("");

    useEffect(() => {
        const assignNavOpts = async () => {
            var navOpts = getNavbarOpts();
            console.log("got navopts",navOpts);
            SetNavs(navOpts);
            console.log("assigned to navs",navs);    
        }
        if (navs.length ===0) {
            assignNavOpts();
        } else {
            console.log(navs);

        }
    },[navs,openNavs])

    const changeOpenStatus = (value) => {
        if (openNavs === value) {
            setOpenNavs("");
        } else {
            setOpenNavs(value);

        }
    }
    return (
        <div className="flex flex-col h-screen">
        <div className="flex flex-col items-center w-full h-full overflow-hidden text-gray-400 bg-gray-900 rounded">
		<a className="flex items-center w-full px-3 mt-3" href="/">
			<svg className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
				<path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
			</svg>
			<span className="ml-2 text-sm font-bold">Portfolio Manager </span>
		</a>
		<div className="w-full px-2">
			<div className="flex flex-col items-center w-full mt-3 border-t border-gray-700">
                {navs.map((key) => {
                return (    <div>
                        <button className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300" id="openNavs" value={key.name}  onClick={() => {changeOpenStatus(key.name)}}>
                            <span className="ml-2 text-sm font-medium" value={key.name}>{key.name}</span>
                        </button>
                    {openNavs === key.name ? 
                                            key.children.map((val) => {
                                            return  (
                                                <Link legacyBehavior href={val.path}>
                                                <a className="flex items-center w-full h-8 px-2 mt-1 rounded hover:bg-gray-700 hover:text-gray-300" >
                                                    <span className="ml-2 text-sm ">{val.name}</span>
                                                </a>
                                                </Link>
                                            )
                                            })
                     : null }
                
                    </div>
                    
                )})}
			</div>
			
		</div>
		<a className="flex items-center justify-center w-full h-16 mt-auto bg-gray-800 hover:bg-gray-700 hover:text-gray-300" href="#">
			<svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
			<span className="ml-2 text-sm font-medium">Account</span>
		</a>
	</div>
    </div>
   )
}