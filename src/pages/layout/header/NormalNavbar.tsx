import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import SubRouteCard from '../../../components/SubRouteCard';
import { ToolButton, Button } from '../../../components/Button';
import Routes from '../../../components/Routes'

const NormalNavbar = () => {
  return (
  <div className="hidden flex-row md:flex text-[#f2f2f2] text-lg space-x-2 relative">
    {
      Routes.map((route, index) => {
        if(route.sub_route) {
          return <div key={index} className="relative py-2 px-4 group cursor-pointer">
          {route.title} 
          { <SubRouteCard routes={route.sub_route}/>}
          </div>
        } else {
          return (
            <Link key={index} to={route.path===undefined?'/':route.path} className="py-2 px-4">
              {route.title}
            </Link>
            )
        }
      })
    }
  </div>)
}

export default NormalNavbar
