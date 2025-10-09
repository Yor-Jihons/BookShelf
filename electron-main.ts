import { app, BrowserWindow, Menu, ipcMain, dialog } from 'electron';
import DataBaseEx from "./src/main/databases/DataBaseEx.js";
import PathManager from "./src/main/paths/PathManager.js";
import { showOpenFileDialog2Import, showSaveFileDialog2Export } from "./src/main/dialogs/Dialogs.js";
import createMenuTemplate from "./src/main/menus/createMenuTemplate.js";
import cleanupTempFile from "./src/main/cleanups/cleanupTempFile.js";
import path from 'path';
import Files from "./src/main/files/Files.js";
import { fileURLToPath } from 'url';
import exportHtml from "./src/main/files/exportHtml.js"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let i18nData: any = {};

let systemLocale: string | null = null;

const __filename = fileURLToPath( import.meta.url );
const __dirname = path.dirname( __filename );
let preloadPath: string;
if( process.env.NODE_ENV === 'development' ) {
  preloadPath = path.join( __dirname, 'preload.js' );
}else{
  preloadPath = path.join( __dirname, 'preload.js' );
}

const pathManager: PathManager = new PathManager();
const db = new DataBaseEx();
let mainWindow: BrowserWindow;

const tempDbPath = path.join( app.getPath('userData'), '__temp_backup_db.db' );
cleanupTempFile( tempDbPath );

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function calcI18nData( i18nData: any, systemLocale: string|null ){
  if( systemLocale === "ja" ) return i18nData.ja;
return i18nData.en;
}

async function importDBFromOtherDirPath(){
  try{
    const { canceled, filePaths } = await showOpenFileDialog2Import( mainWindow, calcI18nData( i18nData, systemLocale ) );
    if( canceled ) return;

    const dbFilePath = pathManager.dbFilePath;

    Files.copyFile( filePaths[0], tempDbPath );
    db.close();
    Files.deleteFile( dbFilePath );
    Files.moveFile( tempDbPath, dbFilePath );
    db.open( dbFilePath );

    dialog.showMessageBox( mainWindow, { message: "Restored" } );
  }catch( err ){
    console.error( err.message );
  }
}

async function exportDB2OtherDirPath(){
  try{
    const { canceled, filePath } = await showSaveFileDialog2Export( mainWindow, calcI18nData( i18nData, systemLocale ) );
    if( canceled ) return;
    db.backup( filePath, ( message:string ) => { dialog.showMessageBox( mainWindow, { message: message } ); } );
  }catch( err ){
    console.error( err.message );
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: preloadPath,
      contextIsolation: true,
      nodeIntegration: false,
    },
    icon: path.join(__dirname, 'src', 'assets', 'favicon.png')
  });

  if( process.env.NODE_ENV === 'development' ){
    mainWindow.loadURL( 'http://localhost:5173' );
    mainWindow.webContents.openDevTools();
  }else{
    mainWindow.loadFile(path.join(__dirname, 'index.html'));
  }
}

app.whenReady().then(() => {
  systemLocale = app.getLocale();
  console.log(`OSの言語設定: ${systemLocale}`);

  pathManager.init( "database.sqlite", __dirname );

  try{
    db.open( pathManager.dbFilePath );
    db.createTables();
    createWindow();
  }catch( err ){
    dialog.showErrorBox( "起動エラー", err.message );
    app.quit();
    return;
  }

  app.on('activate', () => {
    if( BrowserWindow.getAllWindows().length === 0 ){
      createWindow();
    }
  });

  ipcMain.handle('show-messagebox', async (event, { message, buttons }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (await dialog.showMessageBox( mainWindow, { message: message, buttons: buttons } ) as any).response;
  });

  // TODO:
  ipcMain.on('export-html', () => {
    exportHtml( db, mainWindow );
  });

  ipcMain.handle('fetch-status', () => {
    return db.fetchStatus();
  });

  ipcMain.handle('update-book', (event, {bookId, newBook}) => {
    return db.updateBook( bookId, newBook );
  });

  ipcMain.handle('delete-book', (event, {bookId}) => {
    return db.deleteBook( bookId );
  });

  ipcMain.handle('fetch-books', () => {
    return db.fetchBooks();
  });

  ipcMain.handle('insert-book', (event, {newBook}) => {
    return db.insertBook( newBook );
  });

  ipcMain.handle('add-user', (event, { name, email }) => {
    return db.addUser( name, email );
  });

  ipcMain.handle('add-users-in-transaction', (event, users) => {
    return db.addUsersWithTransaction( users );
  });

  ipcMain.on('init-i18n-data', (event, data) => {
    i18nData = data;

    const isPortableMode = pathManager.isPortableMode;
    const i18nDataRet = calcI18nData( i18nData, systemLocale );
    Menu.setApplicationMenu( Menu.buildFromTemplate( createMenuTemplate( i18nDataRet, isPortableMode, importDBFromOtherDirPath, exportDB2OtherDirPath ) ) );
  });

  ipcMain.handle('get-system-locale', () => {
    return systemLocale;
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    db.close();
    app.quit();
  }
});
