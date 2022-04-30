import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';

import { CustomPage } from '../../components/Page'
import PageHeader from '../../components/Page/Header';
import { Board } from '../../components/Board';

interface State {
  amount: string;
  password: string;
  weight: string;
  weightRange: string;
  showPassword: boolean;
}

const LpHunt = () => {

  const [values, setValues] = React.useState<State>({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  return (
    <CustomPage>
      <PageHeader title='Auto-compound LP tokens + earn $CYCLE'/>
      <div className='flex justify-center text-4xl text-gray-300'>TVL: $361,604</div>
      <div className='flex flex-col items-center md:space-y-7 space-y-3'>
        <div className=' w-1/2'>
          <Board className='flex flex-col space-x-2 px-6'>
            <div className='w-2/3'>
              <OutlinedInput
                id="outlined-adornment-weight"
                className = 'w-full'
                value={values.weight}
                onChange={handleChange('weight')}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  'aria-label': 'weight',
                }}
                color='primary'
                placeholder='Search...'
            />
            </div>
            <div>
              <Checkbox />
            </div>
          </Board>
        </div>
        
      </div>
    </CustomPage>
  )
};

export default LpHunt;
