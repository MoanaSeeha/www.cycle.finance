import React from "react";

import NormalNavbar from './NormalNavbar';
import MobileNavbar from './MobileNavbar';

declare global {
  interface Window {
    ethereum: any;
  }
}

const Header = () => {
  return (
    <div className="cr-slauteblue-md border-b border-b-xs pt-2 fixed left-0 top-0 z-50 w-full font-sans items-center flex flex-wrap justify-between">
      <div className=" items-center flex flex-wrap justify-between max-w-6xl mx-auto space-x-3 bg-inherit">
      <img src={process.env.PUBLIC_URL + '/img/logo.png'} className="w-24 py-3 -mt-3 absolute left-3" alt="Logo" />
        <NormalNavbar/>
        <MobileNavbar/>
      </div>
    </div>
  );
};

export default Header;
