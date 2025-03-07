import { AnyZodObject } from "zod";
import { IParam } from "../interfaces/response.interface";
import { NavigateFunction } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
export const getFormValues = (target: HTMLFormElement, names: string[]) => {
  const obj: Record<string, string> = {};
  names.forEach((name) => {
    const input = target.elements.namedItem(name) as HTMLInputElement | null;
    if (input) {
      obj[name] = input.value;
    }
  });
  return obj;
};

export const zodParse = (schema: AnyZodObject, data: any) => {
  return schema.parse(data);
};

export const paramsToString = (params: IParam[]) => {
  if (!params.length) return "";
  const searchParams = new URLSearchParams();
  params.forEach((param) => {
    if (param.value) {
      searchParams.append(param.name, param.value.toString());
    }
  });
  return searchParams.toString();
};

export const handelSearch = (params: IParam[], navigate: NavigateFunction, search?: string) => {
  const urlSearchParams = new URLSearchParams(search);
  params.forEach((param) => {
    param.value && urlSearchParams.set(param.name, param.value as string);
  });
  const paramsStr = urlSearchParams.toString();
  navigate(window.location.pathname + paramsStr ? `?${paramsStr}` : "");
};

export const getTimeAgo = (date: string): string => {
  const currentDate = new Date().getTime();
  const targetDate = new Date(date).getTime();
  const difference = currentDate - targetDate; // Time difference in milliseconds

  const minutes = 60 * 1000;
  const hours = 60 * minutes;
  const days = 24 * hours;

  if (difference >= days) {
    return `${Math.floor(difference / days)} days ago`;
  }
  if (difference >= hours) {
    return `${Math.floor(difference / hours)} hours ago`;
  }
  if (difference >= minutes) {
    return `${Math.floor(difference / minutes)} minutes ago`;
  }

  return `just now`;
};

export const uploadImageToImgBB = async (file: File) => {
  const response = await axios.post(
    `${process.env.IMG_BB_UPLOAD_URL}?key=${process.env.IMG_BB_API_KEY}` as string,
    { image: file },
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );

  const url = response.data.data.display_url;
  if (!url) throw new Error();
  return url;
};


const logout =()=>{
 try {
  Cookies.remove('accessToken')
  Cookies.remove('refreshToken')
 } catch (error) {
  
 }
}