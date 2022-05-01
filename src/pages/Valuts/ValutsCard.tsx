import React, { FC } from "react";

import { Board } from '../../components/Board';
import { protocols } from './index';

interface IValutsCard {
  protocol: number;
  valutType: number;
  pair: string;
}

const ValutsCard: FC<IValutsCard> = (props) => {

  const {
    protocol,
    valutType,
    pair
  } = props;

  return (
    <Board className='flex flex-row items-center px-6 space-y-5'>
      <div className="flex flex-row">
        <img src={protocols[protocol].img} alt="" className=" w-40 mx-6"/>
        <div className="flex flex-row">
          <div>
            {protocols[protocol].protocol+' '+pair}
          </div>
        </div>
      </div>
    </Board>
  )
}

export default ValutsCard