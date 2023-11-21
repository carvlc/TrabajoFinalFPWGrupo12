import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./notas.css";
import Nota from "./Nota";

function Notas() {
    const [notas, setNotas] = useState([]);// useState que contiene un array de objetos con los datos de las notas
    const [texto, setTexto] = useState('');// useState para manejar el texto contenido de la nota
    const [titulo, setTitulo] = useState('');// useState que guarda el titulo de la nota
    const [isChange, setIsChange] = useState(false)// booleano que para controlar el cambio de estado de la nota

    // useEffect que usa el booleano isChange para actualizar el estado 
    useEffect(() => { }, [isChange])

    // funcion agregarNota para gregar las notas en el useState notas[]
    const agregarNota = () => {
        if (titulo === '' || texto === '') { // se valida que los campos este completados, se pregunta si los campos estan vacios
            alert("DEBE COMPLETAR AMBOS CAMPOS");// en caso de que no este completados lo campos se muestra el mensaje
        } else {
            const objetoNota = {// se crea un objeto con los datos de la nota {titulo, texto, estado}
                titulo: titulo,// se asigna el useState titulo al campo titulo del objetoNota
                texto: texto,// se asigna el useState texto al campo texto del objetoNota
                estado: 'Inicial'// se asigna estado 'Inicial' por defecto a todas las notas creadas al campo estado 
            }
            setNotas([...notas, objetoNota]);// se agrega el objetoNota al arreglo notas[] mediante setNotas()
            setTitulo('')// se limpia el campo titulo
            setTexto('')// se limpia el campo texto
        }


    }
    // funcion borrarNota , recibe el indice de la nota a borrar y la elimina
    const borrarNota = (indice) => {
        const nuevasNotas = [...notas];// se crea un arreglo auxiliar de notas con el contenido de notas[]
        nuevasNotas.splice(indice, 1);// se elimina la nota en el arreglo nuevasNotas[] mediante su indice
        setNotas(nuevasNotas);// mediante setNotas se guarda el nuevo arreglo nuevasNotas[]
    };

    // funcion cambiarEstado, recibe el indice de la nota para cambiar el estado
    const cambiarEstado = (indice) => {
        notas.forEach((e, index) => { // forEach para recorrer el arreglo notas[]
            if (indice === index) {// si el indice pasado por parametro es igual al index...
                if (e.estado === 'En proceso') {// si el estado de la nota es igual a 'En proceso'
                    e.estado = 'Resuelto'// se actualiza el estado a 'Resuelto'
                }
                if (e.estado === "Inicial") {// si el estado de la nota es igual a 'Inicial'
                    e.estado = 'En proceso';// se actualiza el estado a 'En proceso'
                }
            }
        })
        console.log(notas)// muesta por consola el arreglo notas[]
        setIsChange(!isChange)// modifica el booleano isChange para a actualizar el estado
    }
    // en el return() se muestra el formulario para agregar notas y tres columnas (Inicio, Tareas en Proceso, Tareas Resueltas)
    // columna Inicio: muestra todas las notas[] que tengan el estado 'Inicial' esto se controla mediante un condicional if ternario
    // columna Tareas en Proceso: mediante un if ternario se muestran todas las notas[] con estado 'En proceso'
    // columna Tareas Resueltas: mediante un if tenario se muestran todas las notas[] con estado 'Resuelto'
    return (
        <>
            <div className="container">
                <h1>Ingrese su Nota <i className="bi bi-pencil-fill"></i></h1>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Titulo</Form.Label>
                        <Form.Control type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Descripcion</Form.Label>
                        <Form.Control type="text" value={texto} onChange={(e) => setTexto(e.target.value)} />
                    </Form.Group>
                    <Button variant="success" onClick={() => agregarNota()}>
                        Agregar <i className="bi bi-check-circle-fill"></i>
                    </Button>
                </Form>
            </div>
            <br></br>
            <div className="gridNotas">
                <div className="notas-container">
                    <h2 className="titulo-notas">Inicio</h2>
                    {notas.map((item, indice) => (

                        item.estado === 'Inicial' ?
                            <Nota
                                key={indice}
                                clave={indice}
                                titulo={item.titulo}
                                texto={item.texto}
                                estado={item.estado}
                                borrarNota={borrarNota}
                                cambiarEstado={cambiarEstado}
                            ></Nota>
                            :
                            <p key={indice}></p>

                    ))}
                </div>
                <div className="notas-container">
                    <h2 className="titulo-notas">Tareas en Proceso</h2>
                    {notas.map((item, indice) => (
                        item.estado === 'En proceso' ?
                            <Nota
                                key={indice}
                                clave={indice}
                                titulo={item.titulo}
                                texto={item.texto}
                                estado={item.estado}
                                borrarNota={borrarNota}
                                cambiarEstado={cambiarEstado}
                            ></Nota>
                            :
                            <p key={indice}></p>

                    ))}
                </div>
                <div className="notas-container">
                    <h2 className="titulo-notas">Tareas Resueltas</h2>
                    {notas.map((item, indice) => (

                        item.estado === 'Resuelto' ?
                            <Nota
                                key={indice}
                                clave={indice}
                                titulo={item.titulo}
                                texto={item.texto}
                                estado={item.estado}
                                borrarNota={borrarNota}
                                cambiarEstado={cambiarEstado}
                            ></Nota>
                            :
                            <p key={indice}></p>

                    ))}
                </div>
            </div>
        </>
    )
}

export default Notas;