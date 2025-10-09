import Book from "../../types/Book.js";
import DataBaseEx from "../databases/DataBaseEx.js";
import { showSaveFileDialog2ExportAsHtml } from "../dialogs/Dialogs.js";
import createViewrHtml from "./createViewrHtml.js";
import fs from 'fs';
import { dialog } from 'electron';

export default async function exportHtml( db: DataBaseEx, mainWindow: Electron.BrowserWindow ){
  const filePath = await showSaveFileDialog2ExportAsHtml( mainWindow );
  if( filePath.canceled ) return;

  const ret = db.fetchBooks();
  if( !ret.success ){
    return;
  }
  const books: Book[] = ret.value as Book[];
  fs.writeFileSync( filePath.filePath, createViewrHtml( books ) );
  dialog.showMessageBox( mainWindow, { message: "エクスポートしました。", buttons: ["OK"] } );
}
