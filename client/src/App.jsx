import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Crud from './routes/CRUD';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastros" element={<Crud />} />
      </Routes>
    </Router>
  );
}

export default App;

