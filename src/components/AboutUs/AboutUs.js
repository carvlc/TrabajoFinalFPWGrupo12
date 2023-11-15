import Nosotros from "./Nosotros";
import about from '../../data/aboutUs.json'
import { Row } from "react-bootstrap";

function AboutUs() {
    return (
        <Row>
            {about.map((aboutUs, i) =>
                <Nosotros
                    key={i}
                    image={aboutUs.image}
                    nombreCompleto={aboutUs.nombreCompleto}
                    sobreMi={aboutUs.sobreMi}
                    gitHub={aboutUs.gitHub}>
                </Nosotros>
            )}
        </Row>
    )
}

export default AboutUs;