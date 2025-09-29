import { app } from 'electron';
import path from 'path';
import fs from 'fs';

export default class PathManager{
    #dbFileName: string;
    #dbFilePath: string;
    #mainDirPath: string;
    #isPortableMode: boolean;

    public constructor(){
        this.#dbFileName = "";
        this.#dbFilePath = "";
        this.#mainDirPath = "";
        this.#isPortableMode = false;
    }

    public init( dbFileName: string, mainDirPath: string ){
        this.#dbFileName = dbFileName;
        this.#mainDirPath = mainDirPath;
        const { dirPath, isPortableMode } = PathManager.createDatabaseDirPath( this.#mainDirPath );
        this.#isPortableMode = isPortableMode;
        this.#dbFilePath = path.join( dirPath, this.#dbFileName );
    }

    private static createDatabaseDirPath( mainDirPath: string ) : {dirPath: string, isPortableMode: boolean}{
        const portableDatabaseDirPath = path.join( mainDirPath, "data" );
        if( !fs.existsSync( portableDatabaseDirPath ) ){
            return { dirPath: app.getPath( "userData" ), isPortableMode: false };
        }
        return { dirPath: portableDatabaseDirPath, isPortableMode: true };
    }

    get isPortableMode() : boolean{
        return this.#isPortableMode;
    }

    get dbFilePath() : string{
        return this.#dbFilePath;
    }
}
