import React from 'react';
import Config from './Config';
import Timer from './Timer';
import sound1 from '../Resources/sounds/sound1.mp3.sound';
import sound2 from '../Resources/sounds/sound2.mp3.sound';
import { windows, timerStatus, mensajesEstaticos } from './Constants'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ConvertMinSegDurationToSeg } from '../utils';
import './main.css';

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

  componentDidMount() {
    if (window.localStorage.getItem('state')) {
      let result = window.localStorage.getItem('state')
      if (result) {
        this.setState((prevState) => JSON.parse(result))
      }
    }
  }

  updateStateConfig = config => {
    this.setState((prevState) => {
      prevState.configuracion = config
      window.localStorage.setItem('state', JSON.stringify(prevState))
      return prevState;
    });
  }

  startTimer = () => {
    this.stopTimer();

    this.setState((prevState) => {
      //clono el objeto prevState
      let newState = { ...prevState };
      //extraigo para mejor legibilidad
      const { caminata, corre, repeticiones } = prevState.configuracion;
      //checkeo
      if (ConvertMinSegDurationToSeg(caminata) <= 0)
        return
      if (ConvertMinSegDurationToSeg(corre) <= 0)
        return
      if (repeticiones <= 0)
        return
      //asigno valores
      newState.timerValueSeconds = ConvertMinSegDurationToSeg(caminata);
      newState.timerActivity = caminata.titulo;
      newState.timerStepsLeft = repeticiones;
      newState.timerTotalTime = ConvertMinSegDurationToSeg(caminata);
      newState.timerState = timerStatus.running;
      //comienzo el intervalo
      interval = setInterval(() => {
        this.tick();
      }, 1000);
      return newState;
    })
  }

  tick() {
    this.setState(prevState => {
      //clono el estado para no cambiar direactamente
      let newState = { ...prevState };
      //disminuyo el segundo en 1
      newState.timerValueSeconds--;
      //Si llegué a 0, cambio actividad
      if (newState.timerValueSeconds <= 0) {
        this.toggleActivity();
      }
      return newState;
    })
  }

  stopTimer = () => {
    if (interval) {
      clearInterval(interval);
      interval = undefined;
      this.setState(prevState => {
        let newState = { ...prevState };
        newState.timerState = timerStatus.stoped;
        newState.timerValueSeconds = 0;
        newState.timerActivity = '';
        return newState;
      })
    }
  }

  toggleActivity = () => {
    this.setState(prevState => {

      let newState = { ...prevState };
      const { caminata, corre } = prevState.configuracion;
      const { timerActivity } = prevState;
      switch (timerActivity) {
        case caminata.titulo:
          newState.timerActivity = corre.titulo;
          newState.timerValueSeconds = ConvertMinSegDurationToSeg(corre);
          newState.timerTotalTime = ConvertMinSegDurationToSeg(corre);
          this.sound1.play();
          break;
        case corre.titulo:
          newState.timerStepsLeft--;
          if (newState.timerStepsLeft === 0) {
            newState.timerActivity = mensajesEstaticos.felicitaciones;
            newState.timerValueSeconds = 0;
            this.stopTimer();
            this.sound2.play();
          } else {
            newState.timerActivity = caminata.titulo;
            newState.timerValueSeconds = ConvertMinSegDurationToSeg(caminata);
            newState.timerTotalTime = ConvertMinSegDurationToSeg(corre);
            this.sound1.play();
          }
          break;
        default:
          break;
      }
      return newState;
    })

  }
  endingMessage() {

  }

  render() {
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
