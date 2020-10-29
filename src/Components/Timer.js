import React, { Component } from 'react';
import './main.css';

const FULL_DASH_ARRAY = 283;
const timerStatus = { stoped: "stoped", running: "running" };
class Timer extends Component {

  // Divides time left by the defined time limit.
  calculateTimeFraction() {
    // console.log(`${this.props.timerVal} / ${this.props.timerTotalTime} = `, this.props.timerVal / this.props.timerTotalTime)
    return this.props.timerVal / this.props.timerTotalTime;
  }

  constructor(props) {
    super(props)
    this.state = {
      timerStyle: {
        opacity: 0
      },
      startButtonStyle: {
        opacity: 0
      },
      stepsStyle: {
        opacity: 0,
        animation: ''
      }
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        timerStyle: {
          opacity: 1,
          transition: 'opacity 0.4s ease-in-out',
        }
      })
    }, 50)
    setTimeout(() => {
      this.setState({
        startButtonStyle: {
          opacity: 1,
          transition: 'opacity 1s ease-in-out',
        }
      })
    }, 250)
    setTimeout(() => {
      this.setState({
        stepsStyle: {
          animation: 'ease-in-right 0.5s',
        }
      })
    }, 500)
  }

  render() {
    const circleDasharray = `${(this.calculateTimeFraction() * FULL_DASH_ARRAY).toFixed(0)} 283`;

    let tiempoEnSegundos = this.props.timerVal;
    let segundos = tiempoEnSegundos % 60;
    let minutos = tiempoEnSegundos / 60;

    let minutosSTR = String('0' + Math.floor(minutos)).slice(-2);
    let segundosSTR = String('0' + Math.floor(segundos)).slice(-2);

    let tiempoTexto = minutosSTR + ":" + segundosSTR;
    return (
      <div className="hero-container">
        {/* <h1 className="page-title"> A Correr </h1> */}
        <p className="activity-name">{this.props.actividad}</p>
        <div className="base-timer" style={this.state.timerStyle}>
          <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g className="base-timer__circle">
              <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45" />
              <Circle circleDasharray={circleDasharray} />
            </g>
          </svg>
          <span id="base-timer-label" className="base-timer__label">
            {(this.props.timerState === timerStatus.running) ? <p>{tiempoTexto}</p> : <p className="form-button" onClick={this.props.startTimer} style={this.state.startButtonStyle}>Comenzar</p>}
          </span>
          {(this.props.timerState === timerStatus.running) ? <p className=" form-button-stop" onClick={this.props.stopTimer}>Finalizar</p> : ""}
        </div>
        <div className="fixed-bottom" style={this.state.stepsStyle}>
          <p className="steps-left">Vueltas restantes: {this.props.stepsLeft}</p>
        </div>
      </div>
    )
  }
}

function Circle(props) {
  console.log("circle props=", props.circleDasharray[0])
  let fill = (props.circleDasharray[0] === '0') ? false : true;
  return (
    <path id="base-timer-path-remaining" strokeDasharray={props.circleDasharray}
      className={(fill === true) ? "base-timer__path-remaining green" : "base-timer__path-remaining transparent"} d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "></path>
  )
}

export default Timer;
