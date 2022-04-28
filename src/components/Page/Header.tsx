import React, {FunctionComponent} from 'react';

import { ToolButton } from '../Button/index';

type Props = {
  title: string,
  loading: boolean
}

const PageHeader:FunctionComponent<Props> = (props: Props) => (
  <div className="flex flex-row justify-between w-full">
    <h1 className='chikn-red text-4xl'>{props.title}</h1>
    <div>
      <ToolButton buttonProps={[{icon: 'refresh'}]}/>
    </div>
  </div>
)

export default PageHeader