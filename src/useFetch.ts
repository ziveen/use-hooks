import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { AxiosPromise } from 'axios';
// eslint-disable-next-line import/no-unresolved
import { BaseAPI } from './types/api';

function useFetch<T>(
  func: (args: Record<string, any>) => AxiosPromise<BaseAPI<T>>
): [boolean, T | undefined, Dispatch<SetStateAction<T>>];

function useFetch<T>(
  func: (args: Record<string, any>) => AxiosPromise<BaseAPI<T>>,
  defaultValue: T
): [boolean, T, Dispatch<SetStateAction<T>>];

function useFetch<T, U extends Record<string, any>>(
  func: (args: Record<string, any>) => AxiosPromise<BaseAPI<T>>,
  defaultValue: T,
  options?: {
    defaultParams?: U;
    handle?: Function;
  }
): [boolean, T, Dispatch<SetStateAction<T>>];

function useFetch<T, U extends Record<string, any>>(
  func: (args: Record<string, any>) => AxiosPromise<BaseAPI<T>>,
  defaultValue?: T,
  options?: {
    defaultParams?: U;
    handle?: Function;
  }
): [boolean, T | undefined, Dispatch<SetStateAction<T | undefined>>] {
  const [data, setData] = useState(defaultValue);
  const [loading, setLoading] = useState(false);
  const [destroyed, destory] = useState<boolean>(false);

  useEffect(() => {
    const params = options?.defaultParams || {};
    const fetchData = async (args: Record<string, any>) => {
      setLoading(true);
      const resp = await func(args);
      setLoading(false);
      if (resp.status === 200) {
        if (!destroyed) {
          setData(resp.data.payload);
        }
      } else if (options && options.handle) {
        options.handle(resp);
      }
    };
    fetchData(params).then();
    return () => {
      destory(true);
    };
  }, []);

  return [loading, data, setData];
}

export default useFetch;
