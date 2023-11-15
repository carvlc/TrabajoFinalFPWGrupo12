import './home.css'
import Proyectos from '../Proyectos/Proyectos';
import { Row } from 'react-bootstrap';
import proyectos from '../../data/proyectosFinal.json'
import Footer from '../Footer/Footer';
import AboutUs from '../AboutUs/AboutUs';

function Home() {
    return (
        <div className='home'>
            <div style={{ padding: 20 }}>
                <h1>Grupo 12 FPW</h1>
                <h2>Hola somos el grupo 12 y este es nuestro trabajo final, esperamos que les guste!!</h2>
            </div>
            <h2>Proyectos</h2>
            <Row>
                {proyectos.map((proyecto,i) =>
                    <Proyectos
                    key = {i}
                    img = {proyecto.img}
                    nombre = {proyecto.nombre}
                    descripcion = {proyecto.descripcion}
                    enlace = {proyecto.enlace}>
                    </Proyectos>
                )}
            </Row>

            <div>
                <h2>AboutUs</h2>
                <AboutUs></AboutUs>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Home;