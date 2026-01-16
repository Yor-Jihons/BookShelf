import React from 'react';
import { IInterprocessCommunication } from '../@types/global';
import { ApiContext } from './ApiContext';

export const ApiProvider: React.FC<{ api: IInterprocessCommunication; children: React.ReactNode }> = ({ api, children }) => {
  return <React.Fragment>
    <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
  </React.Fragment>;
};
