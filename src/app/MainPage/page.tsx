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
import { initialBook } from '../../types/inintialBook';

function MainPage() {
  const { i18n } = useTranslation();

  const [status, setStatus] = useState<Status[]>( [] );
  const [books, setBooks] = useState<Book[]>( [] );
  const [selectedBookId, setSelectedBookId] = useState<number|null>( 0 );
  const [isEditOpen, setIsEditOpen] = useState<boolean>( false );

  const editingBook: Book = (selectedBookId !== null && books.find(book => book.id === selectedBookId)) || { ...initialBook }; 

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

  const editDialog_submit = async ( newBook: Book ) => {
    if( selectedBookId === null ){
        const ret = await window.interprocessCommunication.insertBook( newBook );
        if( !ret.success ){
          return;
        }

        setBooks( prevBooks => [ ...prevBooks, ret.value ] );
    }else{
        await window.interprocessCommunication.updateBook( 1, newBook ); // TODO: Modify the ID.
        setBooks(prevBooks => 
            prevBooks.map(book => 
                book.id === selectedBookId ? newBook : book
            )
        );
    }

    setSelectedBookId( null );
    setIsEditOpen( false );
  }

  const link_click = ( event: React.MouseEvent<HTMLAnchorElement> ) => {
    const id = Number( event.currentTarget.dataset.id );
    setSelectedBookId( id );
    setIsEditOpen( true );
  }

  const deleteButton_click = async ( event: React.MouseEvent<HTMLButtonElement> ) => {
    const id = Number( event.currentTarget.dataset.id );
    await window.interprocessCommunication.deleteBook( id );
    setBooks( books.filter((book) => (book.id !== id) ) );
  }

  const additionButton_click = () => {
    setSelectedBookId( null );
    setIsEditOpen( true );
  }

  const exportHtmlButton_click = () => {
    window.interprocessCommunication.exportHtml();
  }

  useEffect(() => {
    fetchBooks();
    fetchStatus();
  }, []);

  return (
    <CommonLayout>
      <EditDialog isOpen={isEditOpen} onClose={editDialog_close} onSubmit={editDialog_submit} selectedBook={editingBook} />

      <button onClick={additionButton_click}>書籍の追加</button>
      <button onClick={exportHtmlButton_click}>HTMLとしてエクスポートする</button>

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
              <th className={styles.isbn}>ISBN</th>
              <th className={styles.deletebutton_area}>&nbsp;</th>
              </tr>
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
                  <td className={styles.deletebutton_area}>
                    <button className={styles.deletebutton} data-id={book.id} onClick={deleteButton_click}>削除</button>
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
