import { Meta, Links,Link, Outlet, Scripts, LiveReload, useRouteError, isRouteErrorResponse } from '@remix-run/react'
import styles from './styles/index.css'
import Header from './components/header';
import Footer from './components/footer';
import { useEffect, useState } from 'react';


export function meta() {
  return [
    { charset: "utf-8" },
    { title: "GuitarLA - Remix" },
    { name: "viewport", content: "width=device-width,initial-scale=1" },
  ];
}

export function links() {
  return [
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "true",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;700;900&display=swap",
    },
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
}

export default function App() {

  const carritoLS = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('carrito')) ?? [] : null
  const [carrito, setCarrito] = useState(carritoLS);

  useEffect(() => {
  localStorage.setItem('carrito', JSON.stringify(carrito))
  }, [carrito])
  
  
  const agregarCarrito = (guitarra) => {
    if (carrito.some(guitarraState => guitarraState.id === guitarra.id)) {
      //Iterar sobre el arreglo, e identificar el elemento duplicado
      const carritoActualizado = carrito.map(guitarraState => {
        if (guitarraState.id === guitarra.id) {
          //reescribir la cantidad
          //guitarraState.cantidad += guitarra.cantidad; sumar valores
          guitarraState.cantidad = guitarra.cantidad
        }
        return guitarraState
      })
      //Añadir al carrito
      setCarrito(carritoActualizado)
    } else {
      //registro nuevo, agregar al carrito
      setCarrito([...carrito, guitarra]);
    }
  }

  const actualizarCantidad = guitarra => {
    const carritoActualizado = carrito.map(guitarraState => {
      if (guitarraState.id === guitarra.id) {
       guitarraState.cantidad = guitarra.cantidad
      }
      return guitarraState
    })
    setCarrito(carritoActualizado)
  }

  const eliminarGuitarra = id => {
    const carritoActualizado = carrito.filter(guitarraState => guitarraState.id != id)
    setCarrito(carritoActualizado)
  }

    return (
        <Document>
        <Outlet
          context={{
            agregarCarrito,
            carrito,
            actualizarCantidad,
            eliminarGuitarra
        }}
        />
        </Document>
    )
}

function Document({ children }) {
    return (
      <html lang="es">
        <head>
          <Meta />
          <Links />
        </head>
            <body>
                <Header/>
          {children}
          <Footer />
                <Scripts />
                <LiveReload />
        </body>
      </html>
    );
}

/**Manejo de Errores */
export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <Document>
        <p className="error">
          {error.status} {error.statusText}
        </p>

        <Link className="error_enlace" top="/">Regresar a la Pagina Principal</Link>
      </Document>
    );
  }
}

