import React, { useState } from 'react';
import Juego from './Juego';
import Felicitaciones from './Felicitaciones';
import './Inicio.css'

function Inicio() {
    const [nombreJugador, setNombreJugador] = useState('');// useState que se usa para guardar el nombre del jugador
    const [mostrarJuego, setMostrarJuego] = useState(false);// useState booleano para mostrar el juego
    const [puntaje, setPuntaje] = useState(0);// useState numerico para guardar el puntaje del jugador
    const [mostrarFelicitaciones, setMostrarFelicitaciones] = useState(false);// useState boolean para mostrar el mensaje de felicitaciones
    const [rondaActual, setRondaActual] = useState(1);// useState numerico que se usa para controlar la ronda actual 

    const [jugadorActual, setJugadorActual] = useState(1);// useState numerico que indica el numero del jugador 1 o 2
    const [jugadores, setJugadores] = useState([]);// useState arreglo jugadores[] que guardara objetos con los datos de los jugadoes

    //para el comodin
    const [comodin, setComodin] = useState(false);// useState boolean para el control del uso del comodin

    // funcion jugar que inicializa los useState y el jugador actual
    const manejarClickJugar = (nombre) => {
        setNombreJugador(nombre);// se asigna el nombre del jugador que se recibe por parametro
        setMostrarJuego(true);// se cambia el valor de booleano 
        setPuntaje(0);// se le setea el puntaje en 0
        setMostrarFelicitaciones(false);// se cambia el booleano mostrarFelicitaciones en false
    };

    // funcion alTerminar muestra los resultados finales 
    const alTerminar = (nombreJugador, puntaje, rondasTotales) => {
        if (jugadorActual === 1) {// si el jugador actual es el 1
            setJugadores([...jugadores, { nombreJugador, puntaje, rondasTotales }]);// agrega en jugadores[] un objeto con los datos del jugador 1
            setJugadorActual(2);// se setea el valor 2 en jugadorActual
            setMostrarJuego(false);// mostrar juego se setea en false
            setComodin(false);// comodin se setea en false
            setRondaActual(1)// y se setea la ronda actual en 1 
        } else {// si el jugador actual no es el 1 quere decir que es el 2
            setJugadores([...jugadores, { nombreJugador, puntaje, rondasTotales }]);// se agrega el objeto en jugadores[]
            setMostrarJuego(false);// mostrarjuego se setean en false
            setMostrarFelicitaciones(true);// mostrarFelicitaciones se setea en true para mostrar la pantalla de felicitaciones
            setJugadorActual(1);// se cambia el valor de jugadorActual en 1
        }

    };
    // si mostrarjuego es falso y mostrar felicitaciones es falso, se muestra el formulario de inicio
    if (!mostrarJuego && !mostrarFelicitaciones) {
        return (
            <div className='my-container'>
                <h1 className='titulo'>Put your name</h1>
                <input
                    className='input-name'
                    type="text"
                    placeholder="Child name"
                    onChange={(e) => setNombreJugador(e.target.value)}
                />
                <button className='btn-play' onClick={() => manejarClickJugar(nombreJugador)}>Play</button>
            </div>
        );
    } else if (mostrarJuego) {// si mostrar juego es verdadero se muestra la pantalla de juego mediante su componente Juego
        return (
            <div>
                <Juego
                    nombreJugador={nombreJugador}
                    puntaje={puntaje}
                    setPuntaje={setPuntaje}
                    alTerminar={alTerminar}
                    rondaActual={rondaActual}
                    setRondaActual={setRondaActual}
                    comodin={comodin}
                    setComodin={setComodin}
                />
            </div>
        );
    } else if (mostrarFelicitaciones) {// si mostrar felicitaciones es verdadero se muestra la pantalla de felicitaciones para los dos juegdores
        return (
            <>
                <div className='gridImagenes'>{jugadores.map((jugador) => (
                    <Felicitaciones
                        key={jugador.nombreJugador}
                        nombreJugador={jugador.nombreJugador}
                        puntaje={jugador.puntaje}
                        rondasTotales={jugador.rondasTotales}
                    />
                ))}
                {
                    jugadores[0].puntaje > jugadores[1].puntaje ?
                    <h1 className='ganador'> Winner {jugadores[0].nombreJugador}</h1> : jugadores[0].puntaje < jugadores[1].puntaje ? <h1 className='ganador'> Winner {jugadores[1].nombreJugador}</h1> : <h1 className='ganador'>Tie</h1>
                }
                </div>
                
            </>

        );
    }
}

export default Inicio;