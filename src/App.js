import logo from './logo.svg';
import FileUpload from './components/FileUpload';
import Register from './components/Register';
import Login from './components/Login';
import Welcome from './components/Welcome';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
    console.log("APP RUNNING");
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/upload" element={<FileUpload />} />
              <Route path="/home" element={<Home />} />
          </Routes>
      </Router>
  );
}

export default App;
