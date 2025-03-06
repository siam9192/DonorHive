import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import useBounce from "../../hooks/useBounce";

interface IProps {
  onChange?(value: string): void;
  placeholder?: string;
}

const SearchTermInput = ({ onChange, placeholder }: IProps) => {
  const [value, setValue] = useState("");
  const bouncedValue = useBounce(value, 400);

  useEffect(() => {
    onChange && onChange(bouncedValue);
  }, [bouncedValue]);
  return (
    <div className=" flex items-center bg-gray-100">
      <span className=" p-4 flex justify-center items-center bg-primary text-3xl text-white">
        <IoSearchOutline />
      </span>
      <input
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder={placeholder}
        className=" outline-none w-full  px-2 py-4 placeholder:font-secondary"
      />
    </div>
  );
};

export default SearchTermInput;
