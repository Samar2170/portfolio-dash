import Link from 'next/link';
import { useState } from 'react';
const NavOptions = {
    'home': {
        'name': 'Home',
        'icon': 'home',
        'path': '/'
    },
    'register-bank-account': {
        'name': 'Register Bank Account',
        'icon': 'plus',
        'path': '/forms/register-bank-account'
    },
    'register-demat-account': {
        'name': 'Register Demat Account',
        'icon': 'plus',
        'path': '/forms/register-demat-account'
    },
    'create-stock-trade': {
        'name': 'Register Stock Trade',
        'icon': 'plus',
        'path': '/forms/create-stock-trade'
    },
    'register-mf-trade':{
        'name': 'Register MF Trade',
        'icon': 'plus',
        'path':'/forms/register-mf-trade'
    },
    'register-ncd': {
        'name': 'Register NCD Trade',
        'icon': 'eye',
        'path': '/forms/register-ncd-trade'
    },
    'register-uncd': {
        'name': 'Register UNCD Trade',
        'icon': 'eye',
        'path': '/forms/register-unlisted-trade'
    },
    'register-fd': {
        'name': 'Register FD',
        'icon': 'eye',
        'path': '/forms/register-fd'
    },
    'bulk-upload': {
        'name': 'Bulk Upload',
        'icon': 'eye',
        'path': '/forms/bulk-upload'
    },
    'outflow-report': {
        'name': 'Outflow Report',
        'icon': 'file',
        'path': '/reports/outflow-report'
    },
    
}



export default function Navbar() {
    return (
        <div className="flex flex-col h-screen">
        <div className="flex flex-col items-center w-full h-full overflow-hidden text-gray-400 bg-gray-900 rounded">
		<a className="flex items-center w-full px-3 mt-3" href="#">
			<svg className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
				<path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
			</svg>
			<span className="ml-2 text-sm font-bold">Portfolio Manager </span>
		</a>
		<div className="w-full px-2">
			<div className="flex flex-col items-center w-full mt-3 border-t border-gray-700">
                {Object.keys(NavOptions).map((key) => {
                    return (
                        <Link legacyBehavior href={NavOptions[key].path}>
                        <a className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300" >
                            <span className="ml-2 text-sm font-medium">{NavOptions[key].name}</span>
                        </a>
                        </Link>
                    )
                })}
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