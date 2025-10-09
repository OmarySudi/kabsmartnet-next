'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState,useEffect,useCallback,useRef,useMemo } from 'react';

// Navigation menu items
const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
];

export default function Navigation() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const menuButtonRef = useRef(null);
    const menuRef = useRef(null);
    const firstMenuItemRef = useRef(null);
    const lastMenuItemRef = useRef(null);

    const isKeyboardUser = useMemo(() => {
        // Ensure this only runs on the client
        if (typeof document === 'undefined') return false;

        return document.documentElement.getAttribute('data-focus-visible') === 'true' || 
               document.documentElement.classList.contains('focus-visible');
    }, []);

    const toggleMobileMenu = useCallback((e) => {
            e?.preventDefault();
            const newState = !isMobileMenuOpen;

            setIsMobileMenuOpen(newState);
            document.body.classList.toggle('menu-open', newState);

            if(!newState){
                
                const activeElement = document.activeElement;
                const isFocusOnMenuItem = activeElement?.closest('#mobile-menu') && activeElement !== firstMenuItemRef.current;

                setTimeout(()=>{

                    if (activeElement === firstMenuItemRef.current) {
                        // If closing from close button, blur to remove focus
                        menuButtonRef.current?.blur();
                    } else if (isFocusOnMenuItem) {
                        // If closing from a menu item, blur without focusing the button
                        activeElement?.blur();
                    } else {
                        
                        if (isKeyboardUser) {
                            menuButtonRef.current?.focus();
                        } else {
                            menuButtonRef.current?.blur();
                        }
                    }

                },10);
            }

        },[isMobileMenuOpen,isKeyboardUser]);


    useEffect(()=>{
        if(isMobileMenuOpen && menuRef.current){
            //Focus the first menu item when menu open
            firstMenuItemRef.current?.focus();

            //Handle keyboard navigation
            const handleKeydown = (e)=>{
                if(e.key === 'Escape'){
                    toggleMobileMenu(e)
                }

                //Handle tab key for focus trapping
                if (e.key == 'Tab'){
                    //If shift+Tab is pressed on first item, move focus to last item 
                    if(e.shiftKey && document.activeElement == firstMenuItemRef.current){
                        e.preventDefault();
                        lastMenuItemRef.current?.focus();
                       
                    } 
                    
                    //If Tab is pressed on last item, move focus to first item
                    else if(!e.shiftKey && document.activeElement === lastMenuItemRef.current){ 
                        e.preventDefault();
                        firstMenuItemRef.current?.focus();
                    }
                }
            }

            document.addEventListener('keydown', handleKeydown);

            return () => document.removeEventListener('keydown', handleKeydown);
        }

    },[isMobileMenuOpen,toggleMobileMenu]);


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

                {/* Mobile menu button*/}
                <div className="mobile-only">
                    <button 
                        onClick={(e)=>{
                            toggleMobileMenu(e);
                        }}
                        ref={menuButtonRef}
                        className="focus-transition text-gray-700 hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
                        aria-label="Toggle menu"
                        aria-expanded = {isMobileMenuOpen}
                    >
                        {/*Hamburger menu */}
                        <div className="w-6 h-5 flex flex-col justify-between">
                            <span className={`w-full h-0.5 bg-current transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                            <span className={`w-full h-0.5 bg-current transition-transform ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                            <span className={`w-full h-0.5 bg-current transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                        </div>
                    </button>
                </div>
                
            </div>

            {/** Mobile Menu - Dropdown */}       
            <div 
                ref={menuRef}
                id="mobile-menu"
                className={`
                    mobile-only
                    fixed inset-x-0 top-16
                    bg-white
                    shadow-lg
                    overflow-hidden
                    transition-all duration-300 ease-in-out
                    z-50
                    ${
                    isMobileMenuOpen ? 'max-h-96': 'max-h-0'}
                `}
                inert={!isMobileMenuOpen ? true : null}
            >
                <div className = "px-4 py-2 pb-4 space-y-2">

                    {/** close button */}
                    <button 
                        onClick={toggleMobileMenu}
                        ref={firstMenuItemRef}
                        className="
                            focus-transition
                            w-full flex justify-end p-2
                            text-gray-500 hover:text-gray-700
                            focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full
                            ${!isMobileMenuOpen ? 'sr-only' : ''}
                        "
                        aria-label="Close menu"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/** menu items */}
                    {
                        navItems.map((item)=>{
                            const isLastItem = item.name === 'Contact';
                            return (
                                <Link 
                                    href={item.href} 
                                    key={item.name}
                                    ref={isLastItem ? lastMenuItemRef : null}
                                    onClick={toggleMobileMenu}
                                    className="
                                    focus-transition
                                    block px-4 py-3
                                    text-gray-700 hover:text-blue-600 
                                    hover:bg-gray-50 rounded-lg
                                        transition-colors
                                    "
                                >
                                    {item.name}
                                </Link>
                            );
                        })
                    }
                </div>
            </div>


            {/*overlay */}
            {isMobileMenuOpen && (
                <div 
                    className="
                    fixed inset-0 bg-black/50
                    z-40
                    mobile-only
                    "
                    onClick={(e) => {
                        toggleMobileMenu(e);
                    }}

                    role = "presentation"
                />
            )}

        </nav>
     </header>
    );
}