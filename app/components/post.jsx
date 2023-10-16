import { Link } from "@remix-run/react"
import { formatearFecha } from "../helpers/helpers"



const Post = ({ post }) => {
    const {imagen, titulo, contenido, url, publishedAt} = post
  return (
    <article className="post">
          <img className="imagen" src={imagen.data.attributes.formats.small.url} alt={`imagen blog ${titulo}`} />
          <div className="contenido">
              <h3>{titulo}</h3>
              <p className="fecha">{formatearFecha(publishedAt) }</p>
              <p className="resume">{contenido}</p>
              <Link className="enlace" to={`/post/${url}`}>Leer Post</Link>
          </div>
    </article>
  )
}

export default Post
