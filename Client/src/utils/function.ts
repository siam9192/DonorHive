import { AnyZodObject } from "zod";
import { IParam } from "../interfaces/response.interface";
import { NavigateFunction } from "react-router-dom";

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
