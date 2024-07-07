import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Libros from './Libros';
import Login from './Login';
import UsersCrud from './UsersCrud';
import BooksCrud from './BooksCrud';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/libros" element={<Libros />} />
          <Route path="/users-crud" element={<UsersCrud />} />
          <Route path="/books-crud" element={<BooksCrud />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
