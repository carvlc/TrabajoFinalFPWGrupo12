import React, { useState, useEffect } from 'react';
import animales from './../../../data/animales.json';
import './Juego.css';
// componente funcional juego recibe una lista de props 
function Juego({ nombreJugador, puntaje, setPuntaje, alTerminar, rondaActual, setRondaActual, comodin, setComodin }) {
    const [animalObjetivo, setAnimalObjetivo] = useState('');// useState que guarda el animal que es la respuesta correcta
    const [opciones, setOpciones] = useState([]);// useState que guarda un arreglo opciones[] que tendra las 3 opciones
    const [esCorrecto, setEsCorrecto] = useState(null);// useState que indica si es correcto se mostrar un mensaje
    const [rondasTotales, setRondasTotales] = useState(Math.floor(Math.random() * 6) + 5);// useStaet que indica las rondas totales de manera aleatoria
    const [puedeHacerClic, setPuedeHacerClic] = useState(true);// useState boolean para desabilitar los botones

    // funcion obtener animal aleatorio devuelve un objeto animal mediante un indice aleatorio
    const obtenerAnimalAleatorio = () => {
        const indiceAleatorio = Math.floor(Math.random() * animales.length);// se obtiene un valor aleatorio inciceAleatorio
        return animales[indiceAleatorio];// se retorna un objeto de la lista animales[] en posicion del indiceAleatorio
    };

    // funcion obtener opciones aleatorias obtiene un 
    const obtenerOpcionesAleatorias = () => {
        const animalCorrecto = obtenerAnimalAleatorio();// se obtiene el animal correcto
        let opcionesAleatorias = [animalCorrecto];// se guarda animal correcto en un arreglo auxiliar 

        // se carga el arreglo auxiliar opcionesAleatorias on objetos animales hasta 3
        while (opcionesAleatorias.length < 3) {
            const opcion = obtenerAnimalAleatorio();
            if (!opcionesAleatorias.includes(opcion)) {
                opcionesAleatorias.push(opcion);
            }
        }

        opcionesAleatorias = opcionesAleatorias.sort(() => Math.random() - 0.5); // se desordena el arreglo
        
        setOpciones(opcionesAleatorias);// se setea el arreglo auxiliar opcionesAleatorias en el arreglo opciones[]
        setAnimalObjetivo(animalCorrecto);//se setea el animalObjetovo
    };
    // funcion usar comodin
    const usarComodin = () =>{
        if (!comodin) {// si comodin es igual a falso, quiere decir que no se uso aun
            setComodin(true);// se setea el comodin en verdadero
            for (let i = 0; i < opciones.length; i++) {// se recorre la lista de opciones[]
                if (opciones.length > 2) {// si la lista de opciones es mayor que 2...
                    if (opciones[i].nombreIng !== animalObjetivo.nombreIng) {// si el nombre del elemento actual es diferente al animal objetivo...
                        const opcionesComodin = opciones.filter(op => op.nombreIng != opciones[i].nombreIng);// se filtra la lista descartando el animal actual ociones[i]
                        setOpciones(opcionesComodin);// se actualiza el arreglo opciones[]
                    }
                }
            }
        }
    }

    // se verifica la respuesta 
    const verificarRespuesta = (animalSeleccionado) => {
        if (animalSeleccionado.nombreIng === animalObjetivo.nombreIng) {// si el animal seleccionado es correcto
            setEsCorrecto(true);// se setea esCorrecto en true para mostrar el mensaje
            setPuntaje(puntaje + 1);// se suma un punto en puntaje
        } else {
            setEsCorrecto(false);// se setea esCorrecto en flse para mostrar el mensaje
        }
        setPuedeHacerClic(false);
    };
    // se pasa a la siguiente ronda
    const siguienteRonda = () => {
        if (rondaActual < rondasTotales) {// si ronda actual es menor a rondas totales
            setRondaActual(rondaActual + 1);// se incrementa ronda actual en +1
            setEsCorrecto(null);// es correcto se pone en null para no mostar mensaje
            setPuedeHacerClic(true);// puede hacer click se setea en true
            obtenerOpcionesAleatorias();// se obtienen opciones aleatorias para la siguiente ronda
        } else {
            alTerminar(nombreJugador, puntaje, rondasTotales);// se llama a la funcion alTerminar
        }
    };

    const opcionesDeshabilitadas = esCorrecto !== null;

    // useEffeto para obtener las opciones aleatorias al inicio de la primera ronda
    useEffect(() => {
        obtenerOpcionesAleatorias();
    }, []);

    // muestra la pantalla del juego con el numero de rondas , el nombre del jugador , las opciones y los botones siguiente y comodin
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