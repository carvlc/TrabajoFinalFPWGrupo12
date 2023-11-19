import { Card, Button } from "react-bootstrap";
import './nosotros.css'

function Nosotros(props) {
    return (
            <Card className="cardAbout" style={{ width: '18rem' }}>
                <Card.Img variant="top" src={props.image} />
                <Card.Body>
                    <Card.Title>{props.nombreCompleto}</Card.Title>
                    <Card.Text>
                        {props.sobreMi}
                    </Card.Text>
                    <div className="link">
                        <a href={props.gitHub}><i className="bi bi-github"></i></a>
                    </div>
                </Card.Body>
            </Card>
    )
}

export default Nosotros;