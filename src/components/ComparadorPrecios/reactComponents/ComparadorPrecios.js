import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import './ComparadorPrecios.css'

function ComparadorPrecios() {

    const [productos, setProductos] = useState(["naranja", "banana", "coca-cola", "leche", "agua"]);
    const [supermercados, setSupermercados] = useState(['Dia', 'Vea', 'Comodin', 'Carrefour']);
    const [nombreProducto, setNombreProducto] = useState('');
    const [precioProducto, setPrecioProducto] = useState(0);
    const [nombreComercio, setNombreComercio] = useState('');
    const [lista, setLista] = useState([]);
    const [listaFiltrada, setListaFiltrada] = useState([]);
    const [isChange, setIsChange] = useState(false);

    useEffect(() => {
        console.log("se llamo al useEffect")
    }, [])

    function guardarDatos() {
        if (nombreComercio !== '' || nombreProducto !== '' || precioProducto !== 0) {
            let producto = {
                nombreProducto: nombreProducto,
                precioProducto: precioProducto,
                nombreComercio: nombreComercio
            }
            setLista([...lista, producto]);
            console.log(lista);
            setPrecioProducto(0);
            setNombreComercio('');
            setNombreProducto('');
        } else {
            alert('debe completar todos los campos!!')
        }


    }

    function filtrarLista() {
        console.log('se llamo a filtrarLista')
        let listaUnicos = []
        let listaFiltrada = [];
        lista.forEach((producto) => {
            if (!listaUnicos.includes(producto.nombreProducto)) {
                listaUnicos.push(producto.nombreProducto)
            }
        })
        for (let i = 0; i < listaUnicos.length; i++) {
            let posicionProductoMinimo = -1;
            let precioMinimo = Infinity;
            for (let j = 0; j < lista.length; j++) {
                if (listaUnicos[i] === lista[j].nombreProducto && parseFloat(lista[j].precioProducto) < precioMinimo) {
                    precioMinimo = parseFloat(lista[j].precioProducto);
                    posicionProductoMinimo = j;
                }
            }
            if (posicionProductoMinimo !== -1) {
                listaFiltrada.push(lista[posicionProductoMinimo]);
            }

        }
        setIsChange(!isChange)
        setListaFiltrada(listaFiltrada)
    }

    productos.sort();
    return (
        <div className='gridComparador'>
            <div className='comparador-container'>
                <Form.Group className="mb-3">
                    <Form.Label>Elija el producto</Form.Label>
                    <Form.Select onChange={e => { setNombreProducto(e.target.value) }} value={nombreProducto}>
                        <option value={''}>Elija un producto</option>
                        {productos.map((producto, index) => (
                            <option key={index} value={producto}>{producto}</option>
                        ))}
                    </Form.Select>
                    <Form.Group className="mb-3">
                        <Form.Label>Ingrese el precio</Form.Label>
                        <Form.Control placeholder="precio" value={precioProducto} type='number' onChange={elemento => { setPrecioProducto(parseFloat(elemento.target.value)) }} />
                    </Form.Group>

                    <Form.Label>Elija el comercio</Form.Label>
                    <Form.Select onChange={e => { setNombreComercio(e.target.value) }} value={nombreComercio}>
                        <option value={''}>Elija un comercio</option>
                        {supermercados.map((comercio, index) => (
                            <option key={index} value={comercio}>{comercio}</option>
                        ))}
                    </Form.Select>

                </Form.Group>
                <Button variant="success" type="submit" onClick={guardarDatos}>
                    Guardar
                </Button>
                <Button variant="danger" type="submit" onClick={filtrarLista}>
                    Filtrar
                </Button>
            </div>
            <div className='comparador-container'>
                <h1>Todos los Productos</h1>
                {lista.map((producto, index) => (
                    <p key={index}>{`nombre producto: ${producto.nombreProducto} - precio: ${producto.precioProducto} - comercio: ${producto.nombreComercio}`}</p>
                ))}
            </div>
            <div className='comparador-container'>
                <h1>Productos Filtrados</h1>
                {listaFiltrada.map((producto, index) => (
                    <p key={index}>{`nombre producto: ${producto.nombreProducto} - precio: ${producto.precioProducto} - comercio: ${producto.nombreComercio}`}</p>
                ))}
            </div>
        </div>
    )
}

export default ComparadorPrecios;