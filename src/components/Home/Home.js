import './home.css'
import Proyectos from '../Proyectos/Proyectos';
import { Row } from 'react-bootstrap';
import proyectos from '../../data/proyectosFinal.json'
import Footer from '../Footer/Footer';
import AboutUs from '../AboutUs/AboutUs';

function Home() {
    return (
        <div className='home'>
            <div id='seccionInicio' className='inicio' style={{ padding: 20 }}>
                <h1>Grupo 12 FPW</h1>
                <div className='contenedorLobo'>
                    <img src="./img/lobo2.png" className='inicioLogo'></img>
                </div>
                <h2 className='holaMundo'>Hola Mundo!! Somos el grupo 12 y este es nuestro trabajo final, esperamos que les guste!!</h2>
            </div>
            <Row id='seccionProyectos' className='proyectos'>
                <h1>Proyectos</h1>
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
            <div id='seccionNosotros' className='sobreNosotros'>
                <h1>AboutUs</h1>
                <AboutUs></AboutUs>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Home;