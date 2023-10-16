import ListadoGuiterras from '../components/listado-guitarras'
import {getGuitarras} from '../models/guitarras.server'
import { getPosts } from '../models/post.server'
import { getCurso } from '../models/curso.server'
import { useLoaderData } from '@remix-run/react'
import stylesGuitarras from '../styles/guitarras.css'
import stylesPosts from '../styles/blog.css'
import stylesCursos from '../styles/cursos.css'
import ListadoPost from '../components/listado-post'
import { Curso } from '../components/curso'


export function meta() {
  
}
export function links() {
    return [
      {
        rel: "stylesheet",
        href: stylesGuitarras,
      },
      {
        rel: "stylesheet",
        href: stylesPosts,
      },
      {
        rel: "stylesheet",
        href: stylesCursos,
      },
    ];
}
export async function loader() {
  const [guitarras, posts, curso] = await Promise.all([
    getGuitarras(),
    getPosts(),
    getCurso()
  ])


  return {
    guitarras: guitarras.data,
    posts: posts.data,
    curso: curso.data
  }
}


const Index = () => {
  const {guitarras, posts, curso} = useLoaderData()
  return (
    <>
      <main className="contenedor">
        <ListadoGuiterras
        guitarras={guitarras}          
        />
      </main>

      <Curso
      curso={curso.attributes}
      />
      <section>
        <ListadoPost
        posts={posts}
        />
      </section>
    </>
  );
}

export default Index
