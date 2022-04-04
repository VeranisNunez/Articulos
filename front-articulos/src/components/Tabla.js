export default function Tabla({articulo, eliminar, camArt, cambioEstado}) {
  return (
    <tr>
      <th scope="row">{articulo.id}</th>
      <td>{articulo.descripcion}</td>
      <td>{new Intl.NumberFormat('es-CO', { style:'currency',currency:'COP'}).format(articulo.precio)}</td>
      <td>{articulo.estado == 1 ? 'Activo' : 'Desactivado'}</td>
      <td>
        <div className="icons">
          <i 
            className="fas fa-pencil-alt" 
            title="Editar" 
            data-bs-toggle="modal" 
            data-bs-target="#actModal"
            onClick={()=>camArt(articulo.id,articulo.descripcion, articulo.precio, articulo.estado)}
          />
          <i className="fas fa-trash" title="Eliminar" onClick={() => eliminar(articulo.id)}></i>
          {articulo.estado == 1 ?
            <i
              className="fas fa-eye"
              title="Desactivar"
              onClick={() => { cambioEstado(articulo.id, articulo.estado) }}
            />
            :
            <i
              className="fas fa-eye-slash"
              title="Activar"
              onClick={() => { cambioEstado(articulo.id, articulo.estado) }}
            />
          }
        </div>
      </td>
    </tr>
  )
}