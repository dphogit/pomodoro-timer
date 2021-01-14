import React from "react";
import SetLengths from "./setLengths";

// CONSTANTS - For default state -> Session Mode
const DEFAULT = {
  breakLength: 5,
  sessionLength: 25,
  isRunning: false,
  mode: "session",
  secondsLeft: 1500,
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
    this.beep = this.beep.bind(this);
    this.playPause = this.playPause.bind(this);
    this.handleSetLength = this.handleSetLength.bind(this);
    this.reset = this.reset.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.tick = this.tick.bind(this);
    this.toClockFormat = this.toClockFormat.bind(this);
    this.transition = this.transition.bind(this);
  }

  // Credit to Peter Weinburg for the audio beep implementation
  // https://codepen.io/freeCodeCamp/details/XpKrrW
  beep() {
    this.audioBeep.play();
  }

  playPause() {
    if (this.state.isRunning === true) {
      this.stop();
      return;
    }
    this.setState({ isRunning: true });
    this.start();
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
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
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

    console.log(mins + ":" + secs);
    return mins + ":" + secs;
  }

  start() {
    let interval = setInterval(() => {
      if (this.state.isRunning) {
        if (document.getElementById("time-left").innerHTML === "00:00") {
          this.transition();
          clearInterval(interval);
        } else this.tick();
      } else {
        clearInterval(interval);
      }
    }, 1000);
  }

  stop() {
    this.setState({ isRunning: false });
  }

  transition() {
    let newMode, length;
    if (this.state.mode === "session") {
      newMode = "break";
      length = this.state.breakLength;
    } else {
      newMode = "session";
      length = this.state.sessionLength;
    }
    this.setState({
      secondsLeft: length * 60,
      mode: newMode,
    });
    this.beep();
    this.start();
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
            <button id="start_stop" onClick={this.playPause}>
              Play/Pause
            </button>
          </div>
          <div className="row-block">
            <button id="reset" onClick={this.reset}>
              Reset
            </button>
          </div>
        </div>
        <audio
          id="beep"
          preload="auto"
          ref={(audio) => {
            this.audioBeep = audio;
          }}
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        ></audio>
      </div>
    );
  }
}

export default Timer;
