import { BaseColaboradores } from "./components/BaseColaboradores";
import { useState } from "react";
function App() {

  const [listaColaboradores, setListaColaboradores] = useState(BaseColaboradores)
  const [nombre, setNombre] = useState("")
  const [correo, setCorreo] = useState("")
  const [disable, setDisable] = useState(true)
  const [listaFiltrada, setlistaFiltrada] = useState(listaColaboradores)



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
    setListaColaboradores([...listaColaboradores, { id: obtenerId(), nombre: nombre, correo: correo }])
    setlistaFiltrada([...listaColaboradores, { id: obtenerId(), nombre: nombre, correo: correo }])
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
  const filtrarColaborador = (e) => {

    const query = e.target.value;
    var nuevaLista = [...listaFiltrada];
    nuevaLista = nuevaLista.filter((item) => {
      return item.nombre.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setListaColaboradores(nuevaLista);
    
  };
  return (
    <div className="App">
      <h1 className="text-light">Desafio Colaboradores</h1>
      <div className="container fs-4 text">
        <div className="buscar">
          <p>Filtrar</p>
          <input onChange={filtrarColaborador} type="text" className="form-control m-4 w-50" placeholder="Nombre" />
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
          {listaColaboradores.map((item, index) => (
            <li key={item.id}>{item.nombre}-{item.correo}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
