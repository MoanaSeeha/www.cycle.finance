import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Transition } from '@tailwindui/react'

import SubRouteCard from '../../../components/SubRouteCard';
import { ToolButton, Button } from '../../../components/Button';
import Routes from '../../../components/Routes'

const MobileNavbar = () => {
  const[isOpen,setOpen] = useState(false);
  return (<>
  <div className="md:hidden lg:hidden text-[#f2f2f2] text-lg  bg-inherit w-full">
    <div className="flex flex-row space-x-2 relative items-center justify-evenly w-full" >

        <ToolButton buttonProps={[{icon: 'menu'}]} onClick = {()=>setOpen(!isOpen)}/>
    </div>
    <Transition
      show={isOpen}
      enter="transition ease-in-out duration-300 transform"
      enterFrom="-translate-y-full"
      enterTo="translate-y-0"
      leave="transition ease-in duration-300 transform"
      leaveFrom="translate-y-0"
      leaveTo="-translate-y-full"
      className={'absolute flex flex-col top-14 bg-inherit w-[100vw] left-0 text-lg text-[#f2f2f2] z-30'}
    >
      {
        Routes.map((route, index) => {
          if(route.sub_route) {
            return <div key={index} className="relative py-2 px-4 group cursor-pointer flex items-center">
            {route.title} 
            { <SubRouteCard routes={route.sub_route}/>}
            </div>
          } else {
            return (
              <Link key={index} to={route.path===undefined?'/':route.path} className="py-2 px-4 flex items-center">
                {route.title}
              </Link>
              )
          }
        })
      }

    </Transition>
    </div>
  </>
    )
}

export default MobileNavbar
