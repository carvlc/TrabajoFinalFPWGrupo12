import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import './home.css'

function Home(){
    return(
        <div className='home'>
            <div style={{ padding: 20 }}>
                <h1>Grupo 12 FPW</h1>
                <h2>Hola somos el grupo 12 y este es nuestro trabajo final, esperamos que les guste!!</h2>
            </div>
            <h2>Proyectos</h2>
            <Container>
                <Row xs={1} md={2} className="g-4">
                {Array.from({ length: 4 }).map((_, idx) => (
                    <Col key={idx}>
                        <Card>
                            <Card.Img variant="top" src="holder.js/100px160" />
                            <Card.Body>
                                <Card.Title>Card title</Card.Title>
                                <Card.Text>
                                    This is a longer card with supporting text below as a natural
                                    lead-in to additional content. This content is a little bit
                                    longer.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
                </Row>
            </Container>
            <div>
                <h2>AboutUs</h2>
            </div>
        </div>
    )
}

export default Home;