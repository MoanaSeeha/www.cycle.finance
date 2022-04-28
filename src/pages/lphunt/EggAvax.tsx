import React, { useState, useEffect } from 'react';
import {SlideDown} from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'

import { Board } from '../../components/Board';
import SelectBox, {ISelectItem} from '../../components/SelectBox';
import Input from '../../components/Input';
import Icons from '../../components/Icons';
import { RoundedButton } from '../../components/Button';

const EggAvax = () => {

  const [toggleStatus, toggle] = useState(true);
  const [selectedTab, changeTab] = useState(true);

  return (
      <Board className={`relative pb-0`}>
        <div onClick={() => toggle(!toggleStatus)} className={`${!toggleStatus?'rounded-br-lg rounded-bl-lg ':''}items-center cursor-pointer absolute bg-[#222343] rounded-tr-lg rounded-tl-lg w-full top-0 flex justify-between px-5 py-2`}>
          <div className='flex space-x-4 items-center'>
            <div className='text-2xl font-black tracking-widest'>$HOWL /</div>
            <img src={`${process.env.PUBLIC_URL}/img/download.svg`} alt="" className='w-8 h-8'/>
            <div className='text-2xl font-black tracking-widest'>$AVAX</div>
          </div>
          <div className=' text-center'>
            {!toggleStatus?<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>:<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>}
          </div>
        </div>
        <SlideDown className={'my-dropdown-slidedown'} >
          {toggleStatus ? 
            <div className='px-3 flex md:flex-row flex-col space-x-0 md:space-x-5 py-5'>
              <div className='flex flex-col md:basis-2/5 px-5 bg-[#681818] rounded-lg py-8'>
                <div className='flex flex-row justify-start space-x-5 text-lg'>
                  <div className={`${selectedTab?'chikn-red ':''} cursor-pointer transition-all`} onClick={() => changeTab(true)}>Deposit</div>
                  <div className={`${!selectedTab?'chikn-red ':''} cursor-pointer transition-all`} onClick={() => changeTab(false)}>Withdraw</div>
                </div>
                <div className='flex flex-col justify-center mt-4 space-y-5'>
                    <div className='flex justify-center py-2 px-5 bg-[#FAB801] rounded-lg text-[#f2f2f2] text-base'>
                      TRADER JOE <img src={`${process.env.PUBLIC_URL}/img/JLP_Logo-482a1e1547fafda8e8b152d09098d3e3.png`} alt='' className=' w-6 h-6'/>
                    </div>
                    <a href="#" className='flex justify-center inline-block chikn-red underline decoration-[#FAB801]'>Get JLP tokens here</a>
                    <div className='flex justify-center text-4xl font-extrabold'>0.000000</div>
                    <div className='flex justify-center text-xl'>TOTAL LP WALLET BALANCE</div>
                    <div className='flex flex-row'>
                      <Input value='0' inputClass=' rounded-r rounded-xl' className='basis-9/12 min-w-0' onChange={() => {}}/>
                      <Input inputClass=' rounded-l rounded-xl cursor-pointer' className='basis-3/12 min-w-0' value='Max' type='button' onChange={() => {}}/>
                    </div>
                    <RoundedButton title='Approve' disabled/>
                    <RoundedButton title='Deposit'/>
                </div>
              </div>
              <div className='flex flex-col justify-center text-center space-y-5 md:basis-3/5 px-10 chikn-red bg-[#681818] rounded-lg py-8'>
                <div>ACTIVATE YOUR LP HERE/DEPOSIT LP TO START YOUR HURT</div> 
                <RoundedButton title='Activate'/>
              </div>
            </div>
           : null}
        </SlideDown>
      </Board>  
  )
}

export default EggAvax