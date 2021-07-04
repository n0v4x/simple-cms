import React, { ReactNode, useMemo, useRef, useState } from 'react';
import pageService from "@api/services/page";

import {
  useSafeContext,
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


const ApiProvider = ({ children }: ApiProviderProps) => {
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
