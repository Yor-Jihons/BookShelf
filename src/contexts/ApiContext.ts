// src/contexts/ApiContext.ts
import { createContext, useContext } from 'react';
import { IInterprocessCommunication } from '../@types/global';

export const ApiContext = createContext<IInterprocessCommunication | undefined>(undefined);

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) throw new Error('useApi must be used within ApiProvider');
  return context;
};
