import styles from '../styles/carrito.css'

export function links() {
    return [
        {
            rel: 'stylesheet',
            href: styles
        }
    ]
}

const Carrito = () => {
  return (
    <main>
      <h1 className="heading">Carrito de compras</h1>

      <div className="contenido">
        <div className="carrito">
          <h2>Articulos</h2>
        </div>

        <aside className="resumen">
          <h3>Resume del pedido</h3>
          <p>Total a pagar: $</p>
        </aside>
      </div>
    </main>
  );
};

export default Carrito

