import React, {FC} from "react";

export interface IBoard {
  className?: string
}

export const Board: FC<IBoard> = (params) => {
  const {
    children, className
  } = params;

  return (
    <div className={`bg-[#A62727] py-10 rounded-lg text-white shadow-xl ${className?className:''}`}>
        {children}
    </div>
  )
}