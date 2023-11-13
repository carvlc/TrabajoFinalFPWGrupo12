import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';


function OurProjects() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={"./img/gato.PNG"} />
      <Card.Body>
        <Card.Title>Juego de Imagenes Para Niños</Card.Title>
        
       <Nav.Link href="/JuegoImagenes"> <Button variant="success">Ir al Proyecto</Button></Nav.Link>
      </Card.Body>
    </Card>
  );
}

export default OurProjects;