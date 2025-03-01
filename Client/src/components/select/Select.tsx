import { useEffect, useRef, useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";

type TOption = {
  display: string;
  value: any;
};

interface IProps {
  options: TOption[];
  defaultValue?: any;
  onChange?(value: any): void;
}

const Select = ({ options, defaultValue, onChange }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<TOption | null>(
    options.find((op) => op.value === defaultValue) || options[0],
  );
  

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const current = ref.current;
      if (!current) return;
      const target = event.target as Node;

      if (isOpen && !current.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [isOpen]);

  const handelSelect = (option: TOption) => {
    setSelected(option);
    setIsOpen(false);
    onChange && onChange(option.value);
  };

  if (defaultValue) {
    options.filter((option) => option.value !== defaultValue);
  }

  return (
    <div className="relative select-none">
      <div
        onClick={() => setIsOpen((p) => !p)}
        className="flex  items-center justify-between group hover:cursor-pointer  p-4 border-2 border-gray-400/40 rounded-md relative"
      >
        <p className=" font-semibold text-primary">{selected?.display}</p>
        <button className={`text-2xl ${isOpen ? "rotate-180" : ""} duration-200`}>
          <IoChevronDownOutline />
        </button>
      </div>
      {isOpen && (
        <div
          ref={ref}
          className="absolute  bottom-20 left-2 md:h-60 h-52   overflow-y-auto w-full  rounded-lg no-scrollbar .customize-scrollbar bg-white shadow-2xl border-2 border-primary py-2"
        >
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handelSelect(option)}
              className="px-2 py-3 hover:bg-gray-50 hover:cursor-pointer group"
            >
              <p className=" text-lg font-medium font-secondary group-hover:text-primary">
                {option.display}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
