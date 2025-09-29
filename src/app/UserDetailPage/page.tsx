import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CommonLayout from '../layout';

// 仮のデータストア（本来はデータベースから取得します）
const dummyUsers = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' },
];

function UserDetailPage() {
  // useParamsフックを使ってURLのパラメータを取得
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<{ id: number; name: string; email: string } | null>(null);

  useEffect(() => {
    // URLパラメータのIDからユーザーを検索
    // ここでipcRenderer.invokeを使ってデータベースからユーザー情報を取得する
    const foundUser = dummyUsers.find((u) => u.id === Number(id));
    setUser(foundUser || null);
  }, [id]);

  if (!user) {
    return <div>ユーザーが見つかりません。</div>;
  }

  return (
    <CommonLayout>
      <div>
        <h1>ユーザー詳細ページ</h1>
        <p>ID: {user.id}</p>
        <p>名前: {user.name}</p>
        <p>メールアドレス: {user.email}</p>
        <Link to="/users">一覧に戻る</Link>
      </div>
    </CommonLayout>
  );
}

export default UserDetailPage;