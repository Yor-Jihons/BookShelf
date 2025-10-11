import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import EditDialog from './EditDialog'; 
import Book from '../../types/Book';
import Status from '../../types/Status';

// ----------------------------------------------------------------------
// モックデータ
// ----------------------------------------------------------------------

const mockStatuses: Status[] = [
    { id: 1, state_txt: '未読' },
    { id: 2, state_txt: '読書中' },
    { id: 3, state_txt: '読了' },
];

const mockExistingBook: Book = {
    id: 101,
    book_title: 'テスト書籍A',
    author: '著者X',
    url: 'http://test.com',
    isbn: '1234567890123',
    volume_edition: '上',
    genres_txt: 'SF,フィクション',
    publisher: 'テスト出版',
    summary_memo: 'テスト用メモ',
    purchase_date: '2023-01-01',
    purchase_price: '1500',
    finish_date: '2023-01-15',
    status_id: 3, // 読了
    is_owned: true,
};

const mockNewBook: Book = {
    id: -1,
    book_title: '',
    author: '',
    url: '',
    isbn: '',
    volume_edition: '',
    genres_txt: '',
    publisher: '',
    summary_memo: '',
    purchase_date: '',
    purchase_price: '',
    finish_date: '',
    status_id: 1, // 未読
    is_owned: false,
};

// ----------------------------------------------------------------------
// セットアップ関数
// ----------------------------------------------------------------------

/**
 * テストのセットアップとレンダリングを行うヘルパー関数
 */
const setup = (propsOverrides = {}) => {
    const defaultProps = {
        onSubmit: vi.fn(),
        onClose: vi.fn(),
        isOpen: true,
        selectedBook: mockNewBook, 
        status: mockStatuses,
    };
    const props = { ...defaultProps, ...propsOverrides };
    const user = userEvent.setup();
    
    // <dialog>要素のモック (テスト環境ではDOM APIが実装されていないことがあるため)
    if (!HTMLDialogElement.prototype.showModal) {
        HTMLDialogElement.prototype.showModal = vi.fn();
    }
    if (!HTMLDialogElement.prototype.close) {
        HTMLDialogElement.prototype.close = vi.fn();
    }
    
    // コンポーネントをレンダリング
    // getByTestIdを使用するため、レンダリング結果から取得する
    const renderResult = render(<EditDialog {...props} />);
    
    return { ...renderResult, props, user }; 
};

// ----------------------------------------------------------------------
// テストスイート
// ----------------------------------------------------------------------

describe('EditDialog', () => {
    // 1. ダイアログの開閉のテスト (これはgetByRoleでも動作することが多い)
    it('isOpenがtrueの場合、ダイアログが表示されるべき', () => {
        const { getByRole } = setup();
        
        // ダイアログ要素は role="dialog" で取得
        const dialog = getByRole('dialog', { hidden: true });
        expect(dialog).toBeInTheDocument();
        expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
    });

    // 2. 既存書籍データのロードのテスト
    it('既存の本が選択された場合、データがフォームにロードされるべき', () => {
        const { getByTestId } = setup({ selectedBook: mockExistingBook });
        
        // ★変更点: data-testid="book_title" の要素を取得
        const titleInput = getByTestId('book_title');
        // ★変更点: data-testid="status_id" の要素を取得
        const selectElement = getByTestId('status_id');

        expect(titleInput).toHaveValue(mockExistingBook.book_title);
        expect(selectElement).toHaveValue(String(mockExistingBook.status_id));
    });

    // 3. フォーム入力のテスト (タイピングによる状態変化)
    it('タイトル入力フィールドの変更がローカルな状態を更新すべき', async () => {
        const { getByTestId, user } = setup();
        
        // ★変更点: data-testid="book_title" の要素を取得
        const titleInput = getByTestId('book_title');
        const newTitle = '新しい本のタイトル';
        
        // タイピングをシミュレート
        await user.type(titleInput, newTitle);
        
        // inputの値が更新されたことを確認
        expect(titleInput).toHaveValue(mockNewBook.book_title + newTitle);
    });

    // 4. フォーム提出 (onSubmit) のテスト
    it('フォーム提出時に更新されたデータでonSubmitが呼び出されるべき', async () => {
        const { getByTestId, props, user } = setup();
        
        // ★変更点: data-testid="book_title" の要素を取得
        const titleInput = getByTestId('book_title');
        const newTitle = '変更後のタイトル';
        
        // データを入力
        await user.clear(titleInput); // 初期値をクリア
        await user.type(titleInput, newTitle);
        
        // ★変更点: data-testid="submit-button" の要素を取得
        // (注: submit-button は props のプロパティ名ではないが、フォームの操作ボタンとして例外的に命名)
        const submitButton = getByTestId('submit-button');
        
        // フォームを提出
        await user.click(submitButton);

        // onSubmitが1回呼ばれたことを確認
        expect(props.onSubmit).toHaveBeenCalledTimes(1);
        
        const submittedBook = props.onSubmit.mock.calls[0][0];
        
        // 提出された値が正しいことを確認
        expect(submittedBook.book_title).toBe(newTitle);
        expect(submittedBook.id).toBe(-1); // 新規作成IDが維持されていることを確認
    });
    
    // 5. キャンセルボタンのテスト
    it('キャンセルボタンがonCloseを呼び出すべき', async () => {
        const { getByTestId, props, user } = setup();
        
        // ★変更点: data-testid="cancel-button" の要素を取得
        // (注: cancel-button は props のプロパティ名ではないが、フォームの操作ボタンとして例外的に命名)
        const cancelButton = getByTestId('cancel-button');
        
        await user.click(cancelButton);
        
        // onCloseが1回呼ばれたことを確認
        expect(props.onClose).toHaveBeenCalledTimes(1);
    });
    
    // 6. selectタグの操作テストと提出
    it('本の状態セレクトボックスの選択変更がonSubmitで正しく反映されるべき', async () => {
        const { getByTestId, props, user } = setup({ selectedBook: mockExistingBook });
        
        // ★変更点: data-testid="status_id" の要素を取得
        const selectElement = getByTestId('status_id');
        
        // 初期値が'3'であることを確認
        expect(selectElement).toHaveValue('3');
        
        // '未読' (ID: 1) に変更
        await user.selectOptions(selectElement, '1'); 
        expect(selectElement).toHaveValue('1');
        
        // ★変更点: data-testid="submit-button" の要素を取得
        const submitButton = getByTestId('submit-button');
        await user.click(submitButton);
        
        const submittedBook = props.onSubmit.mock.calls[0][0];
        // 提出されたデータでstatus_idが1になっていることを確認
        expect(submittedBook.status_id).toBe(1); 
    });
});
