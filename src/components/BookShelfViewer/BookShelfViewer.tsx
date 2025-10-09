import React from 'react';
import Book from '../../types/Book';

interface Props {
    books: Book[];
    styles: string;
}

const BookShelfViewer = ( { books, styles }: Props ) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const b = books.length;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const s = styles;
    return (
        <React.Fragment>
            
        </React.Fragment>
    );
};

export default BookShelfViewer;
