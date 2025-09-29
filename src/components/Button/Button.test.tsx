import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import Button from './Button';

// Buttonコンポーネントのテストスイート
describe('Button Component', () => {

  // テストケース1: ボタンのテキストが正しく表示されるか
  test('renders the button with correct text', () => {
    // コンポーネントをレンダリング
    render(<Button>Click me</Button>);

    // "Click me"というテキストを持つボタン要素を取得
    const buttonElement = screen.getByRole('button', { name: /click me/i });

    // 要素がドキュメントに存在することを確認
    expect(buttonElement).toBeInTheDocument();
  });

  // テストケース2: クリック時にonClickハンドラが呼び出されるか
  test('calls the onClick handler when clicked', async () => {
    // モック関数を作成
    const handleClick = vi.fn();

    // コンポーネントをレンダリングし、モック関数をonClickに渡す
    render(<Button onClick={handleClick}>Click me</Button>);

    // ボタン要素を取得
    const buttonElement = screen.getByRole('button', { name: /click me/i });

    // ユーザーがボタンをクリックする動作をシミュレート
    await userEvent.click(buttonElement);

    // モック関数が1回呼び出されたことを確認
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
