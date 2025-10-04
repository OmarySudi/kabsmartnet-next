'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

// Navigation menu items
const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
];

export default function Navigation() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
     <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <nav className="container-padding">
            <div className="flex justify-between items-center h-16">

                {/* logo*/}
                <div className="flex-shrink-0">
                    <Link href="/" className="flex items-center">
                        <Image 
                            src="/images/logo.png" 
                            alt="Kab SmartNet" 
                            width={150} 
                            height={40} 
                            className="w-auto h-15"
                            priority
                        />
                        <span className="sr-only">Kab SmartNet</span>
                    </Link>
                </div>

                {/* Desktop Navigation - Hidden on mobile */}
                <div className="hidden md:flex md:items-center md:gap-8">
                    { navItems.map((item)=>(
                        <Link 
                            href={item.href} 
                            key={item.name}
                            className="text-gray-700 hover:text-blue-600 transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Mobile menu button - We'll add this next */}
                <div className="mobile-only">
                    <button 
                    className=" text-gray-700 hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
                    aria-label="Toggle menu"
                    >
                            {/*Hamburger menu */}
                            <div className="w-6 h-5 flex flex-col justify-between">
                                <span className="w-full h-0.5 bg-current"></span>
                                <span className="w-full h-0.5 bg-current"></span>
                                <span className="w-full h-0.5 bg-current"></span>
                            </div>
                    </button>
                </div>
                
            </div>
        </nav>
     </header>
    );
}