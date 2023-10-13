import { useLoaderData } from "@remix-run/react";
import { getGuitarras } from "../models/guitarras.server"; 
import Guitarra from "../components/guitarra";
import styles from "../styles/guitarras.css";

export function meta() {
  return [
    {
      title: "GuitarrasLA - Tienda de Guitarras",
      description: "GuitarrasLA - Nuestra Coleccion de Guitarras",
    },
  ];
}

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: styles
    }

  ]
}

export async function loader() {
  const guitarras = await getGuitarras()
  
  return guitarras.data
}

function Tienda() {
  const guitarras = useLoaderData();

  return (
    <main className="contenedor">
      <h2 className="heading">Nuestra Colección</h2>

      {guitarras.length && (
        <div className="guitarras-grid">
          {guitarras.map((guitarra) => {
            return <Guitarra
              key={guitarra?.id}
              guitarra={guitarra?.attributes}
            />;
          })}
        </div>
      )}
    </main>
  );
}

export default Tienda;
