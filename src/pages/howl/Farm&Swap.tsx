import React, { useState, useEffect } from 'react';

import { Board } from '../../components/Board';
import { RoundedButton } from '../../components/Button';
import Tab from '../../components/Tab';

const FarmSwap = () => {

  const [tabState, setTabState] = useState(0);

  const Farm = () => (
    <div className='px-3 py-7 text-center mx-auto space-y-5'>
      <div className='flex flex-col'>
        <div className='flex flex-row items-center text-4xl my-0.5 font-extrabold mx-auto'>0.0000000
          <img src={`${process.env.PUBLIC_URL}/img/eggtoken.svg`} alt="egg_token" className='inline-block w-7 h-7' />
        </div>
        <div className='chikn-red text-base font-bold'>YOUR STAKED MEAT</div>
      </div>
      <div className='flex flex-col'>
        <div className='flex flex-row items-center text-4xl my-0.5 font-extrabold mx-auto'>0.0000000
          <img src={`${process.env.PUBLIC_URL}/img/feedtoken.svg`} alt="egg_token" className='inline-block w-7 h-7' />
        </div>
        <div className='chikn-red text-base font-bold'>EST DAILY MEAT</div>
      </div>
      <div className='flex flex-col max-w-[200px] border-x my-5 mx-auto'>
        <div className='inline-block'>x2</div >
        <div className='inline-block'>hunting BOOST</div>
      </div>
      <div className='flex flex-col my-6 mx-7 space-y-2'>
        <RoundedButton title='Stake'/>
        <RoundedButton title='Unstake' onlyBorder/>
      </div>
    </div>)
  const Swap = () => (
    <div className=' flex flex-col px-3 py-7 text-center mx-auto'>
      <div className='flex flex-col max-w-md border-x my-10 mx-auto px-12'>
        <div>
          x450
        </div>
        <div>swap multipler</div>
      </div>
      <RoundedButton title='Swap' />
    </div>)


  return (
    <div className='md:basis-1/3'>
      <Board className=''>
        <div className='flex md:flex-row flex-col border-b border-solid border-[#8a1b12] mt-12 justify-between pr-2 items-end'>
          <Tab titles={['FARM', 'SWAP']} onChange={(i) => setTabState(i)} />
          <div className='flex flex-row items-start text-right'>
            <div className='flex flex-col space-x-2'>
              <div className='flex flex-row items-bottom text-3xl my-0.5 font-extrabold'>0.0000000
              </div>
              <div className='chikn-red text-xs font-bold'>TOTAL HOWL HELD</div>
            </div>
            <img src={`${process.env.PUBLIC_URL}/img/eggtoken.svg`} alt="egg_token" className='inline-block w-6 h-6 mt-1' />
          </div>
        </div>
        {tabState===0?Farm():Swap()}
      </Board>
    </div>  
  )
}

export default FarmSwap