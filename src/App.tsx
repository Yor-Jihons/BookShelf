import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './app/MainPage/page';
import UserListPage from './app/UserListPage/page';
import UserDetailPage from './app/UserDetailPage/page';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/users" element={<UserListPage />} />
        <Route path="/users/:id" element={<UserDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;