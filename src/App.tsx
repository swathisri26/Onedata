/*import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppNavbar from './components/Navbar';
import JobListPage from './pages/JobListPage';
import AdminJobPage from './pages/AdminJobPage'; // Create this page
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<JobListPage />} />
        <Route path="/jobs" element={<JobListPage />} />
        <Route path="/admin/jobs" element={<AdminJobPage />} />
       
      </Routes>
    </Router>
  );
};

export default App;*/
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppNavbar from './components/Navbar';
import JobListPage from './pages/JobListPage';
import AdminJobPage from './pages/AdminJobPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <Router>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<JobListPage />} />
        <Route path="/jobs" element={<JobListPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Route for Admin or Job Management */}
        <Route
          path="/admin/jobs"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AdminJobPage />
            </ProtectedRoute>
          }
        />

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;

