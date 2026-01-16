/* eslint-disable @typescript-eslint/no-explicit-any */
// src/api/ElectronApiClient.ts
import { IInterprocessCommunication } from '../@types/global';
import Book from '../types/Book';

/**
 * 本番環境（Electron）で動作するAPIの実装。
 * 全てのメソッドは preload.ts で露出された window.interprocessCommunication を呼び出します。
 */
export const ElectronApiClient: IInterprocessCommunication = {
    initI18nData: ( resources: any ) => window.interprocessCommunication.initI18nData(resources),
    getSystemLocale: () => window.interprocessCommunication.getSystemLocale(),
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    showMessageBox: ( message: string, buttons: string[] ) => window.interprocessCommunication.showMessageBox(message, buttons),
    fetchStatus: () => window.interprocessCommunication.fetchStatus(),
    fetchBooks: () => window.interprocessCommunication.fetchBooks(),
    insertBook: ( newBook: Book ) => window.interprocessCommunication.insertBook(newBook),
    updateBook: ( bookId: number, newBook: Book ) => window.interprocessCommunication.updateBook(bookId, newBook),
    deleteBook: ( bookId: number ) => window.interprocessCommunication.deleteBook(bookId),
    exportHtml: () => window.interprocessCommunication.exportHtml(),

    getUsers: () => window.interprocessCommunication.getUsers(),
    addUser: (name, email) => window.interprocessCommunication.addUser(name, email),
};
