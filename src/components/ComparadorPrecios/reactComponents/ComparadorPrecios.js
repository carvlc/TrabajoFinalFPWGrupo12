import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import './ComparadorPrecios.css'

// componente funcional para el comparador de precios
function ComparadorPrecios() {
    const [productos, setProductos] = useState(["naranja", "banana", "coca-cola", "leche", "agua"]);// useState que guarda un arreglo productos[] con nombres de productos que se mostraran en el formulario
    const [supermercados, setSupermercados] = useState(['Dia', 'Vea', 'Comodin', 'Carrefour']);// useState que guarda un arreglo de supermercados[] con nombres de comercios que semostraran en el formulario
    const [nombreProducto, setNombreProducto] = useState('');// useState que guardara el nombre del porducto en un string
    const [precioProducto, setPrecioProducto] = useState(0);// useState que guardara el precio del prudoctu con tipo numerico
    const [nombreComercio, setNombreComercio] = useState('');// useState que guardara el nombre del comercio en un string
    const [lista, setLista] = useState([]);// useState que contiene el arreglo lista[] para guardar todos los productos 
    const [listaFiltrada, setListaFiltrada] = useState([]);// useState que contiene el arreglo listaFiltrada[] que contendra los productos con menor precio

    //funcion guardarDatos agrega un producto en el arreglo lista[] de productos
    function guardarDatos() {
        if (nombreComercio === '' || nombreProducto === '' || precioProducto === 0) { // control de que los campos no esten vacios
            alert('debe completar todos los campos!!') // este mensaje se muestra cuando los campos no estan completados
        } else {
            let producto = { // se crea un objeto producto 
                nombreProducto: nombreProducto,// se inicializa la propiedad nombreProducto con el useState nombreProduto
                precioProducto: precioProducto,// se inicializa la propiedad de precioProduto con el useState precioProducto
                nombreComercio: nombreComercio// se inicializa la propiedad nombreComercio con el useState nombreComercio
            }
            setLista([...lista, producto]);// se agrega el producto a la lista[] mediante setLista()
            console.log(lista);
            setPrecioProducto(0);// se limpia el campo precioProducto
            setNombreComercio('');// se limpia el campo nobmreComercio
            setNombreProducto('');// se limpia el campo nombreProducto
        }
    }
    // funcion filtrar lista: filtra los productos de menor precio y los guarda en listaFiltrada[]
    function filtrarLista() {
        let listaUnicos = []// arreglo auxiliar donde se guardaran los nombres unicos de los produtos 
        let listaFiltrada = [];// arreglo auxiliar donde se guardaran los productos de menor precio
        lista.forEach((producto) => {// se recorre el arreglo lista[] usando forEach
            if (!listaUnicos.includes(producto.nombreProducto)) {// si la listaUnicos no incluye el nombre del producto
                listaUnicos.push(producto.nombreProducto)// se agrega en la listaUnicos[]
            }
        })
        for (let i = 0; i < listaUnicos.length; i++) {//for que recorre la listaUnicos[]
            let posicionProductoMinimo = -1;// se declara una variable que indica la posicion del producto minimo y se inicializa en -1
            let precioMinimo = Infinity;// se declara una variable precioMinimo y se inicializa en un numero alto Infinity
            for (let j = 0; j < lista.length; j++) {// se recorre la lista[] de productos
                if (listaUnicos[i] === lista[j].nombreProducto && parseFloat(lista[j].precioProducto) < precioMinimo) {// se controla que el nombre del producto sea igual al nombreUnico y que el precio sea menor que el precio minimo
                    precioMinimo = parseFloat(lista[j].precioProducto);// a precioMinimo se le asigna el valor del precio producto en la posicion lista[j]
                    posicionProductoMinimo = j;// se guarda la posicion del producto minimo que es el incice 'j'
                }
            }
            if (posicionProductoMinimo !== -1) {// si la posicion del producto minimo es distina a -1 
                listaFiltrada.push(lista[posicionProductoMinimo]);// en listaFiltrada[] auxiliar se agrega el producto con menor precio de la lista[]
            }
        }
        setListaFiltrada(listaFiltrada)// se actualiza el useState listafiltrada[] con los elementos de la listaFiltrada[] auxiliar
    }
    productos.sort();// se ordenan los productos

    // return muestra un formulario para agregar los productos y dos columnas 
    // en la primera columna se muestran todos los productos lista[]
    // en la seguda columna se muestran los productos filtrados listaFiltrada[]
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