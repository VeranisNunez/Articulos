import React, { useEffect, useState } from "react";
import Tabla from "./Tabla";
import Consulta from "./Consulta";

export default function Articulos() {

  let [articulos, setArticulos] = useState([])
  let [busArticulo, setBusArticulo] = useState([])
  let [idBuscar, setIdBuscar] = useState(0)
  let [idAct, setIdAct] = useState(0)
  let [descripcion, setDescripcion] = useState('')
  let [precio, setPrecio] = useState(0)
  let [estado, setEstado] = useState(1)

  useEffect(() => {
    obtenerDatos()
  })

  function obtenerDatos() {
    fetch('http://localhost:4000/articulos', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    .then((response) => response.json())
    .then((data) => { setArticulos(data) })
    .catch((error) => error)
  }

  function buscarArticulo(e) {
    e.preventDefault();
    busArticulo.length = 0
    fetch('http://localhost:4000/articulos/' + idBuscar, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    .then((response) => response.json())
    .then((data) => { setBusArticulo(data) })
    .catch((error) => error)
  }

  function agregar(e) {
    e.preventDefault();
    fetch('http://localhost:4000/agregar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        descripcion: descripcion,
        precio: precio,
        estado: estado
      }),
    })
    .then((response) => response.json())
    .then((data) => { console.log(data) })
    .catch((error) => error)
    document.location.reload(false)
  }

  function eliminar(id) {
    fetch('http://localhost:4000/eliminar/' + id, {
      method: 'DELETE'
    })
    .then((response) => response.json())
    .then((data) => { console.log(data) })
    .catch((error) => error)
    document.location.reload(false)
  }

  function camArt(i,d,p,e) {
    setIdAct(i)
    setDescripcion(d)
    setPrecio(p)
    setEstado(e)
  }

  function actualizar(e) {
    e.preventDefault();
    fetch('http://localhost:4000/actualizar/' + idAct, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        descripcion: descripcion,
        precio: precio,
        estado: estado
      }),
    })
    .then((response) => response.json())
    .then((data) => { console.log(data) })
    .catch((error) => error)
  }

  function cambioEstado(id, estado) {
    fetch('http://localhost:4000/actualizar/' + id + '/estado', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado: estado == 1 ? 0 : 1 }),
    })
    .then((response) => response.json())
    .then((data) => { console.log(data) })
    .catch((error) => error)
  }

  return (
    <div className="container fs-5 p-5" style={{ minHeight: '100vh' }}>
      <div className="header py-5">
        <h1 className="fw-bolder"> ARTICULOS </h1>
        <Consulta buscarArticulo={buscarArticulo} setIdBuscar={setIdBuscar} />
      </div>

      <div className="table-articulos">
        {articulos && articulos.length > 0 ? 
          <table className="table table-striped table-bordered border-dark table-hover">
            <thead>
              <tr className="bg-secondary text-white">
                <th scope="col">ID</th>
                <th scope="col">Descripción</th>
                <th scope="col">Precio</th>
                <th scope="col">Estado</th>
                <th scope="col">Gestión</th>
              </tr>
            </thead>
            <tbody>
              {
                articulos.map(articulo => {
                  return (
                    <Tabla 
                      key={articulo.id}
                      articulo={articulo} 
                      eliminar={eliminar} 
                      camArt={camArt}
                      cambioEstado={cambioEstado}
                    />
                  )
                })
              }
            </tbody>
          </table>
        :
          <h4> No hay artículos disponibles </h4>}
      </div>

      <div className="text-center py-3">
        <button
          type="button"
          className="btn btn-secondary fw-bolder px-4"
          data-bs-toggle="modal"
          data-bs-target="#agregarModal"
        >
          Agregar artículo
        </button>
      </div>

      {/* Modal agregar */}
      <div className="modal fade" id='agregarModal'>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title fw-bolder">Agregar artículo</h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form className="row g-3 formAgregar" onSubmit={agregar}>
              <div className="modal-body" style={{textAlign: 'left'}}>
                <label className="form-label">Descripción</label>
                <textarea 
                  className="form-control"
                  rows="2"
                  required
                  onChange={(e) => {setDescripcion(e.target.value)}}
                />
                <div className="row mt-3">
                  <div className="col">
                    <label className="form-label">Estado</label>
                    <select className="form-select" onChange={(e) => {setEstado(e.target.value)}}>
                      <option value={1}>Activo</option>
                      <option value={0}>Desactivado</option>
                    </select>
                  </div>
                  <div className="col">
                    <label className="form-label">Precio</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      min={0}
                      onChange={(e) => {setPrecio(e.target.value)}}
                    />
                  </div>
                </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-ligth border fw-bolder" data-bs-dismiss="modal">Cerrar</button>
              <button type="submit" className="btn btn-secondary fw-bolder">Agregar</button>
            </div>
          </form>
          </div>
        </div>
      </div>

      {/* Modal actualizar */}
      <div className="modal fade" id='actModal'>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title fw-bolder">Actualizar artículo</h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form className="row g-3 formAgregar" onSubmit={actualizar}>
              <div className="modal-body" style={{textAlign: 'left'}}>
                <label className="form-label">Descripción</label>
                <textarea 
                  className="form-control"
                  rows="2"
                  value={descripcion}
                  onChange={(e) => {setDescripcion(e.target.value)}}
                />
                <div className="row mt-3">
                  <div className="col">
                    <label className="form-label">Estado</label>
                    <select 
                      className="form-select" 
                      value={estado} 
                      onChange={(e) => {setEstado(e.target.value)}}
                    >
                      <option value={1}>Activo</option>
                      <option value={0}>Desactivado</option>
                    </select>
                  </div>
                  <div className="col">
                    <label className="form-label">Precio</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      min={0}
                      value={precio}
                      onChange={(e) => {setPrecio(e.target.value)}}
                    />
                  </div>
                </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-ligth border fw-bolder" data-bs-dismiss="modal">Cerrar</button>
              <button type="submit" className="btn btn-secondary fw-bolder">Actualizar</button>
            </div>
          </form>
          </div>
        </div>
      </div>

      {/* Modal buscar */}
      <div className="modal fade" id='buscarModal'>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title fw-bolder">Buscar artículo</h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div style={{textAlign: 'left'}}>
                {busArticulo && busArticulo.length > 0 ?
                  busArticulo.map(busArticulo => {
                    return(
                      <div key={busArticulo.id}>
                        <div className="row" >
                          <p className="fw-bolder col-4">ID : </p>
                          <p className="col-auto">{busArticulo.id}</p>
                        </div>
                        <div className="row">
                          <p className="fw-bolder col-4">Descripción : </p>
                          <p className="col-auto">{busArticulo.descripcion}</p>
                        </div>
                        <div className="row">
                          <p className="fw-bolder col-4">Precio : </p>
                          <p className="col-auto">
                            {new Intl.NumberFormat('es-CO', { style:'currency',currency:'COP'}).format(busArticulo.precio)}
                          </p>
                        </div>
                        <div className="row">
                          <p className="fw-bolder col-4">Estado : </p>
                          <p className="col-auto">{busArticulo.estado == 1 ? 'Activo' : 'Desactivado'}</p>
                        </div>
                      </div>
                    )
                  })
                  :
                  <p> No se encontró el artículo </p>
                }
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-ligth border fw-bolder" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}