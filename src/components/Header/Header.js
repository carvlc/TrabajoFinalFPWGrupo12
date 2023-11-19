import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './header.css'

function Header() {
  return (
    <Navbar expand="lg" className="nav" data-bs-theme="dark">
      <Container className='containerNav'>
        <Navbar.Brand><img
              src="/img/lobo.png"
              width="50"
              height="50"
              className="lobo"
              alt="logo"
            />Grupo 12</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* <Nav className="me-auto">
            <Nav.Link href="/">Inicio</Nav.Link>
            <Nav.Link href="/Proyectos">Proyectos</Nav.Link>
            <Nav.Link href="/AboutUs">About Us</Nav.Link>
          </Nav> */}
          <ul className='ulLista'>
            <li className='liLista'>
              <a className='lista' href="/">Inicio</a>
            </li >
            <li className='liLista'>
              <a className='lista' href="#seccionProyectos">Proyectos</a>
            </li>
            <li className='liLista'>
              <a className='lista' href="#seccionNosotros">About Us</a>
            </li>
          </ul>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;