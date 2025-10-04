import { useState, useEffect } from 'react';
//import reactLogo from '../assets/react.svg';
//import viteLogo from '/vite.svg';
import { useTranslation } from 'react-i18next';
import '../../App.css';
import styles from "./mainpage.module.css";
import CommonLayout from '../layout';
import Status from '../../types/Status';
import Book from '../../types/Book';

function MainPage() {

  const { i18n } = useTranslation();

  const [status, setStatus] = useState<Status[]>( [] );
  const [books, setBooks] = useState<Book[]>( [] );

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

  useEffect(() => {
    fetchBooks();
    fetchStatus();
  }, []);

  return (
    <CommonLayout>
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
                  <td className={styles.id}>{book.id}</td>
                  <td className={styles.title}>{book.book_title}</td>
                  <td className={styles.author}>{book.author}</td>
                  <td className={styles.isbn}>{book.isbn}</td>
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
