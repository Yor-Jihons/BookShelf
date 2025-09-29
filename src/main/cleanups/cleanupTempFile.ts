import fs from 'fs';

export default function cleanupTempFile( filepath: string ){
    try{
        if( fs.existsSync( filepath ) ) fs.unlinkSync( filepath );
    }catch( err ){
        console.error( '一時ファイルのクリーンアップ中にエラーが発生しました:', err );
    }
}
