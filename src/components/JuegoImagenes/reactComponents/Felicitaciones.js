import React from 'react';
import './Felicitaciones.css'

// componente funcional que devuelve el mensaje de felicitaciones para un jugador
// recibe mediante props: el nombreJugador, puntaje y rondastotales y los muestra 
function Felicitaciones({ nombreJugador, puntaje, rondasTotales }) {
    return (
        <div className='contenedor'>
            <h1 className='titulo'>¡Congratulations, {nombreJugador}!</h1>
            <p className='puntaje'>Your total score is: {puntaje}</p>
            <p className='rondas-totales'>Total Rounds: {rondasTotales}</p>
        </div>
    );
}

export default Felicitaciones;