import { useLoaderData } from "@remix-run/react"
import { getGuitarra } from "../models/guitarras.server"
import styles from '../styles/guitarras.css'
import { useState } from "react";

export async function loader({ params }) {
  const { guitarraUrl } = params;
  const guitarra = await getGuitarra(guitarraUrl);

  if (guitarra.data.length === 0) {
    throw new Response('', {
      status: 404,
      statusText: 'Guitarra No Encontrada'
    })
  }

  return guitarra;
}

export function meta({ data }) {
  if (!data) {
    return [
      {
      title: "GuitarraLA - Guitarra no encontrada"
      }
    ]
}


  return [{
    title: `GuitarLA - ${data.data[0].attributes.nombre}`
  }]
}

function Guitarra() {

  const [cantidad, setCantidad] = useState(0)

  const handlerSubmit = e => {
    e.preventDefault()

    if (cantidad < 1) {
      alert('Debes seleccionar una cantidad')
      return
    }
  }

  const guitarra = useLoaderData();
  const {nombre, descripcion, imagen, precio} = guitarra.data[0].attributes
   console.log(guitarra.data[0].attributes.nombre);
  return (
    <div className="guitarra">      
      <img className="imagen" src={imagen.data.attributes.url} alt={`imagen de la guitarra ${nombre}`} />
      <div className="contenido">
              <h3>{nombre}</h3>
              <p className="descripcion">{descripcion}</p>
        <p className="precio">${precio}</p>
        
        <form onSubmit={handlerSubmit} className="formulario">
          <label htmlFor="cantidad">Cantidad</label>

          <select id="cantidad" onChange={e => setCantidad(parseInt(e.target.value))}>
            <option value="0">-- Seleccione --</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <input type="submit" value="Agregar al carrito" />
        </form>
          </div>
    </div>
  )
}

export default Guitarra