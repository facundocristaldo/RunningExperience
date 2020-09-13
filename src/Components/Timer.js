import React, { Component } from 'react';
import './main.css';

const FULL_DASH_ARRAY = 283;

class Timer extends Component {

  // Divides time left by the defined time limit.
  calculateTimeFraction() {
    // console.log(`${this.props.timerVal} / ${this.props.timerTotalTime} = `, this.props.timerVal / this.props.timerTotalTime)
    return this.props.timerVal / this.props.timerTotalTime;
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
        <div className="base-timer">
          <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g className="base-timer__circle">
              <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45" />
              <Circle circleDasharray={circleDasharray} />
            </g>
          </svg>
          <span id="base-timer-label" className="base-timer__label">
            {tiempoTexto}
          </span>
        </div>
        {/* <p className="time-left">{tiempoTexto}</p> */}
        <div className="fixed-bottom">
          <p className="steps-left">Vueltas restantes: {this.props.stepsLeft}</p>
          <div className="form-buttons-container">
            <button className="form-button btn-danger" type="button" onClick={this.props.stopTimer}>Frenar</button>
            <button className="form-button" type="button" onClick={this.props.startTimer}>Comenzar</button>
          </div>
        </div>
      </div>
    )
  }
}

function Circle(props) {
  // console.log("circle props=", props)
  return (
    <path id="base-timer-path-remaining" strokeDasharray={props.circleDasharray}
      className="base-timer__path-remaining green" d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "></path>
  )
}

export default Timer;
