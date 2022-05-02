import React, { FC } from "react";
import { Link } from "react-router-dom";

import { Board } from '../../components/Board';
import { protocols } from './index';

export interface IValutsCard {
  protocol: number;
  valutType: number[];
  pair: string;
  subText: string;
  payment: number;
  farmLink: string;
}

const ValutsCard: FC<IValutsCard> = (props) => {

  const {
    protocol,
    valutType,
    pair,
    subText,
    payment,
    farmLink
  } = props;

  return (
    <Board className='flex flex-row items-center px-6 space-y-5'>
      <div className="flex flex-row">
        <img src={protocols[protocol].img} alt="" className=" w-40 mx-6"/>
        <div className="flex flex-row">
          <div> {protocols[protocol].protocol+' '+pair} </div>
          <div>{subText}</div>
          <div>
            <Link to={farmLink} className=" text-sm cursor-pointer text-blue-500 underline">
              Farm Page
              <svg className="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path></svg>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex">
        {payment === 0?
         (
           <>
            <div className="w-1/2">TVL:</div>
            <div className="w-1/2">APY:</div>
           </>
         )
        :<div className="">Decommissioned - Claim Rewards and Withdraw</div>}
      </div>
      <div className="">

      </div>
    </Board>
  )
}

export default ValutsCard