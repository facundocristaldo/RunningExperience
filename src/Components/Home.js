import React from 'react';
import Config from './Config';
import Timer from './Timer';
import './main.css';
import sound1 from '../Resources/sounds/sound1.mp3.sound';
import sound2 from '../Resources/sounds/sound2.mp3.sound';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const windows = { home: 'home', config: 'config', timer: 'timer' }
const mensajesEstaticos = {
  comienza: "Comienza",
  felicitaciones: "Felicitaciones!"
}
const timerStatus = { stoped: "stoped", running: "running" };
var interval;
class Home extends React.Component {

  state = {
    configuracion: {
      caminata: { minutos: 0, segundos: 0, titulo: "Camina" },
      corre: { minutos: 0, segundos: 0, titulo: "Trota" },
      repeticiones: 0
    },
    window: windows.home,
    timerValueSeconds: 0,
    timerActivity: '',
    timerStepsLeft: 0,
    timerState: timerStatus.stoped
  }
  sound1 = new Audio(sound1);
  sound2 = new Audio(sound2);

  constructor(props) {
    super(props);
    if (window.localStorage.getItem('state')) {
      let result = window.localStorage.getItem('state')
      if (result) {
        this.state = JSON.parse(result)
      }
    }
  }


  changeWindow(selWindow) {
    let newState = this.state;
    newState.window = selWindow;
    this.setState(newState)
    window.localStorage.setItem('state', JSON.stringify(newState))
  }

  updateStateConfig = config => {
    let newState = this.state;
    newState.configuracion = config;
    this.setState(newState);
    // console.log("App state", newState);
    window.localStorage.setItem('state', JSON.stringify(this.state))
  }

  startTimer = () => {
    this.stopTimer();
    let newState = this.state;
    let timerseconds = this.state.configuracion.caminata.minutos * 60 + this.state.configuracion.caminata.segundos
    if (timerseconds <= 0)
      return
    if (this.state.configuracion.corre.minutos * 60 + this.state.configuracion.corre.segundos <= 0)
      return
    if (this.state.configuracion.repeticiones <= 0)
      return
    newState.timerValueSeconds = timerseconds;
    newState.timerActivity = this.state.configuracion.caminata.titulo;
    newState.timerStepsLeft = this.state.configuracion.repeticiones;
    newState.timerTotalTime = newState.timerValueSeconds;
    newState.timerState = timerStatus.running;
    if (newState.timerStepsLeft > 0) {
      this.setState(newState);
      if (!interval) {
        interval = setInterval(() => {
          this.tick();
        }, 1000);
      }
    }
  }

  tick() {
    let newState = this.state;
    newState.timerValueSeconds--;
    if (newState.timerValueSeconds <= 0) {
      this.toggleActivity();
    }
    this.setState(newState);
  }

  stopTimer = () => {

    if (interval) {
      clearInterval(interval);
      interval = undefined;
      let newState = this.state;
      newState.timerState = timerStatus.stoped;
      newState.timerValueSeconds = 0;
      newState.timerActivity = '';
      this.setState(newState);
    }
  }
  toggleActivity = () => {
    let newState = this.state;
    if (newState.timerActivity === newState.configuracion.caminata.titulo) {
      newState.timerActivity = newState.configuracion.corre.titulo;
      newState.timerValueSeconds = newState.configuracion.corre.minutos * 60 + newState.configuracion.corre.segundos;
      newState.timerTotalTime = newState.timerValueSeconds;
      this.sound1.play();
    } else if (newState.timerActivity === newState.configuracion.corre.titulo) {
      newState.timerStepsLeft--;
      if (newState.timerStepsLeft === 0) {
        newState.timerActivity = mensajesEstaticos.felicitaciones;
        newState.timerValueSeconds = 0;
        this.stopTimer();
        this.sound2.play();
      } else {
        newState.timerActivity = newState.configuracion.caminata.titulo;
        newState.timerValueSeconds = newState.configuracion.caminata.minutos * 60 + newState.configuracion.caminata.segundos;
        newState.timerTotalTime = newState.timerValueSeconds;
        this.sound1.play();
      }
    }
    this.setState(newState);

  }


  render() {
    let confElemClass = `nav-bar-item ${(this.state.window === windows.config) ? "nav-bar-item-active" : ""}`
    let timerElemClass = `nav-bar-item ${(this.state.window === windows.timer) ? "nav-bar-item-active" : ""}`
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/timer">
              <Timer
                startTimer={this.startTimer}
                stopTimer={this.stopTimer}
                timerVal={this.state.timerValueSeconds}
                actividad={this.state.timerActivity}
                stepsLeft={this.state.timerStepsLeft}
                timerTotalTime={this.state.timerTotalTime}
                timerState={this.state.timerState}
              />
            </Route>
            <Route path="/config">
              <Config
                updateStateConfig={this.updateStateConfig}
                actualCofig={this.state.configuracion}
              />
            </Route>
            <Route path="/" >
              <h1>Hi stranger!</h1>
              <Link to="/timer">A Correr</Link>
              <Link to="/config">Configuración</Link>
            </Route>
          </Switch>
        </Router>
      </div>
    );

  }
}



export default Home;
