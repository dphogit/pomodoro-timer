import React from "react";
import "./pomodoro.scss";

// TODO Add timer countdown features
// - Find a way for when the play/pause button is clicked it will start counting down from the amount of seconds left. Use Date module.

// TODO Add break feature
// - When timer hits 1:00 it should have a "flashing" style
// - When timer hits 00:00 switch mode from session to break which lasts the set break length amount of time (convert from mins -> secs)
// Play beeping sounds at the appropriate times

// TODO Add Visual styles (end)

// TODO Refactor, tidy up code, add comments and split into files.

// CONSTANTS

// For default state -> Session Mode
const DEFAULT = {
  breakLength: 5,
  sessionLength: 25,
  isRunning: false,
  mode: "session",
  secondsLeft: 1500,
};

// COMPONENTS

const App = () => {
  return (
    <div className="App">
      <Timer />
    </div>
  );
};

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: DEFAULT.breakLength,
      sessionLength: DEFAULT.sessionLength,
      isRunning: DEFAULT.isRunning,
      mode: DEFAULT.mode,
      secondsLeft: DEFAULT.secondsLeft,
    };
    // Binding Statements
    this.countdown = this.countdown.bind(this);
    this.handleSetLength = this.handleSetLength.bind(this);
    this.reset = this.reset.bind(this);
    this.tick = this.tick.bind(this);
    this.toClockFormat = this.toClockFormat.bind(this);
  }

  countdown() {
    // Hacky way of doing it by adding 1000 to account for the first tick immediately rather than waiting 1 second for first tick.
    let stopDistance =
      1000 + new Date().getTime() + this.state.secondsLeft * 1000;
    console.log(stopDistance);
    let interval = setInterval(() => {
      let distance = stopDistance - new Date().getTime();
      console.log(distance); // Should decrease by 1 every time
      if (distance > 0) this.tick();
      else clearInterval(interval);
    }, 1000);
  }

  handleSetLength(e) {
    const node = e.target;
    const brk = this.state.breakLength;
    const session = this.state.sessionLength;
    const seconds = this.state.secondsLeft;
    const running = this.state.isRunning;
    const mode = this.state.mode;

    if (!running) {
      if (node.id.includes("break")) {
        if (node.value.includes("increase") && brk < 60) {
          this.setState({ breakLength: brk + 1 });
          if (mode === "break") {
            this.setState({ secondsLeft: seconds + 60 });
          }
        } else if (node.value.includes("decrease") && brk > 1) {
          this.setState({ breakLength: brk - 1 });
          if (mode === "break") {
            this.setState({ secondsLeft: seconds - 60 });
          }
        }
      } else {
        if (node.value.includes("increase") && session < 60) {
          this.setState({ sessionLength: session + 1 });
          if (mode === "session") {
            this.setState({ secondsLeft: seconds + 60 });
          }
        } else if (node.value.includes("decrease") && session > 1) {
          this.setState({ sessionLength: session - 1 });
          if (mode === "session") {
            this.setState({ secondsLeft: seconds - 60 });
          }
        }
      }
    }
  }

  reset() {
    this.setState({
      breakLength: DEFAULT.breakLength,
      sessionLength: DEFAULT.sessionLength,
      isRunning: DEFAULT.isRunning,
      mode: DEFAULT.mode,
      secondsLeft: DEFAULT.secondsLeft,
    });
  }

  tick() {
    this.setState({ secondsLeft: this.state.secondsLeft - 1 });
  }

  toClockFormat() {
    const totalSeconds = this.state.secondsLeft;
    let mins = Math.floor(totalSeconds / 60);
    let secs = totalSeconds % 60;

    mins = mins < 10 ? "0" + mins : mins;
    secs = secs < 10 ? "0" + secs : secs;

    return mins + ":" + secs;
  }

  render() {
    return (
      <div className="container">
        <h1 className="title">Pomodoro Timer</h1>
        <div id="timer-label">
          <h2>{this.state.mode.toUpperCase()}</h2>
          <p id="time-left">{this.toClockFormat()}</p>
        </div>
        <SetLengths
          breakLength={this.state.breakLength}
          sessionLength={this.state.sessionLength}
          handleSetLength={this.handleSetLength}
        />
        <div className="row">
          <div className="row-block">
            <button id="start_stop" onClick={this.countdown}>
              Play/Pause
            </button>
          </div>
          <div className="row-block">
            <button id="reset" onClick={this.reset}>
              Reset
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const SetLengths = (props) => {
  return (
    <div className="row">
      <div className="row-block">
        <h2 id="break-label">Break Length</h2>
        <div className="row">
          <button
            id="break-decrement"
            value="decrease"
            onClick={props.handleSetLength}
            className="set-length-btn"
          >
            Down
          </button>
          <p id="break-length" className="length-setted">
            {props.breakLength}
          </p>
          <button
            id="break-increment"
            value="increase"
            onClick={props.handleSetLength}
            className="set-length-btn"
          >
            Up
          </button>
        </div>
      </div>
      <div className="row-block">
        <h2 id="session-label">Session Length</h2>
        <div className="row">
          <button
            id="session-decrement"
            value="decrease"
            onClick={props.handleSetLength}
            className="set-length-btn"
          >
            Down
          </button>
          <p id="session-length" className="length-setted">
            {props.sessionLength}
          </p>
          <button
            id="session-increment"
            value="increase"
            onClick={props.handleSetLength}
            className="set-length-btn"
          >
            Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
