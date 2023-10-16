import Guitarra from "./guitarra";


const ListadoGuiterras = ({guitarras}) => {
  return (
    <>
      <h2 className="heading">Nuestra Colección</h2>

      {guitarras.length && (
        <div className="guitarras-grid">
          {guitarras.map((guitarra) => {
            return (
              <Guitarra key={guitarra?.id} guitarra={guitarra?.attributes} />
            );
          })}
        </div>
      )}
    </>
  );
}

export default ListadoGuiterras;