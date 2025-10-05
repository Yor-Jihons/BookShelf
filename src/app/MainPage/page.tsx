import React, { useState, useEffect } from 'react';
//import reactLogo from '../assets/react.svg';
//import viteLogo from '/vite.svg';
import { useTranslation } from 'react-i18next';
import '../../App.css';
import styles from "./mainpage.module.css";
import CommonLayout from '../layout';
import Status from '../../types/Status';
import Book from '../../types/Book';
import EditDialog from '../../components/EditDialog/EditDialog';

function MainPage() {

  const { i18n } = useTranslation();

  const [status, setStatus] = useState<Status[]>( [] );
  const [books, setBooks] = useState<Book[]>( [] );
  const [isEditOpen, setIsEditOpen] = useState<boolean>( false );

  const fetchStatus = async () => {
    const ret = await window.interprocessCommunication.fetchStatus();
    if( !ret.success ) return;

    setStatus( ret.value );
  }

  const fetchBooks = async () => {
    const ret = await window.interprocessCommunication.fetchBooks();
    if( !ret.success ) return;

    setBooks( ret.value );
  }

  const editDialog_close = () => {
    setIsEditOpen( false );
  }

  const editDialog_submit = ( newBook: Book ) => {
    console.log( newBook.id ); // TODO:
  }

  const link_click = ( event: React.MouseEvent<HTMLAnchorElement> ) => {
    const v: string = event.currentTarget.dataset.id!;
    setIsEditOpen( true );
    console.log( v );
  }

  useEffect(() => {
    fetchBooks();
    fetchStatus();
  }, []);

  return (
    <CommonLayout>
      <EditDialog isOpen={isEditOpen} onClose={editDialog_close} onSubmit={editDialog_submit} selectedBook={books[0]} />
      <div>
        <select>
          {books.map( (book, idx) => {
            return <option key={idx}>{book.book_title}</option>
          })}
        </select>

        <select>
          {status.map( (s, idx) => {
            return <option key={idx}>{s.state_txt}</option>
          })}
        </select>
        <div>{i18n.t('menu.zoom_in')}</div>

        <div className={styles.table1}>
          <table className={styles.table1}>
            <thead>
              <tr><th className={styles.id}>ID</th>
              <th className={styles.title}>タイトル</th>
              <th className={styles.author}>著者</th>
              <th className={styles.isbn}>ISBN</th></tr>
            </thead>
            <tbody>
              {books.map( (book,idx) => {
                return <tr key={idx}>
                  <td className={styles.id}>
                    {book.id}
                  </td>
                  <td className={styles.title}>
                    <a href="#" onClick={link_click} data-id={book.id}>
                      {book.book_title}
                    </a>
                  </td>
                  <td className={styles.author}>
                    {book.author}
                  </td>
                  <td className={styles.isbn}>
                    {book.isbn}
                  </td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
      </div>
    </CommonLayout>
  );
}

export default MainPage;
