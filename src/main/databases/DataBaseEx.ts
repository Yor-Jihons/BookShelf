/* eslint-disable @typescript-eslint/no-explicit-any */
import BetterSqlite3 from 'better-sqlite3';
import Book from '../../types/Book.js';

export default class DataBaseEx{
    #db: BetterSqlite3.Database|undefined;

    public close(){
        this.#db!.close();
    }

    public getDB() : BetterSqlite3.Database{
        return this.#db!;
    }

    public constructor(){
        this.#db = undefined;
    }

    public open( dbFilePath: string ) : boolean{
        this.#db = new BetterSqlite3( dbFilePath );
    return true;
    }

    public backup( backupDbFilePath: string, callBackFunc: (message: string) => void ){
        this.#db?.backup( backupDbFilePath ).then( () => {
            callBackFunc( "バックアップが完了しました。" );
        }).catch( ( err ) => {
            callBackFunc( "バックアップ中にエラーが発生しました:" + err.message );
        });
    }

    public createTables() : BetterSqlite3.Database{
        return this.#db!.exec(`
            CREATE TABLE IF NOT EXISTS status(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                state_txt TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS books(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                book_title TEXT NOT NULL,
                author TEXT DEFAULT '',
                url TEXT DEFAULT '',
                isbn TEXT DEFAULT '',
                volume_edition TEXT DEFAULT '',
                genres_txt TEXT DEFAULT '',
                publisher TEXT DEFAULT '',
                summary_memo TEXT DEFAULT '',
                purchase_date TEXT DEFAULT '',
                purchase_price TEXT DEFAULT '',
                finish_date TEXT DEFAULT '',
                is_owned INTEGER DEFAULT 1,
                status_id INTEGER DEFAULT 0
            );
            INSERT OR IGNORE INTO status VALUES(1, '所有:積読');
            INSERT OR IGNORE INTO status VALUES(2, '所有：読書中');
            INSERT OR IGNORE INTO status VALUES(3, '所有：読了');
            INSERT OR IGNORE INTO status VALUES(4, '売却/破棄済み');
            INSERT OR IGNORE INTO status VALUES(5, '貸借：返却済み（読了）');
            INSERT OR IGNORE INTO status VALUES(6, '貸借：返却済み（未了）');
            INSERT OR IGNORE INTO status VALUES(7, '貸借：現在貸出中');
        `);
    }

    public fetchStatus(){
        try{
            const stmt = this.#db!.prepare( 'SELECT * FROM status' );
            return {success: true, value: stmt.all() };
        }catch( error: unknown ){
            return {success: false, value: [], errMessage: (error as Error).message};
        }
    }

    public fetchBooks(){
        try{
            const stmt = this.#db!.prepare( 'SELECT * FROM books' );
            return {success: true, value: stmt.all() };
        }catch( error: unknown ){
            return {success: false, value: [], errMessage: (error as Error).message};
        }
    }

    public updateBook( bookId: number, newBook: Book ){
        try{
            const sql = `
                UPDATE books SET book_title = ?, author = ?, url = ?, isbn = ?,
                    volume_edition = ?, genres_txt = ?, publisher = ?, summary_memo = ?,
                    purchase_date = ?, purchase_price = ?, finish_date = ?, is_owned = ?,
                    status_id = ?
                WHERE id = ?
            `;
            const stmt = this.#db!.prepare( sql );
            const info = stmt.run(
                newBook.book_title, newBook.author, newBook.url, newBook.isbn,
                newBook.volume_edition, newBook.genres_txt, newBook.publisher, newBook.summary_memo,
                newBook.purchase_date, newBook.purchase_price, newBook.finish_date, newBook.is_owned ? 1 : 0,
                newBook.status_id,
                bookId
            ) as any;
            return { success: true, changes: info.changes };
        }catch( error: unknown ){
            return { success: false, errMessage: (error as Error).message };
        }
    }

    public deleteBook( bookId: number ){
        try{
            const stmt = this.#db!.prepare( "DELETE FROM books WHERE id = ?" );
            const info = stmt.run( bookId ) as any;
            return { success: true, changes: info.changes };
        }catch( error: unknown ){
            return { success: false, errMessage: (error as Error).message };
        }
    }

    public insertBook( newBook: Book ){
        const sql: string = `
            INSERT INTO books(
                    book_title, author, url, isbn,
                    volume_edition, genres_txt, publisher, summary_memo,
                    purchase_date, purchase_price, finish_date, is_owned,
                    status_id
                ) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                RETURNING id
        `;
        const stmt = this.#db!.prepare( sql );
        try{
            const insertedRow = stmt.get(
                newBook.book_title, newBook.author, newBook.url, newBook.isbn,
                newBook.volume_edition, newBook.genres_txt, newBook.publisher, newBook.summary_memo,
                newBook.purchase_date, newBook.purchase_price, newBook.finish_date, newBook.is_owned ? 1 : 0,
                newBook.status_id
            ) as any;
            return { success: true, value: { ...newBook, id: insertedRow[ "id" ] } };
        }catch( error: unknown ){
            return { success: false, value: null, errMessage: (error as Error).message };
        }
    }

    public addUser( name: string, email: string ){
        try{
            const stmt = this.#db!.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
            const info = stmt.run( name, email );
            return { success: true, changes: info.changes };
        }catch( error: unknown ){
            console.error( 'Failed to add user:', error );
            if( error instanceof Error ) {
                return { success: false, error: error.message };
            }
            return { success: false, error: 'An unknown error occurred.' };
        }
    }

    public addUsersWithTransaction( users: any){
        try {
            // トランザクションを使う場合はこのメソッドに渡す
            const insertMany = this.#db!.transaction((users) => {
                const stmt = this.#db!.prepare( 'INSERT INTO users (name, email) VALUES (?, ?)' );
                for( const user of users ){
                    // ここで意図的にエラーを投げる
                    if( !user.email ){
                        // エラーが発生した場合、トランザクションはここで中断され、ロールバックされる
                        throw new Error('Email cannot be empty.');
                    }
                    stmt.run(user.name, user.email);
                }
            });

            // 実際に動かす
            insertMany(users);

            return { success: true, changes: users.length };
        }catch( error ){
            console.error('Transaction failed:', error);
            if (error instanceof Error) {
                return { success: false, error: error.message };
            }
            return { success: false, error: 'An unknown error occurred.' };
        }
    }
}
