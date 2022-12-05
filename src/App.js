import './App.css';
import Login from './components/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from './components/Home';

function App() {
  return (
    <div className="App">
     <Router>
        <Routes>
          <Route
            path="/login"
            element={<Login/>}
          />
          <Route
            path="/home"
            element={
              <Home />
            }
          />
          <Route path="/signup" element={<Login />} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
