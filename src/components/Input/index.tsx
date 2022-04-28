import React, { FC, useState, useRef, useEffect } from "react";

import Icons from "../Icons";


type Props = {
  className?: string,
  inputClass?: string,
  onChange: (i: number) => void;
  value?: string,
  type?: string
}



const Input: FC<Props> = (props: Props) => {

  const {className, value, inputClass, type} = props;
  const[focus,onFocus] = useState(false);

  return (
      <div className={`inline-block mb-3 xl:w-48 min-w-[200px] relative cursor-pointer ${className}`}>
        <input 
          type={type}
          className={`${focus?'selectbox ':''}block w-full px-3 py-1.5 text-sm font-normal bg-[#222343] bg-clip-padding bg-no-repeat border border-solid border-[#8a1b12] rounded-lg transition ease-in-out m-0 ${inputClass}`}
          onFocus={() =>onFocus(true)}
          onBlur={() =>onFocus(false)}
          value={value}
        >
        </input>
        
        
      </div>

  )
}

export default Input