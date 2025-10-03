export default interface Book{
    id: number;
    book_title: string;
    author: string;
    url: string;
    isbn: string;
    volume_edition: string;
    genre_txt: string;
    publisher: string;
    summary_memo: string;
    purchase_date: string;
    purchase_price: string;
    finish_date: string;
    is_owned: boolean;
    status_id: number;
}
