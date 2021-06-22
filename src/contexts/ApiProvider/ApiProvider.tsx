import React, { ReactNode, useMemo, useRef, useState } from 'react';
import axios, { AxiosInstance, AxiosResponse } from "axios";
import pageService from "@api/services/page";

import {
  useSafeContext,
  createSafeConsumer,
  createSafeContext,
} from "../helpers";


interface ContextValue {
  services: {
    page: typeof pageService
  }
}

const Context = createSafeContext<ContextValue>();

export const useApi = () => useSafeContext(Context);

interface ApiProviderProps {
  children: ReactNode
}

// const instance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
//   timeout: 31000,
//   headers: {
//     Accept: "application/json"
//   },
// })

const ApiProvider = ({ children }: ApiProviderProps) => {
  // const axiosInstanceRef = useRef(instance);

  // const module = useMemo(() => {
  //   const axiosInstance = axiosInstanceRef.current;
  //   const resource = "module";

  //   const getAll = () => {
  //     return axiosInstance.get<{ data?: ModuleData[], error?: { message: string } }>(`/${resource}`);
  //   }

  //   const get = (id: number) => {
  //     return axiosInstance.get<{ data?: ModuleData, error?: { message: string } }>(`/${resource}/${id}`);
  //   }

  //   const create = (data: Partial<Omit<ModuleData, "id">>) => {
  //     return axiosInstance.post<{
  //       data?: ModuleData,
  //       error?: {
  //         fields: { [key: string]: string }
  //       }
  //     }>(`/${resource}`, data);
  //   }

  //   const update = (id: number, data: Partial<ModuleData>) => {
  //     return axiosInstance.put<{ data?: ModuleData, error?: { message: string, fields: { [key: string]: string } } }>(`/${resource}/${id}`, data);
  //   }

  //   const deleteOne = (id: number) => {
  //     return axiosInstance.delete<{ data?: { deletedCount: number }, error?: { message: string } }>(`/${resource}/${id}`);
  //   }

  //   const deleteAll = () => {
  //     return axiosInstance.delete<{ data?: { deletedCount: number }, error?: { message: string } }>(`/${resource}`);
  //   }

  //   return {
  //     getAll,
  //     get,
  //     create,
  //     update,
  //     deleteAll,
  //     deleteOne
  //   }
  // }, []);

  const api = useMemo(() => {
    return {
      services: {
        page: pageService
      }
    }
  }, [module]);

  return (
    <Context.Provider value={api}>
      {children}
    </Context.Provider>
  )
}

export default ApiProvider
