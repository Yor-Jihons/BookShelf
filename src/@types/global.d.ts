/* eslint-disable @typescript-eslint/no-explicit-any */
import Book from "../types/Book";
import IPCResult from "../types/IPCResult";
import Status from "../types/Status";

export interface IInterprocessCommunication {
  initI18nData: ( resources: any ) => void;
  getSystemLocale: () => Promise<string>;
  node: () => string;
  chrome: () => string;
  electron: () => string;
  showMessageBox: ( message: string, buttons: string[] ) => Promise<number>; // Returns index of the button which the user selected.
  fetchStatus: () => Promise<IPCResult<Status[]>>;
  fetchBooks: () => Promise<IPCResult<Book[]>>;
  insertBook: ( newBook: Book ) => Promise<IPCResult<Book>>;
  updateBook: ( bookId: number, newBook: Book ) => Promise<{success: boolean, changes?: any, errMessage?: string}>;
  deleteBook: ( bookId: number ) => Promise<{success: boolean, changes?: any, errMessage?: string}>;
  exportHtml: () => void;

  getUsers: () => Promise<any[]>;
  addUser: (name: string, email: string) => Promise<{ success: boolean, changes?: number, error?: string }>;
}

declare global {
  interface Window {
    interprocessCommunication: IInterprocessCommunication;
  }
}
