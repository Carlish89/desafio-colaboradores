import { BaseColaboradores } from "./components/BaseColaboradores";
import { useState } from "react";
function App() {
  
  const [listaColaboradores, setListaColaboradores] = useState(BaseColaboradores)
  const [nombre, setNombre] = useState("")
  const [correo, setCorreo] = useState("")
  const [disable,setDisable] = useState(true)
  const [filtro,setFiltro] = useState("")
  

  const obtenerId = () => {
    const last = listaColaboradores[listaColaboradores.length - 1];
    const numero = Number(last.id) + 1
    const id = numero.toString()
    return id
  }
  

  const capturaNombre = (e) => {
    disableButton()
    setNombre(e.target.value)
  }
  const capturaCorreo = (e) => {
    disableButton()
    setCorreo(e.target.value)
  }
  const enviarFormulario = (e) => {
    e.preventDefault()
    setListaColaboradores([...listaColaboradores, { id: obtenerId() ,nombre: nombre, correo: correo }])
    setNombre("")
    setCorreo("")
    setDisable(true)
}
const disableButton = () => {
  if (correo === '' || nombre === '') {
      setDisable(true)
      return
  }
  else {
      setDisable(false)
  }
}
const filtraColaborador = (nombre) => {
  const listaFiltrada = listaColaboradores.filter(el => el.nombre === nombre)
  setListaColaboradores(listaFiltrada)
}

  const capturaFilter = (e) => {
    setFiltro(e.target.value)
  }






  return (
    <div className="App">
      <h1 className="text-light">Desafio Colaboradores</h1>
      <div className="container fs-4 text">
        <div className="buscar">
           <p><button onClick={() => filtraColaborador(filtro) } className="btn btn-dark" >Filtrar</button></p>
          <input value={filtro} onChange={capturaFilter} type="text" className="form-control m-4 w-50" placeholder="Nombre" />
        </div>
        <form onSubmit={enviarFormulario}>
          <p>Nombre del colaborador</p>
          <input name="nombreColaborador" className="form-control my-2" onChange={capturaNombre} value={nombre} />
          <p>Correo del colaborador</p>
          <input name="mailColaborador" className="form-control my-2" onChange={capturaCorreo} value={correo} />
          <button disabled={disable} className="btn btn-dark my-3 fw-bold"> Agregar Colaborador </button>
        </form>
        <h1 className="border-bottom">Listado de colaboradores</h1>
        <ul className="my-3">
          {listaColaboradores.map(colaborador =>
            <li key={colaborador.id}>{colaborador.nombre}-{colaborador.correo}</li> )}
        </ul>        
      </div>
    </div>
  );
}

export default App;
