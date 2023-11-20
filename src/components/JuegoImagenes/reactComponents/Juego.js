import React, { useState, useEffect } from 'react';
import animales from './../../../data/animales.json';
import './Juego.css';

function Juego({ nombreJugador, puntaje, setPuntaje, alTerminar, rondaActual, setRondaActual, comodin, setComodin }) {
    const [animalObjetivo, setAnimalObjetivo] = useState('');
    const [opciones, setOpciones] = useState([]);
    const [esCorrecto, setEsCorrecto] = useState(null);
    const [rondasTotales, setRondasTotales] = useState(Math.floor(Math.random() * 6) + 5);
    const [puedeHacerClic, setPuedeHacerClic] = useState(true);



    const obtenerAnimalAleatorio = () => {
        
        const indiceAleatorio = Math.floor(Math.random() * animales.length);
        return animales[indiceAleatorio];
    };

    const obtenerOpcionesAleatorias = () => {
        const animalCorrecto = obtenerAnimalAleatorio();
        let opcionesAleatorias = [animalCorrecto];

        while (opcionesAleatorias.length < 3) {
            const opcion = obtenerAnimalAleatorio();
            if (!opcionesAleatorias.includes(opcion)) {
                opcionesAleatorias.push(opcion);
            }
        }

        opcionesAleatorias = opcionesAleatorias.sort(() => Math.random() - 0.5);

        setOpciones(opcionesAleatorias);
        setAnimalObjetivo(animalCorrecto);
    };
    const usarComodin = () =>{
        if (!comodin) {
            setComodin(true);
            for (let i = 0; i < opciones.length; i++) {
                if (opciones.length > 2) {
                    if (opciones[i].nombreIng !== animalObjetivo.nombreIng) {
                        const opcionesComodin = opciones.filter(op => op.nombreIng != opciones[i].nombreIng);
                        setOpciones(opcionesComodin);
                    }
                }
            }
        }
    }

    const verificarRespuesta = (animalSeleccionado) => {
        if (animalSeleccionado.nombreIng === animalObjetivo.nombreIng) {
            setEsCorrecto(true);
            setPuntaje(puntaje + 1);
        } else {
            setEsCorrecto(false);
        }
        setPuedeHacerClic(false);
    };

    const siguienteRonda = () => {
        if (rondaActual < rondasTotales) {
            setRondaActual(rondaActual + 1);
            setEsCorrecto(null);
            setPuedeHacerClic(true);
            obtenerOpcionesAleatorias();
        } else {
            alTerminar(nombreJugador, puntaje, rondasTotales);
        }
    };

    const opcionesDeshabilitadas = esCorrecto !== null;

    useEffect(() => {
        obtenerOpcionesAleatorias();
    }, []);

    return (
        <div className='my-container'>
            <h1 className='my-title'>{nombreJugador}, What is this animal?</h1>
            <p className='ronda-actual'>Actual round: {rondaActual} / {rondasTotales}</p>
            <div className='imgagen-animal'>
                <img src={`img/${animalObjetivo.nombreEsp}.PNG`} alt={animalObjetivo} />
            </div>

            <div>
                {opciones.map((animal) => (
                    <button
                        className='btn-opcion'
                        key={animal.key}
                        onClick={() => verificarRespuesta(animal)}
                        disabled={!puedeHacerClic || opcionesDeshabilitadas}
                    >
                        {animal.nombreIng}
                    </button>
                ))}
            </div>
            {esCorrecto === true && <p>¡Correct!</p>}
            {esCorrecto === false && <p>¡Incorrect!</p>}
            <button className='btn-siguiente' onClick={siguienteRonda}>Next</button>
            {!comodin? <button className='btn-comodin' onClick={usarComodin}>Use Help!</button>: <></>}
            
        </div>
    );
}

export default Juego;