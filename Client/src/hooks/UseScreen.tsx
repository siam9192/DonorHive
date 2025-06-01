import { useEffect, useState } from "react";

export enum EScreenType {
  XXL = "2xl",
  XL = "xl",
  LG = "lg",
  MD = "md",
  SM = "sm",
}

type TScreenType = EScreenType;

const useScreen = () => {
  const [screenType, setScreenType] = useState<TScreenType>(EScreenType.LG);
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [height, setHeight] = useState<number>(window.innerHeight);

  const updateSize = () => {
    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;

    if (innerWidth >= 1536) {
      setScreenType(EScreenType.XXL);
    } else if (innerWidth >= 1280) {
      setScreenType(EScreenType.XL);
    } else if (innerWidth >= 1024) {
      setScreenType(EScreenType.LG);
    } else if (innerWidth >= 768) {
      setScreenType(EScreenType.MD);
    } else {
      setScreenType(EScreenType.SM);
    }

    setWidth(innerWidth);
    setHeight(innerHeight);
  };

  useEffect(() => {
    updateSize(); // Initial check
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return {
    screenType,
    width,
    height,
  };
};

export default useScreen;
