import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './main.css';

const configuraciones = {
  CaminaTitulo: "CTitulo",
  CaminaMinutos: 'CMin',
  CaminaSegundos: 'CSeg',
  CorreTitulo: "TTitulo",
  CorreMinutos: "TMin",
  CorreSegundos: "TSeg",
  Repeticiones: "repeticiones"
}
function Config(props) {


  const [configuracion, setConfiguracion] = useState(props.actualCofig)
  const [configFormStyle, setConfigFormStyle] = useState({
    opacity: 0,
  });
  const [configFormItemsStyle, setConfigFormItemsStyle] = useState({
    opacity: 0,
    animation: '',
  });
  const [configFormItemsStyle2, setConfigFormItemsStyle2] = useState({
    opacity: 0,
    animation: '',
  });
  const [configFormItemsStyle3, setConfigFormItemsStyle3] = useState({
    opacity: 0,
    animation: '',
  });

  const handleChange = (event) => {
    if (Number(event.target.value) >= 0 && Number(event.target.value) <= 60) {
      let nuevoValor = Number(event.target.value);
      let campo = event.target.id;
      switch (campo) {
        case configuraciones.CaminaTitulo:
          configuracion.caminata.titulo = nuevoValor;
          setConfiguracion(configuracion);
          break;
        case configuraciones.CaminaMinutos:
          configuracion.caminata.minutos = nuevoValor;
          setConfiguracion(configuracion);
          break;
        case configuraciones.CaminaSegundos:
          configuracion.caminata.segundos = nuevoValor;
          setConfiguracion(configuracion);
          break;
        case configuraciones.CorreTitulo:
          configuracion.corre.titulo = nuevoValor;
          setConfiguracion(configuracion);
          break;

        case configuraciones.CorreMinutos:
          configuracion.corre.minutos = nuevoValor;
          setConfiguracion(configuracion);
          break;
        case configuraciones.CorreSegundos:
          configuracion.corre.segundos = nuevoValor;
          setConfiguracion(configuracion);
          break;
        case configuraciones.Repeticiones:
          configuracion.repeticiones = nuevoValor;
          setConfiguracion(configuracion);
          break;
        default:
          break;
      }
      handleSubmit();
    }
    if (event.target.id.trim() === configuraciones.CaminaTitulo || event.target.id.trim() === configuraciones.CorreTitulo) {
      let nuevoValor = event.target.value.toString();
      let campo = event.target.id;

      switch (campo) {
        case configuraciones.CaminaTitulo:
          configuracion.caminata.titulo = nuevoValor;
          setConfiguracion(configuracion);
          break;
        case configuraciones.CorreTitulo:
          configuracion.corre.titulo = nuevoValor;
          setConfiguracion(configuracion);
          break;
        default:
          break;
      }
      handleSubmit();
    }

  }
  const handleSubmit = e => {
    props.updateStateConfig(configuracion);
  }
  useEffect(() => {
    setTimeout(() => {
      setConfigFormStyle({
        opacity: 1
      })
      setConfigFormItemsStyle({
        animation: 'ease-in-down 0.5s',
      })
      setConfigFormItemsStyle2({
        animation: 'ease-in-down 0.9s',
      })
      setConfigFormItemsStyle3({
        animation: 'ease-in-down 1.2s',
      })
    }, 100)
  }, [configFormItemsStyle, configFormItemsStyle2, configFormItemsStyle3])
  let clase = 'configIconLink'

  return (
    <div>
      <Link to="/timer" className={clase}><img className="configIconImg" src={require("../Resources/icons/CerrarIcon.png")} alt={"Volver"} /></Link>
      <form className="config-form" style={configFormStyle} onSubmit={() => handleSubmit()}>
        <div className="form-section" style={configFormItemsStyle}>
          <h3 className="form-section-title"><input type="text" placeholder="Actividad" id={configuraciones.CaminaTitulo} onChange={(e) => handleChange(e)} value={configuracion.caminata.titulo} /></h3>
          <label className="form-section-input" htmlFor='CMin'>Minutos <input type="number" min="0" max="60" id="CMin" onChange={(e) => handleChange(e)} value={configuracion.caminata.minutos} /></label>
          <label className="form-section-input" htmlFor='CSeg'>Segundos <input type="number" min="0" max="60" id="CSeg" onChange={(e) => handleChange(e)} value={configuracion.caminata.segundos} /></label>
        </div>
        <div className="form-section" style={configFormItemsStyle2}>
          <h3 className="form-section-title"><input type="text" placeholder="Actividad" id={configuraciones.CorreTitulo} value={configuracion.corre.titulo} onChange={(e) => handleChange(e)} /></h3>
          <label className="form-section-input" htmlFor='TMin'>Minutos <input type="number" min="0" max="60" id="TMin" onChange={(e) => handleChange(e)} value={configuracion.corre.minutos} /></label>
          <label className="form-section-input" htmlFor='TSeg'>Segundos <input type="number" min="0" max="60" id="TSeg" onChange={(e) => handleChange(e)} value={configuracion.corre.segundos} /></label>
        </div>
        <div className="form-section" style={configFormItemsStyle3}>
          <h3 className="form-section-title">Repeticiones</h3>
          <label className="form-section-input" htmlFor='repeticiones'>Cantidad <input type="number" min="0" max="60" id="repeticiones" onChange={(e) => handleChange(e)} value={configuracion.repeticiones} /></label>
        </div>
      </form>
    </div>
  )
}



export default Config;