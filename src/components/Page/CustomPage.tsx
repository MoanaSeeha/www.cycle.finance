import React, {FC} from 'react';

import Header from './Header';

export interface ICustomPageProps {
  header: string
}

export const CustomPage: FC<ICustomPageProps> = (params) => {
  const {
    children, header
  } = params;

  return (
    <div className={`cr-slauteblue-sm w-full md:px-20 px-10 py-10 min-h-[600px] background-img`}>
      <div className='gap-4 mt-5 mb-5 flex flex-col xl:max-w-[1400px] mx-auto '>
        <Header title={header} loading={false} />
        {children}
      </div>
    </div>
  )
}
