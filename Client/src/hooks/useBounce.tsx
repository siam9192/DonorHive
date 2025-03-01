import { useEffect, useState } from "react";

interface IProps {
  value: string;
  duration: number;
}

const useBounce = (value: string, duration = 200) => {
  const [bouncedValue, setBouncedValue] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setBouncedValue(value);
    }, duration);

    return () => clearTimeout(timeout);
  }, [value]);

  return bouncedValue;
};

export default useBounce;
