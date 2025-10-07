/* eslint-disable @typescript-eslint/no-explicit-any */
import Book from "../types/Book";
import Status from "../types/Status";

export interface IInterprocessCommunication {
  initI18nData: ( resources: any ) => void;
  getSystemLocale: () => Promise<string>;
  node: () => string;
  chrome: () => string;
  electron: () => string;
  showMessageBox: ( message: string, buttons: string[] ) => Promise<number>; // Returns index of the button which the user selected.
  fetchStatus: () => Promise<{success: boolean, value: Status[], errMessage?: string }>;
  fetchBooks: () => Promise<{success: boolean, value: Book[], errMessage?: string }>;
  insertBook: ( newBook: Book ) => Promise<{success: boolean, value: Book, errMessage?: string}>;
  updateBook: ( bookId: number, newBook: Book ) => Promise<{success: boolean, changes?: any, errMessage?: string}>;

  getUsers: () => Promise<any[]>;
  addUser: (name: string, email: string) => Promise<{ success: boolean, changes?: number, error?: string }>;
}

declare global {
  interface Window {
    interprocessCommunication: IInterprocessCommunication;
  }
}
