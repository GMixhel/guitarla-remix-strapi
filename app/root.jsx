import { Meta, Links,Link, Outlet, Scripts, LiveReload, useRouteError, isRouteErrorResponse } from '@remix-run/react'
import styles from './styles/index.css'
import Header from './components/header';
import Footer from './components/footer';


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
    return (
        <Document>
            <Outlet />
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
