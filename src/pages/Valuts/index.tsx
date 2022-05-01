import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';
import {useTheme} from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

import { CustomPage } from '../../components/Page'
import PageHeader from '../../components/Page/Header';
import { Board } from '../../components/Board';

interface State {
  amount: string;
  password: string;
  search: string;
  weightRange: string;
  valutType: string;
  myValut: boolean;
}

const LpHunt = () => {

  const theme = useTheme();

  const [values, setValues] = React.useState<State>({
    amount: '',
    password: '',
    search: '',
    weightRange: '',
    valutType: '0',
    myValut: false
  });


  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleValutTypeChange = (event: SelectChangeEvent) => {
    setValues({ ...values, valutType: event.target.value});
  };

  return (
    <CustomPage>
      <PageHeader title='Auto-compound LP tokens + earn $CYCLE'/>
      <div className='flex justify-center text-4xl text-gray-300'>TVL: $361,604</div>
      <div className='flex flex-col items-center md:space-y-7 space-y-3'>
        <div className=' w-1/2 text-white text-base'>
          <Board className='flex flex-col items-center px-6 space-y-5'>
            <div className='flex flex-row w-full space-x-2 items-center'>
              <div className='w-2/3'>
                <OutlinedInput
                  id="outlined-adornment-weight"
                  className = 'w-full'
                  value={values.search}
                  onChange={handleChange('search')}
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                  // style={{color: theme.palette.primary.light}}
                  placeholder='Search...'
              />
              </div>
              <div className='w-1/3'>
                <FormControlLabel
                  label="My Vaults"
                  control={
                    <Checkbox
                      style={{color: 'white'}}
                      // checked={checked[0] && checked[1]}
                      // indeterminate={checked[0] !== checked[1]}
                      // onChange={handleChange1}
                    />
                  }
                />
              </div>
            </div>
            <div>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" className='text-white'>Valut Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={values.valutType}
                  label="Valut Type"
                  onChange={handleValutTypeChange}
                  className=' text-white text-left w-40 mr-8'
                >
                  <MenuItem value={0}>All</MenuItem>
                  <MenuItem value={1}>Single Staking</MenuItem>
                  <MenuItem value={2}>Stables</MenuItem>
                  <MenuItem value={2}>LP Tokens</MenuItem>
                  <MenuItem value={2}>CYCLE Valuts</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Board>
        </div>
        
      </div>
    </CustomPage>
  )
};

export default LpHunt;
