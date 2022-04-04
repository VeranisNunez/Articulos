export default function Consulta({buscarArticulo, setIdBuscar}) {
  return (
    <form className="row g-3 consulta" onSubmit={buscarArticulo}>
      <div className="col-auto">
        <label>Buscar artículo :</label>
      </div>
      <div className="col-auto">
        <input
          type="number"
          className="form-control"
          min={0}
          placeholder="ID de artículo"
          onChange={(e) => { setIdBuscar(e.target.value) }}
        />
      </div>
      <div className="col-auto">
        <button
          type="submit"
          className="btn btn-secondary fw-bolder px-4"
          data-bs-toggle="modal"
          data-bs-target="#buscarModal"
        >
          Buscar
        </button>
      </div>
    </form>
  )
}