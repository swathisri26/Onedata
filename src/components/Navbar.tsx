

/*import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import './Navbar.css'; // Custom CSS for extra polish

const AppNavbar = () => {
  const location = useLocation();

  return (
    <Navbar expand="lg" bg="light" variant="light" className="shadow-sm py-3 sticky-top">
      <Container>
        <Link to="/" className="navbar-brand fw-bold fs-3 text-primary">
          JobPortal
        </Link>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Link
              to="/"
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link
              to="/jobs"
              className={`nav-link ${location.pathname === '/jobs' ? 'active' : ''}`}
            >
              Jobs
            </Link>
          </Nav>

          <div className="d-flex">
            <Link to="/admin/jobs">
              <Button variant="outline-primary" className="ms-lg-3 mt-2 mt-lg-0">
                Admin Panel
              </Button>
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;*/

import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import{ logout }from '../redux/slices/authSlice';

const AppNavbar = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">Job Portal</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/jobs">Jobs</Nav.Link>
            <Nav.Link as={Link} to="/admin/jobs">Admin</Nav.Link>

            {!isAuthenticated ? (
              <>
               <Button as={Link as any} to="/login" variant="outline-primary" className="me-2">
  Login
</Button>
<Button as={Link as any} to="/signup" variant="primary">
  Signup
</Button>

              </>
            ) : (
              <Button onClick={handleLogout} variant="outline-danger">Logout</Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
