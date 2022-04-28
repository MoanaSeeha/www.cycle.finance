import React from "react";

import { ToolButton } from "../../../components/Button";

const Footer = () => {
  return (
    <div className=" flex flex-col relative bottom-0 bg-[#2a2c54] w-full px-16 py-12 text-white">
      <div className="flex flex-col space-y-6">
        <div className=" flex md:flex-row flex-col">
          <div className="flex flex-col md:basis-9/12 space-y-3">
            <img src={process.env.PUBLIC_URL + '/img/logo.png'} className="w-24 py-3 -mt-3" alt="Logo" />
            8,888 Wolves that act as a vehicle for humans to interact in our journey of the Wolf
            <div>
              <div className="space-y-6 mt-20">
                <div className="chikn-red ">Join the community</div> 
                <div className="flex space-x-2">
                  <ToolButton buttonProps={[{icon: 'discord'}]}/>
                  <ToolButton buttonProps={[{icon: 'twitter'}]}/>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row md:basis-3/12">
            <div className="flex flex-col basis-1/2 text-lg">
              <div className="chikn-red">Site</div>
              <div>Home</div>
              <div>Mint</div>
              <div>Journey</div>
              <div className="ml-3">Howl</div>
              <div className="ml-3">Leaderboard</div>
              <div>Quest</div>
              <div className="ml-3">LP Hunt</div>
              <div className="ml-3">Traits</div>
              <div>Wallet</div>
              <div className="ml-3">FarmLand</div>
              <div>Market</div>
              <div className="ml-3">WoA</div>
              </div>
            <div className="flex flex-col basis-1/2 text-lg">
              <div className="chikn-red">Other</div>
              <div>Phases</div>
              <div>Status</div>
              <div>Docs</div>
              <div>API</div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between py-3 border-t border-[#3b3d76]">
          <div>© 2022 WoA</div>
          <a href="#" className="chikn-red flex space-x-2 underline"><div>Powered by</div><img src={`${process.env.PUBLIC_URL}/img/download.svg`} alt="" className='w-5 h-5'/></a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
