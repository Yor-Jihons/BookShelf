/* eslint-disable @typescript-eslint/no-explicit-any */
import { dialog } from 'electron';
import path from 'path';
import os from 'os';

export async function showSaveFileDialog2Export( browserWindow: Electron.BrowserWindow, i18nData: any ){
    if( Object.keys( i18nData ).length === 0 ) throw new Error( "Language definition file is empty." );

    const { canceled, filePath } = await dialog.showSaveDialog( browserWindow, {
        title: i18nData.translation.save_file_dialog_to_import.title,
        defaultPath: path.join( os.homedir(), "backup.db" ),
        buttonLabel: i18nData.translation.save_file_dialog_to_import.button_label,
        filters: [{ name: "SQLite3 files", extensions: ["db"] }]
    });
    return { canceled, filePath };
}

export async function showOpenFileDialog2Import( browserWindow: Electron.BrowserWindow, i18nData: any ){
    if( Object.keys( i18nData ).length === 0 ) throw new Error( "Language definition file is empty." );

    const { canceled, filePaths } = await dialog.showOpenDialog( browserWindow, {
        title: i18nData.translation.open_file_dialog_to_export.title,
        //defaultPath: path.join( os.homedir(), "backup.db" ),
        buttonLabel: i18nData.translation.open_file_dialog_to_export.button_label,
        properties: ["openFile"],
        filters: [{ name: "SQLite3 files", extensions: ["db"] }]
    });
    return { canceled, filePaths };
}
