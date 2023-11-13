import { Card, Button } from "react-bootstrap";

function Proyecto(props) {
    return(
        <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src= {props.img} />
                    <Card.Body>
                        <Card.Title>{props.nombre}</Card.Title>
                        <Card.Text>
                            {props.descripcion}
                        </Card.Text>
                        <Button variant="primary" href={props.enlace}>Abrir</Button>
                    </Card.Body>
                </Card>
    )
}

export default Proyecto;