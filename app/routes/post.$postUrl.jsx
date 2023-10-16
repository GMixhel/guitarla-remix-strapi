import { formatearFecha } from "../helpers/helpers";
import { getPost } from "../models/post.server";
import { useLoaderData } from '@remix-run/react';
import styles from '../styles/blog.css'
 
export function links() {
  return [
    {
      rel: 'stylesheet',
      href: styles
    }
  ]
}

export async function loader({ params }) {
  const { postUrl } = params;
  const post = await getPost(postUrl);

  if (post.data.length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "Entrada no encontrada",
    });
  }

  return post;
}

export default function Posts() {
  const post = useLoaderData()
  const {titulo, contenido, imagen, publishedAt } = post.data[0].attributes
  return (
    <article className="post mt-3">
      <img
        className="imagen"
        src={imagen.data.attributes.url}
        alt={`imagen blog ${titulo}`}
      />
      <div className="contenido">
        <h3>{titulo}</h3>
        <p className="fecha">{formatearFecha(publishedAt)}</p>
        <p className="texto">{contenido}</p>
      </div>
    </article>
  );
};


