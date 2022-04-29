import React from 'react';

import { CustomPage } from '../../components/Page'

import EggAvax from './EggAvax';

const LpHunt = () => {
  return (
    <CustomPage header='LP Hunt'>
      <div className='flex flex-col md:space-y-7 space-y-3'>
        <EggAvax/>
      </div>
    </CustomPage>
  )
};

export default LpHunt;
