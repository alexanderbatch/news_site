import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeadlinesPage from './pages/HeadlinesPage';
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HeadlinesPage />} />
        <Route path="/headlines" element={<HeadlinesPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
}

export default App;