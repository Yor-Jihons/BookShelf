import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CommonLayout from '../layout';

const dummyUsers = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' },
];

function UserListPage() {
  const [users, setUsers] = useState<typeof dummyUsers>([]);
  
  // useNavigateフックを呼び出す
  const navigate = useNavigate();

  useEffect(() => {
    setUsers(dummyUsers);
  }, []);

  // ボタンクリック時のイベントハンドラ
  const handleButtonClick = (userId: number) => {
    // navigate関数を呼び出し、詳細ページへのパスを渡す
    navigate(`/users/${userId}`);
  };

  return (
    <CommonLayout>
      <div>
        <h1>ユーザー一覧</h1>
        <Link to="/">メイン画面に戻る</Link>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
              {/* ボタンにクリックイベントを設定 */}
              <button onClick={() => handleButtonClick(user.id)}>詳細を見る</button>
            </li>
          ))}
        </ul>
      </div>
    </CommonLayout>
  );
}

export default UserListPage;
