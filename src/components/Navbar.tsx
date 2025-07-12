"use client";

import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4 text-white sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Location Gourette
        </Link>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              )}
            </svg>
          </button>
        </div>

        {/* Desktop and Mobile Menu */}
        <ul className={`${isOpen ? 'block' : 'hidden'} md:flex md:space-x-4 fixed md:static top-16 left-0 w-full h-[calc(100vh-4rem)] md:h-auto overflow-y-auto md:overflow-visible bg-gray-800 md:bg-transparent py-2 md:py-0 text-center md:text-left`}>
          <li>
            <Link href="/#presentation" className="block py-2 px-4 hover:bg-gray-700 md:hover:bg-transparent md:hover:text-gray-300" onClick={() => setIsOpen(false)}>
              Présentation
            </Link>
          </li>
          <li>
            <Link href="/#galerie-images" className="block py-2 px-4 hover:bg-gray-700 md:hover:bg-transparent md:hover:text-gray-300" onClick={() => setIsOpen(false)}>
              Galerie d&apos;Images
            </Link>
          </li>
          <li>
            <Link href="/#pistes" className="block py-2 px-4 hover:bg-gray-700 md:hover:bg-transparent md:hover:text-gray-300" onClick={() => setIsOpen(false)}>
              Plan des Pistes
            </Link>
          </li>
          <li>
            <Link href="/#disponibilites" className="block py-2 px-4 hover:bg-gray-700 md:hover:bg-transparent md:hover:text-gray-300" onClick={() => setIsOpen(false)}>
              Disponibilités
            </Link>
          </li>
          <li>
            <Link href="/#inventaire" className="block py-2 px-4 hover:bg-gray-700 md:hover:bg-transparent md:hover:text-gray-300" onClick={() => setIsOpen(false)}>
              Inventaire
            </Link>
          </li>
          <li>
            <Link href="/#localisation" className="block py-2 px-4 hover:bg-gray-700 md:hover:bg-transparent md:hover:text-gray-300" onClick={() => setIsOpen(false)}>
              Localisation
            </Link>
          </li>
          <li>
            <Link href="/#adresses-utiles" className="block py-2 px-4 hover:bg-gray-700 md:hover:bg-transparent md:hover:text-gray-300" onClick={() => setIsOpen(false)}>
              Adresses Utiles
            </Link>
          </li>
          <li>
            <Link href="/#contact" className="block py-2 px-4 hover:bg-gray-700 md:hover:bg-transparent md:hover:text-gray-300" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
