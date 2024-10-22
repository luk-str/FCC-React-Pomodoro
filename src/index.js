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
      maxLength: 3600,
      minLength: 60,
      inSession: true,
      timerIsRunning: false,
      counterId: 0,
    };
    this.updateTimer = this.updateTimer.bind(this);
    this.runTimer = this.runTimer.bind(this);
    this.changeLength = this.changeLength.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.render = this.render.bind(this);
  }

  updateTimer() {
    let counter = this.state.inSession
      ? this.state.sessionCounter
      : this.state.breakCounter;
    counter--;

    if (this.state.inSession) {
      this.setState({ sessionCounter: counter });
    } else {
      this.setState({ breakCounter: counter });
    }

    if (counter < 0) {
      document.getElementById("beep").play();
      this.setState({
        inSession: !this.state.inSession,
        sessionCounter: this.state.sessionLength,
        breakCounter: this.state.breakLength,
      });
    }
  }

  runTimer() {
    if (!this.state.timerIsRunning) {
      let count = setInterval(this.updateTimer, 1000);
      this.setState({ timerIsRunning: true, counterId: count });
    } else {
      clearInterval(this.state.counterId);
      this.setState({ timerIsRunning: false, counterId: 0 });
    }
  }

  resetTimer() {
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
    clearInterval(this.state.counterId);
    this.setState({
      sessionLength: 1500,
      sessionCounter: 1500,
      breakLength: 300,
      breakCounter: 300,
      inSession: true,
      timerIsRunning: false,
      counterId: 0,
    });
  }

  changeLength(type, symbol) {
    let currentLength =
      type === "session" ? this.state.sessionLength : this.state.breakLength;

    let change = 0;

    if (symbol === "+" && currentLength < this.state.maxLength) {
      change = 60;
    } else if (symbol === "-" && currentLength > this.state.minLength) {
      change = -60;
    }

    type === "session"
      ? this.setState({
          sessionLength: currentLength + change,
          sessionCounter: currentLength + change,
        })
      : this.setState({
          breakLength: currentLength + change,
          breakCounter: currentLength + change,
        });
  }

  render() {
    return (
      <main>
        <h1 className="title">Super Duper Pomodoro Timer</h1>

        <SessionSetup
          sessionLength={this.state.sessionLength}
          changeLength={this.changeLength}
        />
        <BreakSetup
          breakLength={this.state.breakLength}
          changeLength={this.changeLength}
        />
        <Counter
          sessionCounter={this.state.sessionCounter}
          breakCounter={this.state.breakCounter}
          sessionLength={this.state.sessionLength}
          breakLength={this.state.breakLength}
          inSession={this.state.inSession}
        />
        <Controls
          runTimer={this.runTimer}
          resetTimer={this.resetTimer}
          timerIsRunning={this.state.timerIsRunning}
        />
        <audio
          id="beep"
          src="https://ia802506.us.archive.org/4/items/looper38/looper40.mp3"
        ></audio>
      </main>
    );
  }
}

// SESION SETUP

class SessionSetup extends React.Component {
  render() {
    const sessionMinutes = `${~~(this.props.sessionLength / 60)}`;

    return (
      <div className="sessionSetup">
        <div id="session-label">
          <h5>Session Length</h5>
        </div>
        <div id="session-length">{sessionMinutes}</div>
        <button
          id="session-increment"
          onClick={() => this.props.changeLength("session", "+")}
        >
          ↑
        </button>
        <button
          id="session-decrement"
          onClick={() => this.props.changeLength("session", "-")}
        >
          ↓
        </button>
      </div>
    );
  }
}

// BREAK SETUP

class BreakSetup extends React.Component {
  render() {
    const breakMinutes = `${~~(this.props.breakLength / 60)}`;

    return (
      <div className="breakSetup">
        <div id="break-label">
          <h5>Break Length</h5>
        </div>
        <div id="break-length">{breakMinutes}</div>
        <button
          id="break-increment"
          onClick={() => this.props.changeLength("break", "+")}
        >
          ↑
        </button>
        <button
          id="break-decrement"
          onClick={() => this.props.changeLength("break", "-")}
        >
          ↓
        </button>
      </div>
    );
  }
}

// COUNTER

class Counter extends React.Component {
  render() {
    const sessionMinutes = `${~~(this.props.sessionCounter / 60)}`;
    const sessionSeconds = `${this.props.sessionCounter % 60}`;
    const breakMinutes = `${~~(this.props.breakCounter / 60)}`;
    const breakSeconds = `${this.props.breakCounter % 60}`;

    const sessionMinutesDisplay =
      sessionMinutes > 9 ? sessionMinutes : `0${sessionMinutes}`;
    const sessionSecondsDisplay =
      sessionSeconds > 9 ? sessionSeconds : `0${sessionSeconds}`;
    const breakMinutesDisplay =
      breakMinutes > 9 ? breakMinutes : `0${breakMinutes}`;
    const breakSecondsDisplay =
      breakSeconds > 9 ? breakSeconds : `0${breakSeconds}`;

    let percentageLeft =
      (this.props.inSession
        ? this.props.sessionCounter / this.props.sessionLength
        : this.props.breakCounter / this.props.breakLength) * 100;

    const inSessionStyle = {
      background: `linear-gradient(-90deg, rgba(0, 30, 255, 1) ${percentageLeft}%, rgba(0, 0, 220, 1) ${percentageLeft}% )`,
    };
    const onBreakStyle = {
      background: `linear-gradient(90deg, rgb(250, 250, 210) ${percentageLeft}%, rgb(220, 190, 210) ${percentageLeft}% )`,
      color: "rgba(0, 0, 255, 1)",
    };

    return (
      <div
        className="counter"
        style={this.props.inSession ? inSessionStyle : onBreakStyle}
      >
        <div id="timer-label">
          <h2>{this.props.inSession ? "work it!" : "chillaaax..."}</h2>
        </div>
        <div id="time-left">
          {this.props.inSession
            ? `${sessionMinutesDisplay}:${sessionSecondsDisplay}`
            : `${breakMinutesDisplay}:${breakSecondsDisplay}`}
        </div>
      </div>
    );
  }
}

// CONTROLS

class Controls extends React.Component {
  render() {
    return (
      <div className="controls">
        <button id="start_stop" onClick={() => this.props.runTimer()}>
          {this.props.timerIsRunning ? "■" : "⫸"}
        </button>
        <button id="reset" onClick={() => this.props.resetTimer()}>
          reset
        </button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));