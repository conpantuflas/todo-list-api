import { useEffect, useState } from 'react';
import './App.css';

function App() {
  //---------------------------------------------------------------------------------estados:
  const [recopGet, setRecopGet] = useState([])
  const [inputValue, setInputValue] = useState()

  //---------------------------------------------------------------------------------recepcion de datos
  useEffect(() => {
    fetch('https://assets.breatheco.de/apis/fake/todos/user/judith')
      .then(respuesta => respuesta.json())
      .then(data => setRecopGet(data)
      )
  }, [recopGet])

  //------------------------------------------------------------------------------------estilos

  return (
    <div className="App">
      <div className='formulario'>
      <div className='padreTitular'> <h1 className='titular'>TodoList</h1> </div>
        <form onSubmit={(e) => {
          e.preventDefault()
          //-------------------------------------------------------------------------actualizacion de datos         
          fetch('https://assets.breatheco.de/apis/fake/todos/user/judith', {
            method: "PUT",
            headers: { "Content-Type": "Application/json" },
            body: JSON.stringify([...recopGet, { label: inputValue, done: false }])
          })
            .then(respuesta => respuesta.json())
            .then(data => console.log(data))
        }}>
            <input className='input' placeholder='tarea...'
              onChange={(e) => {
                setInputValue(e.target.value)
              }} />
        </form>
        <div>
          {
            recopGet.map((e, i) => {
              return <div className='tarea' key={i}><p className="textoTarea">{e.label}</p>
              <button onClick={(e)=>{
                console.log(i)
                const noEliminados = recopGet.filter((tarea, indice)=> i != indice)
                fetch('https://assets.breatheco.de/apis/fake/todos/user/judith',{
                  method: "PUT",
                  headers: {"Content-Type": "application/json"},
                  body: JSON.stringify(noEliminados)
                })
                .then(respuesta => respuesta.json())
                
              }} className="boton">x</button>{e.eliminado}</div>
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
