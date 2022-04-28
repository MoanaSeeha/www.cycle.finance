import React, { useState, useEffect } from 'react';

import { Board } from '../../components/Board';
import { RoundedButton } from '../../components/Button';
import Tab from '../../components/Tab';

const Gather = () => {

  const [tabState, setTabState] = useState(0);

  return (
    <div className='md:basis-1/3'>
      <Board className=''>
        {/* <div className='flex flex-col lg:basis-3/4 basis-1'> */}
        <div className='flex flex-row border-b border-solid border-[#8a1b12] mt-12 justify-between pr-2 items-end'>
          <Tab titles={['Gather']} onChange={(i) => setTabState(i)} />
          <div className='flex flex-row items-start text-right'>
            <div className=' space-x-2'>
              <div className='flex flex-row items-bottom text-3xl my-0.5 font-extrabold'>0.0000000
              </div>
              <div className='chikn-red text-xs font-bold'>TOTAL FEED HELD</div>
            </div>
            <img src={`${process.env.PUBLIC_URL}/img/feedtoken.svg`} alt="egg_token" className='inline-block w-6 h-6 mt-1' />
          </div>
        </div>
        <div className='px-3 py-7 text-center mx-auto space-y-5'>
          <div className='flex flex-col'>
            <div className='flex flex-row items-center text-4xl my-0.5 font-extrabold mx-auto'>0.0000000
              <img src={`${process.env.PUBLIC_URL}/img/feedtoken.svg`} alt="egg_token" className='inline-block w-7 h-7' />
            </div>
            <div className='chikn-red text-base font-bold'>MEAT GATHERED</div>
          </div>
          <div className='flex flex-col my-6 mx-8 space-y-2'>
            <RoundedButton title='Gather'/>
            <RoundedButton title='Gather and unstake all howl' onlyBorder/>
          </div>
        </div>
      </Board>
    </div>  
  )
}

export default Gather