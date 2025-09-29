import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import reactLogo from '../assets/react.svg';
//import viteLogo from '/vite.svg';
import { useTranslation } from 'react-i18next';
import '../../App.css';
import CommonLayout from '../layout';

const dummyUsers = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' },
];

function MainPage() {
  // useNavigateフックを呼び出す
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [users, setUsers] = useState<typeof dummyUsers>([]);
  const [usersFromDB, setUsersFromDB] = useState<string[]>( [] );
  const { i18n } = useTranslation();

  useEffect(() => {
    const fetchUsers = async () => {
      const tmp = await window.interprocessCommunication.getUsers();
      //console.log( data[0][ "name" ] as string );
      const usr = tmp.map( (data) => {
        return data[ "name" ];
      });
      setUsersFromDB( usr );
    };
    fetchUsers();
    setUsers(dummyUsers);
  }, []);

  // セレクトボックスの変更イベントハンドラ
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = event.target.value;
    setSelectedUser(userId);
    // 選択値が変更されたら即座に遷移
    if (userId) {
      navigate(`/users/${userId}`);
    }
  };

  return (
    <CommonLayout>
      <div>
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={""} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={""} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>

        <h2>ユーザー詳細へ移動</h2>
        <select onChange={handleSelectChange} value={selectedUser}>
          <option value="">ユーザーを選択してください</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>

        <select>
          {usersFromDB.map( (users, idx) => {
            return <option key={idx}>{users}</option>
          })}
        </select>
        <div>{i18n.t('menu.zoom_in')}</div>
      </div>
    </CommonLayout>
  );
}

export default MainPage;
