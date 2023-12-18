import { OptionFormatNumber, Params } from "constant/types";

export const uuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
    .replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    })
    .replace(/-/g, "");
};

export const parseSearchParams = (searchParams: URLSearchParams) => {
  const params: Params = {};
  searchParams.forEach((value, key) => {
    params[key] = params[key]
      ? Array.isArray(params[key])
        ? [...params[key], value]
        : [params[key], value]
      : value;
  });
  return params;
};

export const formatNumber = (
  number?: number | null | string,
  options: OptionFormatNumber = {},
) => {
  if (typeof number === "string") return number;
  const {
    numberOfFixed = 3,
    emptyText = "N/A",
    suffix = "",
    prefix = "",
    space = true,
    ...localeStringOptions
  } = options;
  const suffixParsed = `${space ? " " : ""}${suffix}`;
  if (!number && number !== 0) return emptyText;
  const num = Number(number || 0);
  const maximumFractionDigits = Number.isInteger(num) ? 0 : numberOfFixed;

  return (
    prefix +
    num.toLocaleString("en-US", {
      maximumFractionDigits,
      ...localeStringOptions,
    }) +
    suffixParsed
  );
};

export const cleanData = (
  data: Params | Params[],
  ignoreKeys: string[] = [],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cleanValues: any[] = [null, "", undefined],
) => {
  const isArray = Array.isArray(data);
  let cloneData = isArray ? ([...data] as Params[]) : ({ ...data } as Params);
  if (isArray) {
    cloneData = cloneData.map((cloneItem: Params) => cleanData(cloneItem));
  } else {
    cloneData = Object.entries(cloneData).reduce(
      (out: Params | Params[], [key, value]) => {
        if (typeof value === "object") {
          out[key] = cleanData(value);
        } else if (ignoreKeys.includes(key) || !cleanValues.includes(value)) {
          out[key] = value;
        }
        return out;
      },
      {},
    );
  }
  return cloneData;
};

export const debounce = <F extends (...args: Parameters<F>) => ReturnType<F>>(
  func: F,
  waitFor: number,
) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<F>): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), waitFor);
  };
};

export const parseJSON = (
  data: string | undefined | null,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultData: any,
) => {
  try {
    if (!data) return defaultData;
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return defaultData;
  }
};
