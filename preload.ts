import { contextBridge, ipcRenderer } from 'electron';
import Book from "./src/types/Book";

contextBridge.exposeInMainWorld('interprocessCommunication', {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initI18nData: ( resources: any ) => ipcRenderer.send( 'init-i18n-data', resources ),
  getSystemLocale: () => ipcRenderer.invoke( 'get-system-locale' ),
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  showMessageBox: ( message: string, buttons: string[] ) => ipcRenderer.invoke( 'show-messagebox', { message, buttons } ),
  fetchStatus: () => ipcRenderer.invoke( 'fetch-status' ),
  fetchBooks: () => ipcRenderer.invoke( 'fetch-books' ),
  insertBook: ( newBook: Book ) => ipcRenderer.invoke( 'insert-book', { newBook } ),
  updateBook: ( bookId: number, newBook: Book ) => ipcRenderer.invoke('update-book', { bookId, newBook}),

  // IPC通信用のAPIを追加
  getUsers: () => ipcRenderer.invoke('get-users'),
  addUser: (name: string, email: string) => ipcRenderer.invoke('add-user', { name, email }),
});
