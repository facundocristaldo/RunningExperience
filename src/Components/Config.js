import React, { Component } from 'react';
import './main.css';

const configuraciones = {
  CaminaMinutos: 'CMin',
  CaminaSegundos: 'CSeg',
  CorreMinutos: "TMin",
  CorreSegundos: "TSeg",
  Repeticiones: "repeticiones"
}
class Config extends Component {


  constructor(props) {
    super(props);
    this.state = {
      configuracion: {
        caminata: { minutos: 0, segundos: 0, titulo: "Camina" },
        corre: { minutos: 0, segundos: 0, titulo: "Trota" },
        repeticiones: 0
      }
    }
    //let newstate = this.state
    this.state.configuracion = this.props.actualCofig
    // console.log("config= ", this.state)
    //this.setState(this.state)
  }

  handleChange = event => {
    if (Number(event.target.value) >= 0 && Number(event.target.value) <= 60) {
      let nuevoValor = Number(event.target.value);
      let campo = event.target.id;
      let newState = this.state;
      switch (campo) {
        case configuraciones.CaminaMinutos:
          newState.configuracion.caminata.minutos = nuevoValor;
          this.setState(newState);
          break;
        case configuraciones.CaminaSegundos:
          newState.configuracion.caminata.segundos = nuevoValor;
          this.setState(newState);
          break;
        case configuraciones.CorreMinutos:
          newState.configuracion.corre.minutos = nuevoValor;
          this.setState(newState);
          break;
        case configuraciones.CorreSegundos:
          newState.configuracion.corre.segundos = nuevoValor;
          this.setState(newState);
          break;
        case configuraciones.Repeticiones:
          newState.configuracion.repeticiones = nuevoValor;
          this.setState(newState);
          break;
        default:
          break;
      }
      this.handleSubmit();
    }
  }
  handleSubmit = e => {
    //e.preventDefault();

    this.props.updateStateConfig(this.state.configuracion);
  }

  reload = e => {
    //e.preventDefault();
    let newState = this.state
    newState.configuracion = this.props.actualCofig;
    console.log('cancel state=', this.props.actualCofig)
    this.setState(newState);
  }

  render() {
    // console.log(this.state)
    return (
      <div>
        <h1 className="page-title"> Configuración</h1>

        <form className="config-form" onSubmit={this.handleSubmit}>
          <div className="form-section">
            <h3 className="form-section-title">Caminata</h3>
            <label className="form-section-input" htmlFor='CMin'>Minutos <input type="number" min="0" max="60" id="CMin" onChange={this.handleChange} value={this.state.configuracion.caminata.minutos} /></label>
            <label className="form-section-input" htmlFor='CSeg'>Segundos <input type="number" min="0" max="60" id="CSeg" onChange={this.handleChange} value={this.state.configuracion.caminata.segundos} /></label>
          </div>
          <div className="form-section">
            <h3 className="form-section-title">Trote</h3>
            <label className="form-section-input" htmlFor='TMin'>Minutos <input type="number" min="0" max="60" id="TMin" onChange={this.handleChange} value={this.state.configuracion.corre.minutos} /></label>
            <label className="form-section-input" htmlFor='TSeg'>Segundos <input type="number" min="0" max="60" id="TSeg" onChange={this.handleChange} value={this.state.configuracion.corre.segundos} /></label>
          </div>
          <div className="form-section">
            <h3 className="form-section-title">Repeticiones</h3>
            <label className="form-section-input" htmlFor='repeticiones'>Cantidad <input type="number" min="0" max="60" id="repeticiones" onChange={this.handleChange} value={this.state.configuracion.repeticiones} /></label>
          </div>
          {/* <div className="form-buttons-container">
            <button className="form-button" type="button" onClick={this.reload}>Cancelar</button>
            <button className="form-button" type="Submit">Guardar</button>
          </div> */}
        </form>
      </div>
    )
  }
}



export default Config;