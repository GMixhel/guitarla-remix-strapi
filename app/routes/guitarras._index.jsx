import { useLoaderData } from "@remix-run/react";
import { getGuitarras } from "../models/guitarras.server";
import ListadoGuiterras from "../components/listado-guitarras";

export function meta() {
  return [
    {
      title: "GuitarrasLA - Tienda de Guitarras",
      description: "GuitarrasLA - Nuestra Coleccion de Guitarras",
    },
  ];
}

export async function loader() {
  const guitarras = await getGuitarras();

  return guitarras.data;
}

function Tienda() {
  const guitarras = useLoaderData();

  return <ListadoGuiterras guitarras={guitarras} />;
}

export default Tienda;
