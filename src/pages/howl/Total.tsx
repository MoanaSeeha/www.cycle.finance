import React, { useState, useEffect } from 'react';

import { Board } from '../../components/Board';
import { RoundedButton } from '../../components/Button';
import Tab from '../../components/Tab';
import SelectBox, {ISelectItem} from '../../components/SelectBox';

const Total = () => {

  const [tabState, setTabState] = useState(0);
  const seletBoxData:ISelectItem[] = [
      {title: '#Lowest', value: 0},
      {title: '#Highest', value: 1},
      {title: '#HighestKG', value: 2}
    ];

  let roostButtons = () => {
    if (tabState === 0)
      return (
        <div className=' space-x-3'>
          <RoundedButton title='Howl All' className='' disabled />
          <RoundedButton title='Silent All' className='' disabled />
        </div>
      )
    else if (tabState === 1)
      return (
        <div>
          <RoundedButton title='Silent All' className='' disabled />
        </div>
      )
    else if (tabState === 2) return (
      <div>
        <RoundedButton title='Howl All' className='' disabled />
      </div>
    )
    else return <></>
  }

  return (
    <div className='md:basis-2/3 hidden sm:block'>
      <Board className='flex flex-col md:min-w-[500px]' >
        <div className='flex md:flex-row flex-col items-start md:items-center px-8'>
          <div className='md:basis-5/12 basis-1'>
            <div className='whitespace-nowrap overflow-ellipsis  text-2xl font-bold'>
              Total KG of your WoA
            </div>
            <div className='text-5xl font-bold my-5'>0 kg</div>
            <div className=' text-sm font-bold'>Total KG in Lair</div>
            <div className=' text-2xl font-bold my-1'>187,369 kg</div>
          </div>
          <Board className='md:basis-7/12 basis-1 px-3 flex md:flex-row items-start flex-col md:w-fit w-full md:space-y-0 space-y-3 mx-auto lg:space-x-4 md:space-x-2 md:items-center'>
            <div className='flex flex-col lg:basis-3/4 basis-1'>
              <div className='flex flex-row items-center text-4xl my-0.5 font-extrabold'>0.0000000
                <img src={`${process.env.PUBLIC_URL}/img/eggtoken.svg`} alt="egg_token" className='inline-block w-7 h-7' />
              </div>
              <div className='chikn-red text-sm font-bold'>AVAILABLE HOWL TO GATHER</div>
              <div className='text-sm'>est 0.000000 HOWL per day</div>
            </div>
            <div className='flex flex-col lg:basis-1/4 w-full'>
              <RoundedButton title='Gather' className='' disabled />
            </div>
          </Board>
        </div>
        <div className='flex flex-row border-b border-solid border-[#8a1b12] mt-12 justify-between pr-2 items-center'>
          <Tab titles={['all (0)', 'Howling (0)', 'Silent (0)']} onChange={(i) => setTabState(i)} />
          <div>
            {
              roostButtons()
            }
          </div>
        </div>
        <div className='py-5 px-4'>
          <div className=' text-lg inline-block mr-1'> SORT:</div>
          <SelectBox items={seletBoxData} onChange={() => {}}></SelectBox>
        </div>
        <div className='my-10 mx-auto'>
          No WoA available.
        </div>
      </Board>
    </div>
  )
}

export default Total