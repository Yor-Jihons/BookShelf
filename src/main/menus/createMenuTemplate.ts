import { MenuItem } from 'electron';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function createMenuTemplate( resource: any, isPortableMode: boolean = true, databaseImportFunc: () => void = ()=>{}, databaseExportFunc: () => void = ()=>{}) : (MenuItem | Electron.MenuItemConstructorOptions)[]{
    const viewMenu = {
        label: resource.translation.menu.view,
        submenu: [
            { role: 'reload', label: resource.translation.menu.reload },
            { role: 'forceReload', label: resource.translation.menu.force_reload },
            //{ role: 'toggleDevTools', label: resource.translation.menu.toggle_devtools },
            { type: 'separator' },
            { role: 'resetZoom', label: resource.translation.menu.reset_zoom },
            { role: 'zoomIn', label: resource.translation.menu.zoom_in },
            { role: 'zoomOut', label: resource.translation.menu.zoom_out },
        ],
    } as MenuItem | Electron.MenuItemConstructorOptions;
    const fileMenu = {
        label: resource.translation.menu.file,
        submenu: [
            {
                label: resource.translation.menu.restore_data,
                click: databaseImportFunc
            },
            {
                label: resource.translation.menu.backup_data,
                click:  databaseExportFunc
            },
        ],
    } as MenuItem | Electron.MenuItemConstructorOptions;
    const windowMenu = {
        label: resource.translation.menu.window,
        submenu: [{ role: 'close', label: resource.translation.menu.close }],
    } as MenuItem | Electron.MenuItemConstructorOptions;

    const ret: (MenuItem | Electron.MenuItemConstructorOptions)[] = [];
    ret.push( viewMenu );

    if( !isPortableMode ){
        ret.push( fileMenu );
    }

    ret.push( windowMenu );
return ret;
}
