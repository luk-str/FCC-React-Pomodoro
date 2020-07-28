import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionLength: 1500,
      sessionCounter: 1500,
      breakLength: 300,
      breakCounter: 300,
      inSession: true,
    };
  }

  render() {
    return (
      <main>
        <h1>Super Duper Pomodoro Timer</h1>
        <SessionSetup sessionCounter={this.state.sessionCounter} />
        <BreakSetup breakCounter={this.state.breakCounter} />
        <Counter
          sessionCounter={this.state.sessionCounter}
          breakCounter={this.state.breakCounter}
          inSession={this.state.inSession}
        />
        <Controls />
        <audio id="beep"></audio>
      </main>
    );
  }
}

// SESION SETUP

class SessionSetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionMinutes: `${~~(this.props.sessionCounter / 60)}`,
      sessionSeconds: `${this.props.sessionCounter % 60}`,
    };
  }
  render() {
    let sessionMinutes =
      this.state.sessionMinutes > 9
        ? this.state.sessionMinutes
        : `0${this.state.sessionMinutes}`;

    let sessionSeconds =
      this.state.sessionSeconds > 9
        ? this.state.sessionSeconds
        : `0${this.state.sessionSeconds}`;

    return (
      <div className="sessionSetup">
        <div id="session-label">
          <h5>Session Length</h5>
        </div>
        <div id="session-length">{`${sessionMinutes}:${sessionSeconds}`}</div>
        <button id="session-increment">↑</button>
        <button id="session-decrement">↓</button>
      </div>
    );
  }
}

// BREAK SETUP

class BreakSetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakMinutes: `${~~(this.props.breakCounter / 60)}`,
      breakSeconds: `${this.props.breakCounter % 60}`,
    };
  }
  render() {
    let breakMinutes =
      this.state.breakMinutes > 9
        ? this.state.breakMinutes
        : `0${this.state.breakMinutes}`;

    let breakSeconds =
      this.state.breakSeconds > 9
        ? this.state.breakSeconds
        : `0${this.state.breakSeconds}`;

    return (
      <div className="brakeSetup">
        <div id="break-label">
          <h5>Break Length</h5>
        </div>
        <div id="break-length">{`${breakMinutes}:${breakSeconds}`}</div>
        <button id="break-increment">↑</button>
        <button id="break-decrement">↓</button>
      </div>
    );
  }
}

// COUNTER

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionMinutes: `${~~(this.props.sessionCounter / 60)}`,
      sessionSeconds: `${this.props.sessionCounter % 60}`,
      breakMinutes: `${~~(this.props.breakCounter / 60)}`,
      breakSeconds: `${this.props.breakCounter % 60}`,
    };
  }
  render() {
    let sessionMinutes =
      this.state.sessionMinutes > 9
        ? this.state.sessionMinutes
        : `0${this.state.sessionMinutes}`;

    let sessionSeconds =
      this.state.sessionSeconds > 9
        ? this.state.sessionSeconds
        : `0${this.state.sessionSeconds}`;

    let breakMinutes =
      this.state.breakMinutes > 9
        ? this.state.breakMinutes
        : `0${this.state.breakMinutes}`;

    let breakSeconds =
      this.state.breakSeconds > 9
        ? this.state.breakSeconds
        : `0${this.state.breakSeconds}`;

    return (
      <div className="counter">
        <div id="timer-label">
          <h2>
            {" "}
            {this.props.inSession === true ? "work it!" : "chillaaax..."}
          </h2>
        </div>
        <div id="time-left">
          {this.props.inSession === true
            ? `${sessionMinutes}:${sessionSeconds}`
            : `${breakMinutes}:${breakSeconds}`}
        </div>
      </div>
    );
  }
}

// CONTROLS

class Controls extends React.Component {
  render() {
    return (
      <div>
        <button id="start_stop">START/STOP</button>
        <button id="reset">RESET</button>
      </div>
    );
  }
}

export default Controls;

ReactDOM.render(<App />, document.getElementById("root"));
