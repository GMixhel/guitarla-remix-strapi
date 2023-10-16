import { useLoaderData } from "@remix-run/react";
import { getPosts } from "../models/blog.server";
import ListadoPost from "../components/listado-post";

export function meta() {
  return [
    {
      title: "GuitarrasLA - Nuestro Blog",
      description: "GuitarrasLA - Blog de música y venta de guitarras",
    },
  ];
}
export async function loader() {
  const posts = await getPosts();
  console.log(posts);

  return posts.data;
}

const Blog = () => {
  const posts = useLoaderData();

  return (
      <ListadoPost posts={posts} />
  );
};

export default Blog;
