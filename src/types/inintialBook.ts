import Book from "./Book";

export const initialBook: Book = {
    id: -1, // 仮のID。実際にはDBに登録時に採番される
    book_title: '',
    author: '',
    isbn: '',
    publisher: '',
    url: '',
    volume_edition: '',
    genre_txt: '',
    summary_memo: '',
    purchase_date: '',
    purchase_price: '',
    finish_date: '',
    is_owned: true,
    status_id: 0,
};
