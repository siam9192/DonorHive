import React, { useEffect, useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import useBounce from "../../hooks/useBounce";
import { el } from "date-fns/locale";

interface IProps {
  onChange?(value: string): void;
  placeholder?: string;
  defaultValue?:string
}

const SearchTermInput = ({ onChange, placeholder,defaultValue }: IProps) => {
  const [value, setValue] = useState(defaultValue||'');
  const bouncedValue = useBounce(value, 400);
  const renderRef =  useRef<boolean>(false)
  useEffect(() => {

   if(renderRef.current){
    onChange && onChange(bouncedValue);
   }
   else {
    renderRef.current = true
   }
  }, [bouncedValue]);

  return (
    <div className=" flex items-center bg-gray-100">
      <span className=" p-4 flex justify-center items-center bg-primary text-3xl text-white">
        <IoSearchOutline />
      </span>
      <input
        onChange={(e) => setValue(e.target.value)}
        type="text"
        defaultValue={defaultValue}
        placeholder={placeholder}
        className=" outline-none w-full  px-2 py-4 placeholder:font-secondary"
      />
    </div>
  );
};

export default SearchTermInput;
