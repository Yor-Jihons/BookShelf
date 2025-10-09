import Book from "../../types/Book.js";

function escapeHtml( unsafe: string ){
    if (!unsafe) return '';
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function createFlexCard( book: Book ){
    let text: string = '    <div class="book-card">\n';
    text += '      <h2>' + escapeHtml( book.book_title ) + '</h2>\n';
    text += '      <p class="title">書籍名: ' + escapeHtml( book.book_title ) + '</p>\n';
    text += '      <p class="author">著作者: ' + escapeHtml( book.author ) + '</p>\n';
    text += '      <p class="isbn">ISBN: ' + escapeHtml( book.isbn ) + '</p>\n';
    text += '      <p class="volume_edition">巻数/版: ' + escapeHtml( book.volume_edition ) + '</p>\n';
    text += '      <p class="url">URL: <a href="' + escapeHtml( book.url ) + '">site</a></p>\n';
    text += '      <p class="genres_txt">ジャンル: ' + escapeHtml( book.genres_txt ) + '</p>\n';
    text += '      <p class="publisher">出版社: ' + escapeHtml( book.publisher ) + '</p>\n';
    text += '      <p class="purchase_date">購入日: ' + escapeHtml( book.purchase_date ) + '</p>\n';
    text += '      <p class="purchase_price">購入金額: ' + escapeHtml( book.purchase_price ) + '</p>\n';
    text += '      <p class="finish_date">読了日: ' + escapeHtml( book.finish_date ) + '</p>\n';
    text += '      <p class="is_owned">所有しているかどうか: ' + (book.is_owned ? "YES" : "NO") + '</p>\n';
    text += '      <p class="status_id">状態: ' + escapeHtml( book.status_id.toString() ) + '</p>\n';
    text += '      <p class="summary_memo">メモ:</p>\n';
    text += '      <div>' + escapeHtml( book.summary_memo ) + '</div>\n';
    text += '    </div>\n'
return text;
}

export default function createViewrHtml( books: Book[] ){
  const bookCardsHtml = books.map(book => { return createFlexCard(book) } ).join(''); // 配列を結合して一つのHTML文字列にする

    const text = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BookShelf Viewer</title>
    <style>
        body{ background-color: hsla(60, 45%, 96%, 0.991); }
        h1{ text-align: center; }
        p{ margin: 0; padding: 0; }
        div#flexbox1{ display: flex; flex-direction: column; width: 100%; }
        div.book-card{ width: 98.5%; margin: 5px; padding-top: 0; padding-bottom: 0; padding-left: 5px; padding-right: 5px; background-color: rgb(196, 195, 195); display: flex; flex-direction: column; }
    </style>
</head>
<body>
    <h1>本棚の中身</h1>
    <div class="flexbox1">
        ${bookCardsHtml}
    </div>
</body>
</html>`;
    return text;
}
