import React, { useEffect, useRef, useState } from 'react';
import Book from '../../types/Book';
import styles from "./editdialog.module.css";
import Status from '../../types/Status';

interface Props {
    onSubmit: ( newBook: Book ) => void;
    onClose?: () => void;
    isOpen: boolean;
    status: Status[];
    selectedBook: Book;
}

const EditDialog = ( {onSubmit, onClose, isOpen, selectedBook, status}: Props ) => {
    const dialogRef = useRef<HTMLDialogElement>( null );
    const [bookTitle, setBookTile] = useState<string>( "" );
    const [author, setAuthor] = useState<string>( "" );
    const [url, setUrl] = useState<string>( ""  );
    const [isbn, setISBN] = useState<string>( ""  );
    const [volumeEdition, setVolumeEdition] = useState<string>( ""  );
    const [genres, setGenres] = useState<string>( "" );
    const [publisher, setPublisher] = useState<string>( "" );
    const [memo, setMemo] = useState<string>( "" );
    const [purchaseDate, setPurchaseDate] = useState<string>( "" );
    const [purchasePrice, setPurchasePrice] = useState<string>( "" );
    const [finishDate, setFinishDate] = useState<string>( "" );
    const [statusId, setStatusId] = useState<number>( selectedBook?.status_id || 0  );
    const [isOwned, setIsOwned] = useState<boolean>( false );

    useEffect( () => {
        if( dialogRef.current ){
            if( isOpen ){
                dialogRef.current.showModal();
            }else{
                dialogRef.current.close();
            }
        }

        if( selectedBook ){
            setBookTile( selectedBook?.book_title || "" );
            setAuthor( selectedBook?.author || "" );
            setUrl( selectedBook?.url || "" );
            setISBN( selectedBook?.isbn || "" );
            setVolumeEdition( selectedBook?.volume_edition || "" );
            setGenres( selectedBook?.genres_txt || "" );
            setPublisher( selectedBook?.publisher || "" );
            setMemo( selectedBook?.summary_memo || "" );
            setPurchaseDate( selectedBook?.purchase_date || "" );
            setPurchasePrice( selectedBook?.purchase_price || "" );
            setFinishDate( selectedBook?.finish_date || "" );
            setStatusId( selectedBook?.status_id || 0 );
            setIsOwned( selectedBook?.is_owned || false );
        }
    }, [ isOpen, selectedBook ] );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const t = bookTitle;
        const a = author;
        const u = url;
        const i = isbn;
        const v = volumeEdition;
        const g = genres;
        const p = publisher;
        const m = memo;
        const pd = purchaseDate;
        const pp = purchasePrice;
        const fd = finishDate;
        const si = statusId;
        const io = isOwned;
        const tmp = {
            id: -1, // TODO: Modify here.
            book_title: t, author: a,
            url: u, isbn: i, volume_edition: v,
            genres_txt: g, publisher: p, summary_memo: m,
            purchase_date: pd, purchase_price: pp, finish_date: fd,
            status_id: si,
            is_owned: io
        } as Book;
        onSubmit( tmp );
    };

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
                            <select value={statusId} onChange={ (e) => setStatusId( Number(e.currentTarget.value ) )}>
                                {status.map( (s, idx) => {
                                    return <option key={idx} value={s.id}>{s.state_txt}</option>
                                })}
                            </select>
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
