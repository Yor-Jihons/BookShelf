import React, { useEffect, useRef, useState } from 'react';
import Book from '../../types/Book';
import styles from "./editdialog.module.css";

interface Props {
    onSubmit: ( newBook: Book ) => void;
    onClose?: () => void;
    isOpen: boolean;
}

const EditDialog = ( {onSubmit, onClose, isOpen}: Props ) => {
    const dialogRef = useRef<HTMLDialogElement>( null );
    const [bookTitle, setBookTile] = useState<string>( "" ); // TODO:

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

    return (
        <React.Fragment>
            <dialog ref={dialogRef} onCancel={onClose} id="add-chat-dialog" className={styles.dialog}>
                <form onSubmit={handleSubmit} className={styles.additiondialog_form} action="" method="post">
                    <div className={styles.content_area}>
                        <h3 className={styles.dialog_header}>書籍の登録</h3>
                        <p>
                            <label htmlFor='book_title'>タイトル:</label>
                            <input type='text' id="book_title" value={bookTitle} onChange={ (e) => setBookTile( e.target.value ) } />
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
