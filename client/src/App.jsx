import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminDashboard from './components/Admin/AdminDashboard';
import UserApp from './components/User/UserApp';
import { Container, Navbar, Nav } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Smart Temple System</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/admin">Admin Dashboard</Nav.Link>
              <Nav.Link as={Link} to="/user">Pilgrim App</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route path="/" element={
            <div className="text-center mt-5">
              <h1>Welcome to Smart Crowd Monitoring</h1>
              <p>Select a portal to continue</p>
              <div className="d-grid gap-2 d-md-block">
                <Link to="/admin" className="btn btn-primary btn-lg me-md-2">Admin Portal</Link>
                <Link to="/user" className="btn btn-success btn-lg">User Portal</Link>
              </div>
            </div>
          } />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/user/*" element={<UserApp />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
