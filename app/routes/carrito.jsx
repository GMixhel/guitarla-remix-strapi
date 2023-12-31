import {useOutletContext} from '@remix-run/react'
import styles from '../styles/carrito.css'
import { useEffect, useState } from 'react';
import {ClientOnly} from "remix-utils/client-only"


export function links() {
    return [
        {
            rel: 'stylesheet',
            href: styles
        }
    ]
}

const Carrito = () => {
  const [total, setTotal] = useState(0);
  const { carrito, actualizarCantidad, eliminarGuitarra } = useOutletContext();

  useEffect(() => {
    const calculoTotal = carrito.reduce(
      (total, producto) => total + producto.cantidad * producto.precio,
      0
    );
    setTotal(calculoTotal);
  }, [carrito]);



  return (
    <ClientOnly fallback={"Cargando..."}>
      {() => (
        <main>
          <h1 className="heading">Carrito de compras</h1>

          <div className="contenido">
            <div className="carrito">
              <h2>Articulos</h2>
              {carrito?.length === 0
                ? "carrito Vacío"
                : carrito?.map((producto) => (
                    <div key={producto} className="producto">
                      <div>
                        <img src={producto.imagen} alt="imagen de guitarra" />
                      </div>
                      <div>
                        <p className="nombre">{producto.nombre}</p>
                        <select
                          value={producto.cantidad}
                          className="select"
                          onChange={(e) =>
                            actualizarCantidad({
                              cantidad: +e.target.value,
                              id: producto.id,
                            })
                          }
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                        <p className="precio">
                          <span>${producto.precio}</span>
                        </p>
                        <p className="subtotal">
                          Subtotal:
                          <span> ${producto.cantidad * producto.precio}</span>
                        </p>
                      </div>
                      <button
                        onClick={() => eliminarGuitarra(producto.id)}
                        type="button"
                        className="btn_eliminar"
                      >
                        X
                      </button>
                    </div>
                  ))}
            </div>

            <aside className="resumen">
              <h3>Resume del pedido</h3>
              <p>Total a pagar: ${total}</p>
            </aside>
          </div>
        </main>
      )}
    </ClientOnly>
  );
};

export default Carrito

