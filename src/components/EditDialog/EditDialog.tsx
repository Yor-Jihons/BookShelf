import React, { useEffect, useRef, useState } from 'react';
import Book from '../../types/Book';
import styles from "./editdialog.module.css";

interface Props {
    onSubmit: ( newBook: Book ) => void;
    onClose?: () => void;
    isOpen: boolean;
    selectedBook: Book;
}

const EditDialog = ( {onSubmit, onClose, isOpen, selectedBook}: Props ) => {
    const dialogRef = useRef<HTMLDialogElement>( null );
    const [bookTitle, setBookTile] = useState<string>( selectedBook?.book_title || "" );
    const [author, setAuthor] = useState<string>( selectedBook?.author || "" );
    const [url, setUrl] = useState<string>( selectedBook?.url || ""  );
    const [isbn, setISBN] = useState<string>( selectedBook?.isbn || ""  );
    const [volumeEdition, setVolumeEdition] = useState<string>( selectedBook?.volume_edition || ""  );
    const [genres, setGenres] = useState<string>( selectedBook?.genre_txt || ""  );
    const [publisher, setPublisher] = useState<string>( selectedBook?.publisher || ""  );
    const [memo, setMemo] = useState<string>( selectedBook?.summary_memo || ""  );
    const [purchaseDate, setPurchaseDate] = useState<string>( selectedBook?.purchase_date || ""  );
    const [purchasePrice, setPurchasePrice] = useState<string>( selectedBook?.purchase_price || ""  );
    const [finishDate, setFinishDate] = useState<string>( selectedBook?.finish_date || ""  );
    //const [statusId, setStatusId] = useState<number>( selectedBook?.status_id || 0  );
    const [isOwned, setIsOwned] = useState<boolean>( selectedBook?.is_owned || true  );

    useEffect( () => {
        if( dialogRef.current ){
            if( isOpen ){
                dialogRef.current.showModal();
            }else{
                //setAppName( "" );
                dialogRef.current.close();
            }
        }
    }, [ isOpen ] );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const tmp = { id: 1 } as Book; // TODO:
        onSubmit( tmp );
    };

/*
    status_id: number;
*/

    return (
        <React.Fragment>
            <dialog ref={dialogRef} onCancel={onClose} id="add-chat-dialog" className={styles.dialog}>
                <form onSubmit={handleSubmit} className={styles.additiondialog_form} action="" method="post">
                    <div className={styles.content_area}>
                        <h3 className={styles.dialog_header}>書籍の登録</h3>
                        <p>
                            <label htmlFor='book_title' className={styles.label1}>タイトル:</label>
                            <input type='text' id="book_title" value={bookTitle} onChange={ (e) => setBookTile( e.target.value ) } />
                        </p>
                        <p>
                            <label htmlFor='author' className={styles.label1}>著者名:</label>
                            <input type='text' id="author" value={author} onChange={ (e) => setAuthor( e.target.value ) } />
                        </p>
                        <p>
                            <label htmlFor='url' className={styles.label1}>URL:</label>
                            <input type='text' id="url" value={url} onChange={ (e) => setUrl( e.target.value ) } />
                        </p>
                        <p>
                            <label htmlFor='isbn' className={styles.label1}>ISBN:</label>
                            <input type='text' id="isbn" value={isbn} onChange={ (e) => setISBN( e.target.value ) } />
                        </p>
                        <p>
                            <label htmlFor='volume_edition' className={styles.label1}>巻数/版:</label>
                            <input type='text' id="volume_edition" value={volumeEdition} onChange={ (e) => setVolumeEdition( e.target.value ) } />
                        </p>
                        <p>
                            <label htmlFor='genres_txt' className={styles.label1}>ジャンル:</label>
                            <input type='text' id="genres_txt" value={genres} onChange={ (e) => setGenres( e.target.value ) } />
                        </p>
                        <p>
                            <label htmlFor='publisher' className={styles.label1}>出版社:</label>
                            <input type='text' id="publisher" value={publisher} onChange={ (e) => setPublisher( e.target.value ) } />
                        </p>
                        <p>
                            <label htmlFor='summary_memo' className={styles.label1}>概要/メモ:</label>
                            <input type='text' id="summary_memo" value={memo} onChange={ (e) => setMemo( e.target.value ) } />
                        </p>
                        <p>
                            <label htmlFor='purchase_date' className={styles.label1}>購入日:</label>
                            <input type='text' id="purchase_date" value={purchaseDate} onChange={ (e) => setPurchaseDate( e.target.value ) } />
                        </p>
                        <p>
                            <label htmlFor='purchase_price' className={styles.label1}>購入金額:</label>
                            <input type='text' id="purchase_price" value={purchasePrice} onChange={ (e) => setPurchasePrice( e.target.value ) } />
                        </p>
                        <p>
                            <label htmlFor='finish_date' className={styles.label1}>読了日:</label>
                            <input type='text' id="finish_date" value={finishDate} onChange={ (e) => setFinishDate( e.target.value ) } />
                        </p>
                        <p>
                            <label htmlFor='is_owned' className={styles.label1}>本棚にあるかどうか:</label>
                            <input type="checkbox" name="is_owned" value="is_owned" checked={isOwned} onChange={(e) => setIsOwned( e.currentTarget.checked )} />
                        </p>
                        <p>
                            <label htmlFor='status_id' className={styles.label1}>本の状態:</label>
                            {/* TODO:  */}
                        </p>
                    </div>
                    <div className={styles.button_area}>
                        <button type="submit" className={styles.submit_button}>登録</button>
                        <button type="button" onClick={onClose} className={styles.cancel_button}>キャンセル</button>
                    </div>
                </form>
            </dialog>
        </React.Fragment>
    );
};

export default EditDialog;
