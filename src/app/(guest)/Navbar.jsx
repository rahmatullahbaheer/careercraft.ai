"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useRef } from "react";
import { assets } from "../../assets/assets";

function Navbar() {
  const SideMenuRef = useRef();

  const openMenu = () => {
    if (SideMenuRef.current) {
      SideMenuRef.current.style.transform = "translateX(-16rem)";
    }
  };

  const closeMenu = () => {
    if (SideMenuRef.current) {
      SideMenuRef.current.style.transform = "translateX(16rem)";
    }
  };
  return (
    <>
      {/* <nav className="w-full fixed px-5 lg:px-8  xl:px-[8%] flex items-center justify-between"> */}

      <div className="fixed top-0 left-0 w-full bg-white px-10 flex items-center justify-between shadow-md">
        <Link href="#top">
          <Image
            src={assets.footer_logo}
            alt="CareerCraft Logo"
            width={100}
            height={100}
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover font-ovo"
          />
        </Link>

        <ul
          className="hidden md:flex items-center gap-6 lg:gap-8 px-12 
        py-3  text-black  "
        >
          <li className="hover-bg-purple">
            <Link
              className="font-Ovo text-gray-900  relative after:block after:h-[2px] after:w-0 after:bg-purple-600  after:transition-all after:duration-300 hover:after:w-full "
              href="#top"
            >
              Home
            </Link>
          </li>
          <li className="hover-bg-purple">
            <Link
              className="font-Ovo text-gray-900 relative after:block after:h-[2px] after:w-0 after:bg-purple-600 after:transition-all after:duration-300 hover:after:w-full"
              href="#About"
            >
              About me
            </Link>
          </li>
          <li className="hover-bg-purple">
            <Link
              className="font-Ovo text-gray-900 relative after:block after:h-[2px] after:w-0 after:bg-purple-600 after:transition-all after:duration-300 hover:after:w-full"
              href="#services"
            >
              Services
            </Link>
          </li>
          <li className="hover-bg-purple">
            <Link
              className="font-Ovo text-gray-900 relative after:block after:h-[2px] after:w-0 after:bg-purple-600 after:transition-all after:duration-300 hover:after:w-full"
              href="#Fqs"
            >
              FQS
            </Link>
          </li>
          <li className="hover-bg-purple">
            <Link
              className="font-Ovo text-gray-900 relative after:block after:h-[2px] after:w-0 after:bg-purple-600 after:transition-all after:duration-300 hover:after:w-full"
              href="#Price"
            >
              Price
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-4">
          <Link
            href="#contact"
            className="hidden lg:flex items-center gap-2 px-5 py-2 border
            rounded font-ovo  text-white text-lg bg-gradient-to-r from-purple-500 to-purple-400 hover:from-purple-800 hover:to-purple-700"
          >
            Login
          </Link>
          <Link
            href="#contact"
            className="hidden lg:flex group items-center gap-2 px-5 py-2 
            border rounded font-ovo text-white text-lg bg-gradient-to-r from-purple-500 to-purple-400 hover:from-purple-800 hover:to-purple-700"
          >
            Sign up
          </Link>

          <button className="block md:hidden ml-3" onClick={openMenu}>
            <Image src={assets.menu_black} alt="" className="w-6" />
          </button>
        </div>

        {/*...................... MOBILE MENU............. */}
        <ul
          ref={SideMenuRef}
          className="flex md:hidden flex-col gap-6 py-20 px-10 fixed -right-64 top-0 bottom-0 w-64 z-50 h-screen bg-white"
        >
          <div className="absolute right-6 top-6" onClick={closeMenu}>
            <Image
              src={assets.close_black}
              alt="Close Menu"
              className="w-5 cursor-pointer"
            />
          </div>

          <li className="hover-bg-purple">
            <Link
              className=" text-black  relative after:block after:h-[2px] after:w-0 after:bg-purple-600 after:transition-all after:duration-300 hover:after:w-1/3"
              onClick={closeMenu}
              href="#top"
            >
              Home
            </Link>
          </li>

          <li className="hover-bg-purple">
            <Link
              className="font-Ovo text-black relative after:block after:h-[2px] after:w-0 after:bg-purple-600 after:transition-all after:duration-300 hover:after:w-1/3"
              onClick={closeMenu}
              href="#about"
            >
              About
            </Link>
          </li>

          <li className="hover-bg-purple">
            <Link
              className="font-Ovo text-black relative after:block after:h-[2px] after:w-0 after:bg-purple-600 after:transition-all after:duration-300 hover:after:w-1/3"
              onClick={closeMenu}
              href="#services"
            >
              Services
            </Link>
          </li>
          <li className="hover-bg-purple">
            <Link
              className="font-Ovo text-black relative after:block after:h-[2px] after:w-0 after:bg-purple-600 after:transition-all after:duration-300 hover:after:w-1/3"
              onClick={closeMenu}
              href="#Fqs"
            >
              FQS
            </Link>
          </li>

          <li className="hover-bg-purple">
            <Link
              className="font-Ovo text-black relative after:block after:h-[2px] after:w-0 after:bg-purple-600 after:transition-all after:duration-300 hover:after:w-1/3"
              onClick={closeMenu}
              href="#Price"
            >
              Price
            </Link>
          </li>

          <Link
            href="#contact"
            className="transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg 
             bg-gradient-to-r from-purple-500 to-purple-400 text-white font-bold px-6 py-2 text-center rounded font-ovo"
          >
            Login
          </Link>

          <Link
            href="#contact"
            className="transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg 
             bg-gradient-to-r from-purple-500 to-purple-400 text-white font-bold py-2 text-center rounded font-ovo"
          >
            Get Started
          </Link>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
