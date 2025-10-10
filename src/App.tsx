import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './app/MainPage/page';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;