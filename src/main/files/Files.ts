import fs from "fs";

export default class Files{
    public static copyFile( src: string, dist: string, mode?: number ){
        fs.copyFileSync( src, dist, mode );
    }

    public static deleteFile( dist: string ){
        fs.unlinkSync( dist );
    }

    public static moveFile( oldPath: string, newPath: string ){
        fs.renameSync( oldPath, newPath );
    }
}
