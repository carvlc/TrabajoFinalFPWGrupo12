import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Grupo 12</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Inicio</Nav.Link>
            {/* <Nav.Link href="/Comparador">Comparador de Precios</Nav.Link>
            <Nav.Link href="/Dude">Dude</Nav.Link>
            <Nav.Link href="/Nave">Nave Espacial</Nav.Link>
            <Nav.Link href="/Tareas">Lista de Tareas</Nav.Link>
            <Nav.Link href="/JuegoImagenes">Juego Imagenes</Nav.Link> */}
            <Nav.Link href="proyectos">Proyectos</Nav.Link>
            <Nav.Link href="/AboutUs">About Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;